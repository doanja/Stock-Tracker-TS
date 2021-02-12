import React, { Fragment, useState, useEffect } from 'react';
import { getTickerName } from '../helper';
import { StockService } from '../services';
import { CustomSpinner, SearchResultsChild } from './';
import tickers from '../tickers.json';

interface SearchResultsProps {
  searchTerm: string;
  watchlistPrices?: WatchlistPrice | undefined;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchTerm, watchlistPrices }) => {
  const [searchResults, setSearchResults] = useState<Ticker[] | undefined>([]);
  const [tickerPrices, setTickerPrices] = useState<TickerPrice[]>([]);
  const [tickerSymbols, setTickerSymbols] = useState<string[]>([]);

  useEffect(() => {
    if (searchTerm === '') {
      setSearchResults([]);
    } else if (searchTerm) {
      let results: Ticker[] | undefined = tickers.filter((ticker: Ticker) => ticker['Company Name'].toLowerCase().includes(searchTerm));

      // if symbol not found, search by company name
      if (results.length === 0) results = tickers.filter((ticker: Ticker) => ticker.Symbol.toLowerCase().includes(searchTerm));

      setSearchResults(results.slice(0, 5));
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchResults) {
      const stockAPI = new StockService();

      const watchlist: string[] = searchResults.map((ticker: Ticker) => ticker.Symbol);

      const loadPrices = async () => Promise.all(watchlist.map(ticker => stockAPI.getTickerPrices()));

      const tickerPrices: TickerPrice[] = [];

      loadPrices().then(promise => {
        for (let i = 0; i < promise.length; i++) {
          tickerPrices.push({ symbol: watchlist[i], companyName: getTickerName(watchlist[i]), prices: promise[i].data.prices });
        }
        setTickerPrices(tickerPrices);
      });
    } else {
      setTickerPrices([]);
    }
  }, [searchResults]);

  useEffect(() => {
    const symbols = watchlistPrices?.tickerPrices.map((price: TickerPrice) => price.symbol);

    if (symbols) {
      setTickerSymbols(symbols);
    }
  }, [watchlistPrices]);

  return (
    <div className='search-dropdown-parent'>
      {searchResults ? (
        <Fragment>
          {tickerPrices.map((ticker: TickerPrice) => (
            <SearchResultsChild
              ticker={ticker}
              tickerSymbols={tickerSymbols}
              watchlistPrices={watchlistPrices} /*setTickerSymbols={setTickerSymbols}*/
            />
          ))}
        </Fragment>
      ) : (
        <CustomSpinner />
      )}
    </div>
  );
};

export default SearchResults;

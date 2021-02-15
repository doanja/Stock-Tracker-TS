import React, { Fragment, useState, useEffect } from 'react';
import { getTickerName } from '../helper';
import { StockService } from '../services';
import { CustomSpinner, SearchResultsChild } from './';
import tickers from '../tickers.json';

interface SearchResultsProps {
  searchTerm: string;
  watchlistId: string;
  watchlistPrices: WatchlistPrice;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchTerm, watchlistId, watchlistPrices }) => {
  const [searchResults, setSearchResults] = useState<Ticker[] | undefined>([]);
  const [tickerPrices, setTickerPrices] = useState<TickerPrice[]>([]);
  const [tickerSymbols, setTickerSymbols] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const stockAPI = new StockService();

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
      setIsLoading(true);
      const watchlist: string[] = searchResults.map((ticker: Ticker) => ticker.Symbol);
      const loadPrices = async () => Promise.all(watchlist.map(ticker => stockAPI.getTickerPrices()));
      const tickerPrices: TickerPrice[] = [];

      loadPrices().then(promise => {
        for (let i = 0; i < promise.length; i++) {
          tickerPrices.push({ symbol: watchlist[i], companyName: getTickerName(watchlist[i]), prices: promise[i].data.prices });
        }
        setTickerPrices(tickerPrices);
        setIsLoading(false);
      });
    } else {
      setTickerPrices([]);
    }
  }, [searchResults]);

  useEffect(() => {
    stockAPI.getWatchlistById(watchlistId).then(res => {
      setTickerSymbols(res.data.tickers.watchlist);
    });
  }, [watchlistId]);

  return (
    <Fragment>
      {searchResults && watchlistId && !isLoading ? (
        <Fragment>
          {tickerPrices.map((ticker: TickerPrice) => (
            <SearchResultsChild key={ticker.symbol} ticker={ticker} tickerSymbols={tickerSymbols} watchlistId={watchlistId} />
          ))}
        </Fragment>
      ) : (
        <Fragment>{isLoading ? <CustomSpinner /> : <div>hi</div>}</Fragment>
      )}
    </Fragment>
  );
};

export default SearchResults;

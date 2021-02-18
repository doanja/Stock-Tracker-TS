import React, { Fragment, useState, useEffect } from 'react';
import { getTickerName } from '../helper';
import { StockService } from '../services';
import { CustomSpinner } from './';
import tickers from '../tickers.json';

interface SearchBarDropdownProps {
  searchTerm: string;
}

const SearchBarDropdown: React.FC<SearchBarDropdownProps> = ({ searchTerm }) => {
  const [searchResults, setSearchResults] = useState<Ticker[] | undefined>([]);
  const [tickerPrices, setTickerPrices] = useState<TickerPrice[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (searchResults) {
      const stockAPI = new StockService();

      const watchlist: string[] = searchResults.map((ticker: Ticker) => ticker.Symbol);

      const loadPrices = async () => Promise.all(watchlist.map(() => stockAPI.getTickerPrices()));

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

    return () => setIsMounted(false);
  }, [searchTerm, searchResults]);

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

  if (!isMounted) return null;

  return (
    <div className='search-dropdown-parent'>
      {searchResults ? (
        <Fragment>
          {tickerPrices.map((ticker: TickerPrice) => (
            <div className='search-dropdown-item' key={ticker.symbol}>
              <div>
                <div className='search-dropdown-item-company-name'>{ticker.companyName}</div>
                <div className='search-dropdown-item-company-symbol'>{ticker.symbol}</div>
              </div>

              {ticker.prices[0].priceChange > 0 ? (
                <div className='position-relative'>
                  <div className='search-dropdown-item-price-wrap'>
                    <div className='search-dropdown-item-price'>${ticker.prices[0].price}</div>

                    <div className='search-dropdown-item-percent discover-green'>{ticker.prices[0].changePercent}%</div>
                  </div>
                </div>
              ) : (
                <div className='position-relative'>
                  <div className='search-dropdown-item-price-wrap'>
                    <div className='search-dropdown-item-price'>${ticker.prices[0].price}</div>

                    <div className='search-dropdown-item-percent discover-red'>{ticker.prices[0].changePercent}%</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </Fragment>
      ) : (
        <CustomSpinner />
      )}
    </div>
  );
};

export default SearchBarDropdown;
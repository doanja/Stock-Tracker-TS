import React, { Fragment, useState, useEffect } from 'react';
import { formatPrice, getTickerPrices } from '../helper';
import { CustomSpinner } from './';
import tickers from '../tickers.json';

// redux
import { useDispatch } from 'react-redux';
import { setTicker } from '../redux/actions/stockActions';

interface SearchBarDropdownProps {
  searchTerm: string;
  setSearchTerm: SetSearchTerm;
}

const SearchBarDropdown: React.FC<SearchBarDropdownProps> = ({ searchTerm, setSearchTerm }) => {
  const [searchResults, setSearchResults] = useState<Ticker[] | undefined>([]);
  const [tickerPrices, setTickerPrices] = useState<TickerPrice[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // redux
  const dispatch = useDispatch();

  useEffect(() => {
    setIsMounted(true);

    if (searchResults) {
      const watchlist: string[] = searchResults.map((ticker: Ticker) => ticker.Symbol);

      const tickerPrices: TickerPrice[] = [];

      getTickerPrices(watchlist).then(res => {
        const prices: TickerPrice[] = res.data.tickerPrices;

        for (let i = 0; i < prices.length; i++) {
          tickerPrices.push(prices[i]);
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
            <div
              className='search-dropdown-item'
              key={ticker.symbol}
              onClick={() => {
                dispatch(setTicker(ticker.symbol));
                setSearchResults([]);
              }}>
              <div>
                <div className='search-dropdown-item-company-name'>{ticker.companyName}</div>
                <div className='search-dropdown-item-company-symbol'>{ticker.symbol}</div>
              </div>

              {ticker.prices[0].priceChange > 0 ? (
                <div className='position-relative'>
                  <div className='search-dropdown-item-price-wrap'>
                    <div className='search-dropdown-item-price'>${formatPrice(ticker.prices[0].price)}</div>
                    <div className='search-dropdown-item-percent discover-green'>{formatPrice(ticker.prices[0].changePercent)}%</div>
                  </div>
                </div>
              ) : (
                <div className='position-relative'>
                  <div className='search-dropdown-item-price-wrap'>
                    <div className='search-dropdown-item-price'>${formatPrice(ticker.prices[0].price)}</div>
                    <div className='search-dropdown-item-percent discover-red'>{formatPrice(ticker.prices[0].changePercent)}%</div>
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

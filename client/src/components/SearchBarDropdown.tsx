import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getTickerName } from '../helper';
import { StockService } from '../services';
import { CustomSpinner } from './';
import tickers from '../tickers.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../redux/Store';
import { addToWatchlist, removeFromWatchlist } from '../redux/actions/stockActions';

interface SearchBarDropdownProps {
  searchTerm: string;
  quickAddMode?: boolean;
  watchlistPrices?: WatchlistPrice | undefined;
}

const SearchBarDropdown: React.FC<SearchBarDropdownProps> = ({ searchTerm, quickAddMode, watchlistPrices }) => {
  const [searchResults, setSearchResults] = useState<Ticker[] | undefined>([]);
  const [tickerPrices, setTickerPrices] = useState<TickerPrice[]>([]);

  const history = useHistory();
  // const [isWatching, setIsWatching] = useState(false);

  // redux
  // const { watchlists } = useSelector((state: RootStore) => state.stock);
  const { loginStatus } = useSelector((state: RootStore) => state.auth);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (loginStatus && watchlists && quickAddMode) {
  //     tickerPrices?.forEach(ticker => {
  //       watchlistPrices?.tickerPrices.includes(ticker) ? setIsWatching(true) : setIsWatching(false);
  //     });
  //   }
  // }, [watchlists, searchResults]);

  const saveTicker = (saveTicker: boolean, ticker: string): void => {
    console.log('save ticker');
    if (loginStatus && watchlistPrices?.watchlistId) {
      if (saveTicker) {
        dispatch(addToWatchlist(watchlistPrices?.watchlistId, ticker));
        // setIsWatching(true);
      } else {
        dispatch(removeFromWatchlist(watchlistPrices?.watchlistId, ticker));
        // setIsWatching(false);
      }
    } else history.push('/login');
  };

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
                  <Fragment>
                    <div className='search-dropdown-item-price-wrap'>
                      <div className='search-dropdown-item-price'>${ticker.prices[0].price}</div>

                      <div className='search-dropdown-item-percent discover-green'>{ticker.prices[0].changePercent}%</div>
                    </div>
                    {quickAddMode ? <p>hi</p> : null}
                  </Fragment>
                  <div className='icon-wrap'>
                    {watchlistPrices?.tickerPrices.includes(ticker) ? (
                      <FontAwesomeIcon
                        className='icon-overlayed-search icon'
                        icon={faMinusCircle}
                        size='lg'
                        onClick={() => saveTicker(false, ticker.symbol)}
                      />
                    ) : (
                      <FontAwesomeIcon
                        className='icon-overlayed-search icon'
                        icon={faPlusCircle}
                        size='lg'
                        onClick={() => saveTicker(true, ticker.symbol)}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className='position-relative'>
                  <Fragment>
                    <div className='search-dropdown-item-price-wrap'>
                      <div className='search-dropdown-item-price'>${ticker.prices[0].price}</div>

                      <div className='search-dropdown-item-percent discover-red'>{ticker.prices[0].changePercent}%</div>
                    </div>
                  </Fragment>
                  <div className='icon-wrap'>
                    {watchlistPrices?.tickerPrices.includes(ticker) ? (
                      <FontAwesomeIcon
                        className='icon-overlayed-search icon'
                        icon={faMinusCircle}
                        size='lg'
                        onClick={() => saveTicker(false, ticker.symbol)}
                      />
                    ) : (
                      <FontAwesomeIcon
                        className='icon-overlayed-search icon'
                        icon={faPlusCircle}
                        size='lg'
                        onClick={() => saveTicker(true, ticker.symbol)}
                      />
                    )}
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

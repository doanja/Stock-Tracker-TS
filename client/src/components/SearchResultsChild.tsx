import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../redux/Store';
import { addToWatchlist, removeFromWatchlist } from '../redux/actions/stockActions';

interface SearchResultsChildProps {
  ticker: TickerPrice;
  tickerSymbols: string[];
  watchlistPrices?: WatchlistPrice | undefined;
  setTickerSymbol: (symbols: string[]) => void;
}

const SearchResultsChild: React.FC<SearchResultsChildProps> = ({ ticker, tickerSymbols, watchlistPrices }) => {
  useEffect(() => {
    // setTest(tickerSymbols);
  }, [tickerSymbols]);

  const history = useHistory();

  // redux
  const { loginStatus } = useSelector((state: RootStore) => state.auth);
  const dispatch = useDispatch();

  const saveTicker = (saveTicker: boolean, ticker: string): void => {
    if (loginStatus && watchlistPrices?.watchlistId) {
      if (saveTicker) {
        dispatch(addToWatchlist(watchlistPrices?.watchlistId, ticker));
        // setTic(test.filter)
      } else {
        dispatch(removeFromWatchlist(watchlistPrices?.watchlistId, ticker));
      }
    } else history.push('/login');
  };

  return (
    <div className='search-dropdown-item' key={ticker.symbol}>
      <div className='search-dropdown-item-company-name'>{ticker.companyName}</div>
      <div className='search-dropdown-item-company-symbol'>{ticker.symbol}</div>
      <div className='icon-wrap'></div>

      {ticker.prices[0].priceChange > 0 ? (
        <div className='position-relative'>
          <div className='search-dropdown-item-price-wrap'>
            <div className='search-dropdown-item-price'>${ticker.prices[0].price}</div>
            <div className='search-dropdown-item-percent discover-green'>{ticker.prices[0].changePercent}%</div>
          </div>

          <div className='icon-wrap'>
            {tickerSymbols.includes(ticker.symbol) ? (
              <FontAwesomeIcon
                className='icon-overlayed-search icon'
                icon={faMinusCircle}
                size='lg'
                onClick={() => saveTicker(false, ticker.symbol)}
              />
            ) : (
              <FontAwesomeIcon className='icon-overlayed-search icon' icon={faPlusCircle} size='lg' onClick={() => saveTicker(true, ticker.symbol)} />
            )}
          </div>
        </div>
      ) : (
        <div className='position-relative'>
          <div className='search-dropdown-item-price-wrap'>
            <div className='search-dropdown-item-price'>${ticker.prices[0].price}</div>
            <div className='search-dropdown-item-percent discover-red'>{ticker.prices[0].changePercent}%</div>
            <div className='icon-wrap'></div>
          </div>

          <div className='icon-wrap'>
            {tickerSymbols.includes(ticker.symbol) ? (
              <FontAwesomeIcon
                className='icon-overlayed-search icon'
                icon={faMinusCircle}
                size='lg'
                onClick={() => saveTicker(false, ticker.symbol)}
              />
            ) : (
              <FontAwesomeIcon className='icon-overlayed-search icon' icon={faPlusCircle} size='lg' onClick={() => saveTicker(true, ticker.symbol)} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsChild;

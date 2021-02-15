import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { StockService } from '../services';
import { CustomSpinner } from './';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../redux/Store';
import { addToWatchlist, removeFromWatchlist } from '../redux/actions/stockActions';

interface SearchResultsChildProps {
  ticker: TickerPrice;
  tickerSymbols: string[];
  watchlistId: string;
}

const SearchResultsChild: React.FC<SearchResultsChildProps> = ({ ticker, tickerSymbols, watchlistId }) => {
  const history = useHistory();

  // redux
  const { loginStatus } = useSelector((state: RootStore) => state.auth);
  const dispatch = useDispatch();

  const saveTicker = (saveTicker: boolean, ticker: string): void => {
    // console.log('tickerSymbols', tickerSymbols);

    // const isIncludedInWatchlist = tickerSymbols.includes(ticker);

    // console.log('isIncludedInWatchlist :>> ', isIncludedInWatchlist);
    if (loginStatus && watchlistId) {
      if (saveTicker) {
        dispatch(addToWatchlist(watchlistId, ticker));
      } else {
        dispatch(removeFromWatchlist(watchlistId, ticker));
      }
    } else history.push('/login');
  };

  return (
    <div className='search-dropdown-item'>
      <div className='mt-2 company-badge-name-wrap'>
        <div className='mb-1 ticker-badge'>
          <div className='ticker-badge-text'>{ticker.symbol}</div>
        </div>

        <div className='mb-3 company-name'>
          <p>{ticker.companyName}</p>
        </div>
      </div>

      {ticker.prices[0].priceChange > 0 ? (
        <Fragment>
          <div className='price-text-wrap'>
            <p className='price-text'>${ticker.prices[0].price}</p>
          </div>

          <div className='price-text-wrap'>
            <p className='price-text font-green-dark'>${ticker.prices[0].priceChange}</p>
          </div>

          <div className='percent-wrap'>
            <div className='price-badge discover-green'>{ticker.prices[0].changePercent}%</div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className='price-text-wrap'>
            <p className='price-text'>${ticker.prices[0].price}</p>
          </div>

          <div className='price-text-wrap'>
            <p className='price-text font-red-dark'>-${ticker.prices[0].priceChange * -1}</p>
          </div>

          <div className='percent-wrap'>
            <div className='price-badge discover-red'>{ticker.prices[0].changePercent}%</div>
          </div>
        </Fragment>
      )}

      <div className='ml-4'>
        {tickerSymbols.includes(ticker.symbol) ? (
          <FontAwesomeIcon className='icon' icon={faMinusCircle} size='lg' onClick={() => saveTicker(false, ticker.symbol)} />
        ) : (
          <FontAwesomeIcon className='icon' icon={faPlusCircle} size='lg' onClick={() => saveTicker(true, ticker.symbol)} />
        )}
      </div>
    </div>
  );
};

export default SearchResultsChild;

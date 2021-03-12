import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { StockService } from '../services';

// redux
import { useDispatch } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../redux/actions/stockActions';
import { formatPrice } from '../helper';

interface SearchResultsChildProps {
  ticker: TickerPrice;
  watchlistId: string;
}

const SearchResultsChild: React.FC<SearchResultsChildProps> = ({ ticker, watchlistId }) => {
  const history = useHistory();

  // redux
  const dispatch = useDispatch();

  const [isWatching, setIsWatching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const stockAPI = new StockService();
    stockAPI.getWatchlistById(watchlistId).then(res => {
      const watchlist = res.data.tickers.watchlist;

      watchlist.includes(ticker.symbol) ? setIsWatching(true) : setIsWatching(false);

      setIsLoading(false);
    });
  }, [watchlistId, ticker.symbol]);

  const saveTicker = (saveTicker: boolean, ticker: string): void => {
    if (watchlistId) {
      if (saveTicker) {
        dispatch(addToWatchlist(watchlistId, ticker));
        setIsWatching(true);
      } else {
        dispatch(removeFromWatchlist(watchlistId, ticker));
        setIsWatching(false);
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
            <p className='price-text'>${formatPrice(ticker.prices[0].price)}</p>
          </div>

          <div className='percent-wrap'>
            <div className='price-badge discover-green'>{formatPrice(ticker.prices[0].changePercent)}%</div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className='price-text-wrap'>
            <p className='price-text'>${formatPrice(ticker.prices[0].price)}</p>
          </div>

          <div className='percent-wrap'>
            <div className='price-badge discover-red'>{formatPrice(ticker.prices[0].changePercent)}%</div>
          </div>
        </Fragment>
      )}

      <div className='ml-4'>
        {isLoading ? null : (
          <Fragment>
            {isWatching ? (
              <FontAwesomeIcon className='icon' icon={faMinusCircle} size='lg' onClick={() => saveTicker(false, ticker.symbol)} />
            ) : (
              <FontAwesomeIcon className='icon' icon={faPlusCircle} size='lg' onClick={() => saveTicker(true, ticker.symbol)} />
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default SearchResultsChild;

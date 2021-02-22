import React, { useState, useEffect, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { StockService } from '../services';

// redux
import { useDispatch } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../redux/actions/stockActions';

interface TickerSaveButtonChildProps {
  tickerSymbol: string;
  watchlistId: string | undefined;
  watchlistName: string | undefined;
}

const TickerSaveButtonChild: React.FC<TickerSaveButtonChildProps> = ({ tickerSymbol, watchlistId, watchlistName }) => {
  // redux
  const dispatch = useDispatch();

  const [isWatching, setIsWatching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (watchlistId) {
      setIsLoading(true);

      const stockAPI = new StockService();
      stockAPI.getWatchlistById(watchlistId).then(res => {
        const watchlist = res.data.tickers.watchlist;

        watchlist.includes(tickerSymbol) ? setIsWatching(true) : setIsWatching(false);

        setIsLoading(false);
      });
    }
  }, [watchlistId, tickerSymbol]);

  const saveTicker = (saveTicker: boolean, ticker: string): void => {
    if (saveTicker && watchlistId) {
      dispatch(addToWatchlist(watchlistId, ticker));
      setIsWatching(true);
    } else if (watchlistId) {
      dispatch(removeFromWatchlist(watchlistId, ticker));
      setIsWatching(false);
    }
  };

  return (
    <div className='search-dropdown-item'>
      <div className='mt-2'>
        <p>{watchlistName}</p>
      </div>

      <div className='ml-4'>
        {isLoading ? null : (
          <Fragment>
            {isWatching ? (
              <FontAwesomeIcon className='icon' icon={faMinusCircle} size='lg' onClick={() => saveTicker(false, tickerSymbol)} />
            ) : (
              <FontAwesomeIcon className='icon' icon={faPlusCircle} size='lg' onClick={() => saveTicker(true, tickerSymbol)} />
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default TickerSaveButtonChild;

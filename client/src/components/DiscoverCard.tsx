import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/main.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../redux/Store';
import { setTicker, addToWatchlist, removeFromWatchlist } from '../redux/actions/stockActions';
import { formatPrice } from '../helper';

interface DiscoverCardProps {
  tickerPrice: TickerPrice;
}

const DiscoverCard: React.FC<DiscoverCardProps> = ({ tickerPrice }) => {
  const history = useHistory();
  const [isWatching, setIsWatching] = useState(false);

  // redux
  const { currentWatchlist } = useSelector((state: RootStore) => state.stock);
  const { loginStatus } = useSelector((state: RootStore) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginStatus && currentWatchlist && currentWatchlist.watchlist.length > 0)
      currentWatchlist.watchlist.includes(tickerPrice.symbol) ? setIsWatching(true) : setIsWatching(false);
  }, [currentWatchlist, tickerPrice.symbol, loginStatus]);

  const saveTicker = (saveTicker: boolean, ticker: string): void => {
    if (loginStatus && currentWatchlist) {
      if (saveTicker) {
        dispatch(addToWatchlist(currentWatchlist._id, ticker));
        setIsWatching(true);
      } else {
        dispatch(removeFromWatchlist(currentWatchlist, ticker));
        setIsWatching(false);
      }
    } else history.push('/login');
  };

  return (
    <div className='mb-2 position-relative' key={tickerPrice.symbol}>
      <div className='discover-card' onClick={() => dispatch(setTicker(tickerPrice.symbol))}>
        <div className='mb-1 ticker-badge'>
          <div className='ticker-badge-text'>{tickerPrice.symbol}</div>
        </div>

        <p className='mb-3 ticker-company-text'>{tickerPrice.companyName}</p>

        {tickerPrice.prices[0].changePercent > 0 ? (
          <div className='discover-price-wrap'>
            <p className='mb-2'>${formatPrice(tickerPrice.prices[0].price)}</p>
            <div className='price-badge discover-green'>{formatPrice(tickerPrice.prices[0].changePercent)}%</div>
          </div>
        ) : (
          <div className='discover-price-wrap'>
            <p className='mb-2'>${formatPrice(tickerPrice.prices[0].price)}</p>
            <div className='price-badge discover-red'>{formatPrice(tickerPrice.prices[0].changePercent)}%</div>
          </div>
        )}
      </div>

      {isWatching ? (
        <FontAwesomeIcon className='discover-icon icon' icon={faMinusCircle} size='lg' onClick={() => saveTicker(false, tickerPrice.symbol)} />
      ) : (
        <FontAwesomeIcon className='discover-icon icon' icon={faPlusCircle} size='lg' onClick={() => saveTicker(true, tickerPrice.symbol)} />
      )}
    </div>
  );
};

export default DiscoverCard;

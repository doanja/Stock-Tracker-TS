import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/main.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../redux/Store';
import { setTicker, addToWatchlist, removeFromWatchlist } from '../redux/actions/stockActions';

interface DiscoverCardProps {
  ticker: TickerPrice;
}

const DiscoverCard: React.FC<DiscoverCardProps> = ({ ticker }) => {
  const history = useHistory();
  const [isWatching, setIsWatching] = useState(false);

  // redux
  const { watchlist } = useSelector((state: RootStore) => state.stock);
  const { loginStatus } = useSelector((state: RootStore) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginStatus) watchlist.includes(ticker.symbol) ? setIsWatching(true) : setIsWatching(false);
    else history.push('/login');
  }, [ticker, watchlist]);

  const saveTicker = (tickerSymbol: string) => {
    if (loginStatus) {
      isWatching ? dispatch(removeFromWatchlist(tickerSymbol)) : dispatch(addToWatchlist(tickerSymbol));
    } else history.push('/login');
  };

  return (
    <div className='mb-2 discover-wrap' key={ticker.symbol}>
      <div className='discover-card' onClick={() => dispatch(setTicker(ticker.symbol))}>
        <div className='mb-1 discover-badge'>
          <div className='discover-badge-text'>{ticker.symbol}</div>
        </div>

        <p className='mb-3 discover-text'>{ticker.companyName}</p>

        {ticker.prices[0].changePercent > 0 ? (
          <div className='discover-price-wrap'>
            <p className='mb-2'>${ticker.prices[0].price}</p>
            <div className='discover-price-badge discover-green'>{ticker.prices[0].changePercent}%</div>
          </div>
        ) : (
          <div className='discover-price-wrap'>
            <p className='mb-2'>${ticker.prices[0].price}</p>
            <div className='discover-price-badge discover-red'>{ticker.prices[0].changePercent}%</div>
          </div>
        )}
      </div>

      {isWatching ? (
        <FontAwesomeIcon className='discover-icon icon' icon={faMinusCircle} size='lg' onClick={() => saveTicker(ticker.symbol)} />
      ) : (
        <FontAwesomeIcon className='discover-icon icon' icon={faPlusCircle} size='lg' onClick={() => saveTicker(ticker.symbol)} />
      )}
    </div>
  );
};

export default DiscoverCard;

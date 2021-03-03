import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/main.min.css';
import '../styles/ticker.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../redux/Store';
import { setTicker, addToWatchlist, removeFromWatchlist } from '../redux/actions/stockActions';
import { formatPrice } from '../helper';

interface MostFollowedProps {
  tickerPrice: TickerPrice;
}

const MostFollowed: React.FC<MostFollowedProps> = ({ tickerPrice }) => {
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
    <div className='position-relative' key={tickerPrice.symbol}>
      <div className='ticker-trend-wrap' onClick={() => dispatch(setTicker(tickerPrice.symbol))}>
        <div className='mt-2 company-badge-name-wrap'>
          <div className='mb-1 ticker-badge '>
            <div className='ticker-badge-text'>{tickerPrice.symbol}</div>
          </div>

          <div className='mb-3 company-name'>
            <p>{tickerPrice.companyName}</p>
          </div>
        </div>

        {tickerPrice.prices[0].priceChange > 0 ? (
          <div className='percent-wrap'>
            <div className='price-badge discover-green'>+{formatPrice(tickerPrice.prices[0].changePercent)}%</div>
          </div>
        ) : (
          <div className='percent-wrap'>
            <div className='price-badge discover-red'>{formatPrice(tickerPrice.prices[0].changePercent)}%</div>
          </div>
        )}

        <div className='icon-wrap'></div>
      </div>
      <div className='icon-wrap'>
        {isWatching ? (
          <FontAwesomeIcon className='icon-overlayed icon' icon={faMinusCircle} size='lg' onClick={() => saveTicker(false, tickerPrice.symbol)} />
        ) : (
          <FontAwesomeIcon className='icon-overlayed icon' icon={faPlusCircle} size='lg' onClick={() => saveTicker(true, tickerPrice.symbol)} />
        )}
      </div>
    </div>
  );
};

export default MostFollowed;

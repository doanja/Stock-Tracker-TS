import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/main.min.css';
import '../styles/ticker.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../redux/Store';
import { setTicker, addToWatchlist, removeFromWatchlist, setTickerPrices } from '../redux/actions/stockActions';

interface MostFollowed {
  tickerPrice: TickerPrice;
}

const MostFollowed: React.FC<MostFollowed> = ({ tickerPrice }) => {
  const history = useHistory();
  const [isWatching, setIsWatching] = useState(false);

  // redux
  const { watchlist } = useSelector((state: RootStore) => state.stock);
  const { loginStatus } = useSelector((state: RootStore) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginStatus) watchlist.includes(tickerPrice.symbol) ? setIsWatching(true) : setIsWatching(false);
  }, [tickerPrice, watchlist]);

  const saveTicker = (tickerSymbol: string) => {
    if (loginStatus) {
      isWatching ? dispatch(removeFromWatchlist(tickerSymbol)) : dispatch(addToWatchlist(tickerSymbol));
    } else history.push('/login');
  };

  return (
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
        <div className='market-percent-wrap'>
          <div className='price-badge discover-green'>+{tickerPrice.prices[0].changePercent}%</div>
        </div>
      ) : (
        <div className='market-percent-wrap'>
          <div className='price-badge discover-red'>{tickerPrice.prices[0].changePercent}%</div>
        </div>
      )}

      <div className='market-icon-wrap'>
        {isWatching ? (
          <FontAwesomeIcon className='market-icon icon' icon={faMinusCircle} size='lg' onClick={() => saveTicker(tickerPrice.symbol)} />
        ) : (
          <FontAwesomeIcon className='market-icon icon' icon={faPlusCircle} size='lg' onClick={() => saveTicker(tickerPrice.symbol)} />
        )}
      </div>
    </div>
  );
};

export default MostFollowed;

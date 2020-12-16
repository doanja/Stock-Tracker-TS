import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/main.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../redux/Store';
import { setTicker, addToWatchlist, removeFromWatchlist } from '../redux/actions/stockActions';

interface MarketTrendProps {
  tickerPrice: TickerPrice;
}

const MarketTrend: React.FC<MarketTrendProps> = ({ tickerPrice }) => {
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
    <div className='market-card' onClick={() => dispatch(setTicker(tickerPrice.symbol))}>
      <div className='market-badge'>{tickerPrice.symbol}</div>
      <p className='market-name'>{tickerPrice.companyName}</p>
      <p className='market-price'>{tickerPrice.prices[0].price}</p>
      {isWatching ? (
        <FontAwesomeIcon className='discover-icon icon' icon={faMinusCircle} size='lg' onClick={() => saveTicker(tickerPrice.symbol)} />
      ) : (
        <FontAwesomeIcon className='discover-icon icon' icon={faPlusCircle} size='lg' onClick={() => saveTicker(tickerPrice.symbol)} />
      )}
    </div>
  );
};

export default MarketTrend;

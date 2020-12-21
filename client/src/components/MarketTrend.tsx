import React, { Fragment, useEffect, useState } from 'react';
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
    <div className='market-trend-wrap' onClick={() => dispatch(setTicker(tickerPrice.symbol))}>
      <div className='mt-2 market-trend-badge-company-wrap'>
        <div className='mb-1 ticker-badge '>
          <div className='ticker-badge-text'>{tickerPrice.symbol}</div>
        </div>

        <div className='mb-3 ticker-company-text market-company-name'>
          <p>{tickerPrice.companyName}</p>
        </div>
      </div>

      {tickerPrice.prices[0].priceChange > 0 ? (
        <Fragment>
          <div className='market-price-text-wrap'>
            <p className='market-price-text'>${tickerPrice.prices[0].price}</p>
          </div>

          <div className='market-percent-wrap'>
            <div className='price-badge discover-green'>{tickerPrice.prices[0].changePercent}%</div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className='market-price-text-wrap'>
            <p className='market-price-text'>${tickerPrice.prices[0].price}</p>
          </div>

          <div className='market-percent-wrap'>
            <div className='price-badge discover-red'>{tickerPrice.prices[0].changePercent}%</div>
          </div>
        </Fragment>
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

export default MarketTrend;

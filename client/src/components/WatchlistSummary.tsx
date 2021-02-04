import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/main.min.css';
import '../styles/ticker.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// redux
import { useDispatch } from 'react-redux';
import { setTicker, removeFromWatchlist } from '../redux/actions/stockActions';

interface WatchlistSummaryProps {
  tickerPrice: TickerPrice;
  watchlistId: string | undefined;
}

const WatchlistSummary: React.FC<WatchlistSummaryProps> = ({ tickerPrice, watchlistId }) => {
  const history = useHistory();

  // redux
  const dispatch = useDispatch();

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
          <Fragment>
            <div className='price-text-wrap'>
              <p className='price-text'>${tickerPrice.prices[0].price}</p>
            </div>

            <div className='price-text-wrap price-display-none'>
              <p className='price-text font-green-dark'>+${tickerPrice.prices[0].priceChange}</p>
            </div>

            <div className='percent-wrap'>
              <div className='price-badge discover-green'>{tickerPrice.prices[0].changePercent}%</div>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className='price-text-wrap'>
              <p className='price-text'>${tickerPrice.prices[0].price}</p>
            </div>

            <div className='price-text-wrap price-display-none'>
              <p className='price-text font-red-dark'>-${tickerPrice.prices[0].priceChange * -1}</p>
            </div>

            <div className='percent-wrap'>
              <div className='price-badge discover-red'>{tickerPrice.prices[0].changePercent}%</div>
            </div>
          </Fragment>
        )}

        <div className='icon-wrap'></div>
      </div>
      <div className='icon-wrap'>
        <FontAwesomeIcon
          className='icon-overlayed-watchlist icon'
          icon={faTimes}
          size='lg'
          onClick={() => dispatch(removeFromWatchlist(watchlistId, tickerPrice.symbol))}
        />
      </div>
    </div>
  );
};
export default WatchlistSummary;

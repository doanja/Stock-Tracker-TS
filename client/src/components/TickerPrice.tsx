import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretSquareUp, faCaretSquareDown } from '@fortawesome/free-solid-svg-icons';
import { formatPrice } from '../helper';

interface TickerPriceProps {
  tickerPrice: TickerPrice;
  tickerPriceChange: TickerPriceChange;
  timeframe: string;
}

const TickerPrice: React.FC<TickerPriceProps> = ({ tickerPrice, tickerPriceChange, timeframe }) => {
  return (
    <div className='ticker-price'>
      {tickerPriceChange.price > 0 ? (
        <div className='list-inline'>
          <div className='list-inline-item ticker-price'>{formatPrice(tickerPrice.prices[0].price)}</div>
          <div className='d-inline ticker-price-percent ticker-badge-green font-green-dark'>
            <FontAwesomeIcon className='ticker-icon' icon={faCaretSquareUp} /> {formatPrice(tickerPriceChange.percent)}%
          </div>

          <div className='list-inline-item ticker-price-change font-green-dark'>
            +{formatPrice(tickerPriceChange.price)} {timeframe}
          </div>
        </div>
      ) : (
        <div className='list-inline'>
          <div className='list-inline-item ticker-price'>{formatPrice(tickerPrice.prices[0].price)}</div>
          <div className='d-inline ticker-price-percent ticker-badge-red font-red-dark'>
            <FontAwesomeIcon className='ticker-icon' icon={faCaretSquareDown} /> {formatPrice(tickerPriceChange.percent)}%
          </div>

          <div className='list-inline-item ticker-price-change font-red-dark'>
            {formatPrice(tickerPriceChange.price)} {timeframe}
          </div>
        </div>
      )}
    </div>
  );
};

export default TickerPrice;

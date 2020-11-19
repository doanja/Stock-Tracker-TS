import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretSquareUp, faCaretSquareDown } from '@fortawesome/free-solid-svg-icons';

interface TickerPriceProps {
  tickerPrice: TickerPrice;
}

const TickerPrice: React.FC<TickerPriceProps> = ({ tickerPrice }) => {
  return (
    <div className='ticker-price'>
      {tickerPrice.prices[1].changePercent > 0 ? (
        <div className='list-inline'>
          <div className='list-inline-item ticker-price'>{tickerPrice.prices[1].price}</div>
          <div className='d-inline ticker-price-percent ticker-badge-green font-green-dark'>
            <FontAwesomeIcon className='ticker-icon' icon={faCaretSquareUp} /> {tickerPrice.prices[1].changePercent}%
          </div>

          <div className='list-inline-item ticker-price-change font-green-dark'>+{tickerPrice.prices[1].priceChange} Today</div>
        </div>
      ) : (
        <div className='list-inline'>
          <div className='list-inline-item ticker-price'>{tickerPrice.prices[1].price}</div>
          <div className='d-inline ticker-price-percent ticker-badge-red font-red-dark'>
            <FontAwesomeIcon className='ticker-icon' icon={faCaretSquareDown} /> {tickerPrice.prices[1].changePercent}%
          </div>

          <div className='list-inline-item ticker-price-change font-red-dark'>{tickerPrice.prices[1].priceChange} Today</div>
        </div>
      )}
    </div>
  );
};

export default TickerPrice;

import React from 'react';
import { TickerLineContainer, SaveButton, TickerContainer } from './';

import { Spinner } from 'react-bootstrap';

interface TickerContainerWrapProps {
  watchlistPrices: TickerPrice[][];
  currentTicker: string;
  currentTickerPrice: TickerPrice;
}

const TickerContainerWrap: React.FC<TickerContainerWrapProps> = ({ watchlistPrices, currentTicker, currentTickerPrice }) => {
  return (
    <div>
      {watchlistPrices.length > 0 ? (
        <TickerLineContainer tickerPrices={watchlistPrices[watchlistPrices.length - 1]} />
      ) : (
        <div className='mt-3 text-center'>
          <Spinner animation='border' variant='light' />
        </div>
      )}
      <SaveButton ticker={currentTicker} />
      <TickerContainer tickerPrice={currentTickerPrice} ticker={currentTicker} />
    </div>
  );
};
export default TickerContainerWrap;

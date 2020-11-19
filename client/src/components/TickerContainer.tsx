import React from 'react';
import { TickerHeader, TickerPrice } from './';
import '../styles/ticker.min.css';

interface TickerContainerProps {
  tickerPrice: TickerPrice;
}

const TickerContainer: React.FC<TickerContainerProps> = ({ tickerPrice }) => {
  return (
    <div className='mt-3 p-3 ticker-container'>
      <TickerHeader tickerPrice={tickerPrice} />
      <TickerPrice tickerPrice={tickerPrice} />
    </div>
  );
};

export default TickerContainer;

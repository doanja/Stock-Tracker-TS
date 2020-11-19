import React from 'react';
import { TickerHeader, TickerPrice, TickerGraphButtons } from './';
import '../styles/ticker.min.css';

interface TickerContainerProps {
  tickerPrice: TickerPrice;
}

const TickerContainer: React.FC<TickerContainerProps> = ({ tickerPrice }) => {
  return (
    <div className='mt-3 p-3 ticker-container'>
      <TickerHeader tickerPrice={tickerPrice} />
      <TickerPrice tickerPrice={tickerPrice} />
      <TickerGraphButtons />
    </div>
  );
};

export default TickerContainer;

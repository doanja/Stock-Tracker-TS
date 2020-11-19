import React, { useState } from 'react';
import { TickerHeader, TickerPrice, TickerGraphButtons } from './';
import '../styles/ticker.min.css';

interface TickerContainerProps {
  tickerPrice: TickerPrice;
}

const TickerContainer: React.FC<TickerContainerProps> = ({ tickerPrice }) => {
  const [timeframe, setTimeframe] = useState('1D');

  return (
    <div className='mt-3 p-3 ticker-container'>
      <TickerHeader tickerPrice={tickerPrice} />
      <TickerPrice tickerPrice={tickerPrice} />
      <TickerGraphButtons timeframe={timeframe} setTimeframe={setTimeframe} />
    </div>
  );
};

export default TickerContainer;

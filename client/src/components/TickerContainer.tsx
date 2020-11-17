import React from 'react';
import { TickerHeader } from './';
import '../styles/tickerHeader.min.css';

interface TickerContainerProps {
  tickerPrice: TickerPrice;
}

const TickerContainer: React.FC<TickerContainerProps> = ({ tickerPrice }) => {
  return (
    <div className='mt-3 p-3 test'>
      <TickerHeader tickerPrice={tickerPrice} />
    </div>
  );
};

export default TickerContainer;

import React, { useState } from 'react';

interface TickerGraphButtonsProps {
  timeframe: string;
  setTimeframe: (timeframe: string) => void;
}

const TickerGraphButtons: React.FC<TickerGraphButtonsProps> = ({ timeframe, setTimeframe }) => {
  const arr = ['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y'];

  return (
    <div className='mt-3'>
      {arr.map(value => (
        <div className={`d-inline ticker-graph-button ${timeframe === value ? 'active' : 'nonactive'}`} onClick={() => setTimeframe(value)}>
          {value}
        </div>
      ))}
    </div>
  );
};

export default TickerGraphButtons;

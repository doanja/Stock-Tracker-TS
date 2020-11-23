import React from 'react';

interface TickerGraphButtonsProps {
  timeframe: string;
  setTimeframe: (timeframe: string) => void;
}

const TickerGraphButtons: React.FC<TickerGraphButtonsProps> = ({ timeframe, setTimeframe }) => {
  const arr = ['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y'];

  return (
    <div className='my-3'>
      {arr.map((value, index) => (
        <div
          className={`d-inline ticker-graph-button ${timeframe === value ? 'active' : 'nonactive'}`}
          key={index}
          onClick={() => setTimeframe(value)}>
          {value}
        </div>
      ))}
    </div>
  );
};

export default TickerGraphButtons;

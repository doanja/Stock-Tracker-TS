import React from 'react';

interface GraphButtonsProps {
  timeframe: string;
  setTimeframe: (timeframe: string) => void;
}

const GraphButtons: React.FC<GraphButtonsProps> = ({ timeframe, setTimeframe }) => {
  const arr = ['1D', '5D', '1M', '6M', '1Y', '5Y'];

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

export default GraphButtons;

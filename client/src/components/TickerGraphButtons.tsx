import React, { useState } from 'react';

interface TickerGraphButtonsProps {}

const TickerGraphButtons: React.FC<TickerGraphButtonsProps> = ({}) => {
  const arr = ['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y'];
  const [current, setCurrent] = useState('1D');

  return (
    <div className='mt-3'>
      {arr.map(value => (
        <div className={`d-inline ticker-graph-button ${current === value ? 'active' : 'nonactive'}`} onClick={() => setCurrent(value)}>
          {value}
        </div>
      ))}
    </div>
  );
};

export default TickerGraphButtons;

import React from 'react';
import { Badge } from 'react-bootstrap';

interface TickerGraphButtonsProps {}

const TickerGraphButtons: React.FC<TickerGraphButtonsProps> = ({}) => {
  const arr = ['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y'];
  return (
    <div className='d-inline ticker-graph-buttons'>
      {arr.map(value => (
        <Badge variant='primary'>{value}</Badge>
      ))}
    </div>
  );
};

export default TickerGraphButtons;

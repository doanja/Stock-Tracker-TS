import React from 'react';
import { Badge } from 'react-bootstrap';

interface TickerHeaderProps {
  tickerPrice: TickerPrice;
}

// TODO: show actual price change instead of first

const TickerHeader: React.FC<TickerHeaderProps> = ({ tickerPrice }) => {
  return (
    <div className='d-inline ticker-header'>
      {tickerPrice.companyName}
      <Badge variant='primary' className='float-right'>
        {tickerPrice.symbol}
      </Badge>
    </div>
  );
};

export default TickerHeader;

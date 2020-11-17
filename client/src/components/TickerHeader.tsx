import React from 'react';

interface TickerHeaderProps {
  tickerPrice: TickerPrice;
}

const TickerHeader: React.FC<TickerHeaderProps> = ({ tickerPrice }) => {
  return <h1>ticker price</h1>;
};

export default TickerHeader;

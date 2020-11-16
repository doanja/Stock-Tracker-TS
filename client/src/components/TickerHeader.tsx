import React from 'react';

interface TickerHeaderProps {
  tickerPrice: TickerPrice;
}

export const TickerHeader: React.FC<TickerHeaderProps> = ({ tickerPrice }) => {
  return <h1>ticker price</h1>;
};

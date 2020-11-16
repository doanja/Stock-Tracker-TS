import React from 'react';

interface TickerContainerProps {
  tickerPrice: TickerPrice;
}

export const TickerContainer: React.FC<TickerContainerProps> = ({ tickerPrice }) => {
  return <h1>ticker container</h1>;
};

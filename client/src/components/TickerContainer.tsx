import React from 'react';

interface TickerContainerProps {
  tickerPrice: TickerPrice;
}

const TickerContainer: React.FC<TickerContainerProps> = ({ tickerPrice }) => {
  return <h1>ticker container</h1>;
};

export default TickerContainer;

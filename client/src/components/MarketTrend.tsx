import React from 'react';

interface MarketTrendProps {
  tickerPrice: TickerPrice;
}

const MarketTrend: React.FC<MarketTrendProps> = ({ tickerPrice }) => {
  return <p>{tickerPrice.companyName}</p>;
};

export default MarketTrend;

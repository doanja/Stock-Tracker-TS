import React from 'react';

interface QuoteProps {
  tickerPrice: TickerPrice;
}

const Quote: React.FC<QuoteProps> = ({ tickerPrice }) => {
  return <h1>quote</h1>;
};

export default Quote;

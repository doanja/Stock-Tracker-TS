import React, { useState, useEffect } from 'react';
import { TickerLine } from './';
import { Container, Row } from 'react-bootstrap';
import '../styles/ticker.min.css';

interface TickerLineContainerProps {
  tickerPrices?: TickerPrice[];
  watchlist: string[];
}

const TickerLineContainer: React.FC<TickerLineContainerProps> = ({ tickerPrices, watchlist }) => {
  let tickers = tickerPrices?.sort(() => Math.random() - Math.random()).slice(0, 5);

  const shufflePrices = (): void => {
    if (tickerPrices) tickers = tickerPrices?.sort(() => Math.random() - Math.random()).slice(0, 5);
  };

  useEffect(() => {
    shufflePrices();

    const interval = setInterval(() => {
      if (tickerPrices) shufflePrices();
    }, 5000);
    return () => clearInterval(interval);
  }, [watchlist]);

  return (
    <Container className='mt-3'>
      <Row>
        {tickers?.map((ticker: TickerPrice) => (
          <TickerLine ticker={ticker} key={ticker.symbol} />
        ))}
      </Row>
    </Container>
  );
};
export default TickerLineContainer;

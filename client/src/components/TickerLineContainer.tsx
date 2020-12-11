import React, { useState, useEffect } from 'react';
import { TickerLine } from './';
import { Container, Row } from 'react-bootstrap';
import '../styles/ticker.min.css';

interface TickerLineContainerProps {
  tickerPrices?: TickerPrice[];
}

const TickerLineContainer: React.FC<TickerLineContainerProps> = ({ tickerPrices }) => {
  const [prices, setPrices] = useState<TickerPrice[] | undefined>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (tickerPrices) setPrices(tickerPrices.sort(() => Math.random() - Math.random()).slice(0, 5));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container className='mt-3'>
      <Row>
        {prices?.map((ticker: TickerPrice) => (
          <TickerLine ticker={ticker} />
        ))}
      </Row>
    </Container>
  );
};
export default TickerLineContainer;

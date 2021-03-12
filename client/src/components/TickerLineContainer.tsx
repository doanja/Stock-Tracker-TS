import React from 'react';
import { TickerLine } from './';
import { Container, Row } from 'react-bootstrap';
import '../styles/ticker.min.css';

interface TickerLineContainerProps {
  tickerPrices: TickerPrice[];
}

const TickerLineContainer: React.FC<TickerLineContainerProps> = ({ tickerPrices }) => {
  return (
    <Container className='mt-3'>
      <Row>
        {tickerPrices.slice(0, 5).map((ticker: TickerPrice) => (
          <TickerLine ticker={ticker} key={ticker.symbol} />
        ))}
      </Row>
    </Container>
  );
};
export default TickerLineContainer;

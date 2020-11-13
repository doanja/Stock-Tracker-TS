import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/ticker.min.css';

interface TickerLineProps {
  tickerPrices?: TickerPrice[];
}

const TickerLine: React.FC<TickerLineProps> = ({ tickerPrices }) => {
  // each ticker box, needs the name, current price, how much it went up/down

  return (
    <Container className='mt-3 test'>
      <div className='d-inline'>
        {tickerPrices?.map(ticker => (
          <Link to={`/quote/${ticker.symbol}`} key={ticker.symbol}>
            <div className='ticker-item'>
              <h3 className='text-white text-center'>{ticker.symbol}</h3>
              <h3 className='text-white text-center'>{ticker.prices[1].price}</h3>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default TickerLine;

import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/ticker.min.css';

interface TickerLineProps {
  watchlist?: string[];
}

const TickerLine: React.FC<TickerLineProps> = ({ watchlist }) => {
  // each ticker box, needs the name, current price, how much it went up/down
  console.log('watchlist :>> ', watchlist);
  return (
    <div className='mt-3 test'>
      <div className='ticker'>
        {watchlist?.map(ticker => (
          <Link to={`/quote/${ticker}`} key={ticker}>
            <div className='ticker-item'>
              <h3 className='text-white text-center'>{ticker}</h3>
              <p>{/* {stock.price} ({stock.changePercent}) */}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TickerLine;

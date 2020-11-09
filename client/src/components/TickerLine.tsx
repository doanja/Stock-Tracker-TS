import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

interface TickerLineProps {
  watchlist?: string[];
}

const TickerLine: React.FC<TickerLineProps> = ({ watchlist }) => {
  // each ticker box, needs the name, current price, how much it went up/down
  console.log('watchlist :>> ', watchlist);
  return (
    // <Fragment>
    //   {watchlist?.map(ticker => (
    //     <div key={ticker} style={{ border: '1px solid grey', height: '100px', width: '200px' }}>
    //       <p>{ticker}</p>
    //     </div>
    //     // <p key={ticker}>{ticker}</p>
    //   ))}
    // </Fragment>

    <div className='ticker-wrap'>
      <div className='ticker'>
        {watchlist?.map(ticker => (
          <Link to={`/quote/${ticker}`} key={ticker}>
            <div className='ticker__item'>
              <h3 className='text-white'>{ticker}</h3>
              <p>{/* {stock.price} ({stock.changePercent}) */}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TickerLine;

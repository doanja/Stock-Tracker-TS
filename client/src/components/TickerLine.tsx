import React, { Fragment } from 'react';

interface TickerLineProps {
  watchlist?: Ticker[];
}

const TickerLine: React.FC<TickerLineProps> = ({ watchlist }) => {
  // each ticker box, needs the name, current price, how much it went up/down
  console.log('watchlist :>> ', watchlist);
  return (
    <Fragment>
      {watchlist?.map(ticker => (
        // <div style={{ border: '1px solid grey', height: '100px', width: '200px' }}>
        //   <p>{ticker['Company Name']}</p>
        // </div>
        <p>{ticker.Symbol}</p>
      ))}
    </Fragment>
  );
};

export default TickerLine;

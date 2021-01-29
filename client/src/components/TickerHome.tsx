import React, { Fragment } from 'react';
import { ReconmendedContainer, MostFollowedContainer, WatchlistContainer, TickerLineContainer } from './';

import { Spinner } from 'react-bootstrap';
import '../styles/main.min.css';

interface TickerHomeProps {
  loginStatus: boolean;
  watchlistPrices: TickerPrice[][];
}

const TickerHome: React.FC<TickerHomeProps> = ({ loginStatus, watchlistPrices }) => {
  return (
    <Fragment>
      {loginStatus ? (
        <WatchlistContainer />
      ) : (
        <div className='mt-3 ticker-home-wrap'>
          {watchlistPrices.length > 0 ? (
            <TickerLineContainer tickerPrices={watchlistPrices[watchlistPrices.length - 1]} />
          ) : (
            <div className='mt-3 text-center'>
              <Spinner animation='border' variant='light' />
            </div>
          )}
          <ReconmendedContainer />
          <MostFollowedContainer />
        </div>
      )}
    </Fragment>
  );
};

export default TickerHome;

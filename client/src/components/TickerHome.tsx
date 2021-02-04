import React, { Fragment } from 'react';
import { ReconmendedContainer, MostFollowedContainer, WatchlistContainer, TickerLineContainer, CustomSpinner } from './';

import '../styles/main.min.css';

interface TickerHomeProps {
  loginStatus: boolean;
  watchlistPrices: WatchlistPrice[];
}

const TickerHome: React.FC<TickerHomeProps> = ({ loginStatus, watchlistPrices }) => {
  return (
    <Fragment>
      {loginStatus ? (
        <WatchlistContainer />
      ) : (
        <div className='mt-3 ticker-home-wrap'>
          {watchlistPrices.length > 0 ? (
            <TickerLineContainer tickerPrices={watchlistPrices[watchlistPrices.length - 1].tickerPrices} />
          ) : (
            <CustomSpinner />
          )}
          <ReconmendedContainer />
          <MostFollowedContainer />
        </div>
      )}
    </Fragment>
  );
};

export default TickerHome;

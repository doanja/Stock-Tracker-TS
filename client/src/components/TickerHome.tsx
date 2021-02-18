import React, { Fragment, useEffect } from 'react';
import { ReconmendedContainer, MostFollowedContainer, WatchlistContainer, TickerLineContainer, CustomSpinner } from './';
import '../styles/main.min.css';

interface TickerHomeProps {
  loginStatus: boolean;
  watchlistPrices: WatchlistPrice[];
}

const TickerHome: React.FC<TickerHomeProps> = ({ loginStatus, watchlistPrices }) => {
  useEffect(() => {
    console.log('loginStatus', loginStatus);
  }, [loginStatus]);

  useEffect(() => {
    console.log('watchlistPrices', watchlistPrices);
  }, [watchlistPrices]);

  return (
    <Fragment>
      {loginStatus ? (
        <Fragment>
          {watchlistPrices.length > 0 ? (
            <TickerLineContainer tickerPrices={watchlistPrices[watchlistPrices.length - 1].tickerPrices} />
          ) : (
            <CustomSpinner />
          )}
          <WatchlistContainer />
        </Fragment>
      ) : (
        <div className='mt-3 ticker-home-wrap'>
          <ReconmendedContainer />
          <MostFollowedContainer />
        </div>
      )}
    </Fragment>
  );
};

export default TickerHome;

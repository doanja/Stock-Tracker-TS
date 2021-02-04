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
        <div>
          {watchlistPrices.length > 0 ? (
            <div>
              <div className='okay'>
                <TickerLineContainer tickerPrices={watchlistPrices[watchlistPrices.length - 1].tickerPrices} />
              </div>
              <div className='break'></div>
            </div>
          ) : (
            <CustomSpinner />
          )}

          <div className='mt-3 ticker-home-wrap'>
            <ReconmendedContainer />
            <MostFollowedContainer />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default TickerHome;

import React, { useState, useEffect, Fragment } from 'react';
import { ReconmendedContainer, MostFollowedContainer, WatchlistLine, WatchlistSummaryParent, TickerLineContainer } from './';
import '../styles/main.min.css';

// redux
import { useSelector } from 'react-redux';
import { RootStore } from '../redux/Store';

interface TickerHomeProps {
  loginStatus: boolean;
  watchlistPrices: WatchlistPrice[];
}

const TickerHome: React.FC<TickerHomeProps> = ({ loginStatus, watchlistPrices }) => {
  // TODO: figure out how to setCurrentWatchlist to recently created list
  // redux
  const { watchlists } = useSelector((state: RootStore) => state.stock);
  const [currentWatchlist, setCurrentWatchlist] = useState<WatchlistPrice | undefined>();

  useEffect(() => {
    setCurrentWatchlist(watchlistPrices[0]);
  }, [watchlists, watchlistPrices]);

  return (
    <Fragment>
      {currentWatchlist && loginStatus ? (
        <Fragment>
          <TickerLineContainer tickerPrices={currentWatchlist.tickerPrices} />

          <div className='mt-3'>
            <WatchlistLine watchlistPrices={watchlistPrices} currentWatchlist={currentWatchlist} setCurrentWatchlist={setCurrentWatchlist} />
            <WatchlistSummaryParent watchlistPrices={currentWatchlist} />
          </div>
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

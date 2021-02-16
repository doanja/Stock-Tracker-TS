import React, { useState, useEffect, Fragment } from 'react';
import { WatchlistLine, CustomSpinner } from './';

// redux
import { useSelector } from 'react-redux';
import { RootStore } from '../redux/Store';
import WatchlistSummaryContainer from './WatchlistSummaryContainer';

const WatchlistContainer: React.FC = () => {
  // redux
  const { watchlistPrices, watchlists } = useSelector((state: RootStore) => state.stock);
  const [currentWatchlist, setCurrentWatchlist] = useState<WatchlistPrice | undefined>();

  // TODO: figure out how to setCurrentWatchlist to recently created list

  useEffect(() => {
    if (watchlists.length > 0) {
      setCurrentWatchlist(watchlistPrices[0]);
    }
  }, [watchlists]);

  useEffect(() => {
    console.log('currentWatchlist', currentWatchlist);
  }, [currentWatchlist]);

  return (
    <div className='mt-3'>
      {currentWatchlist ? (
        <Fragment>
          <WatchlistLine watchlistPrices={watchlistPrices} currentWatchlist={currentWatchlist} setCurrentWatchlist={setCurrentWatchlist} />
          <WatchlistSummaryContainer watchlistPrices={currentWatchlist} />
        </Fragment>
      ) : (
        <CustomSpinner />
      )}
    </div>
  );
};

export default WatchlistContainer;

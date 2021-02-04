import React, { useState, useEffect, Fragment } from 'react';
import WatchlistLine from './WatchlistLine';

// redux
import { useSelector } from 'react-redux';
import { RootStore } from '../redux/Store';
import WatchlistSummaryContainer from './WatchlistSummaryContainer';

const WatchlistContainer: React.FC = () => {
  // redux
  const { watchlistPrices, watchlists } = useSelector((state: RootStore) => state.stock);

  const [currentWatchlist, setCurrentWatchlist] = useState<WatchlistPrice | undefined>();

  useEffect(() => {
    if (watchlists.length > 0) setCurrentWatchlist(watchlistPrices[watchlistPrices.length - 1]);
  }, []);

  // useEffect(() => {
  //   if (watchlists.length > 0) setCurrentWatchlist(watchlistPrices[0]);
  // }, [watchlists]);

  return (
    <div className='mt-3'>
      {watchlistPrices.length > 0 && currentWatchlist?.watchlistId ? (
        <Fragment>
          <WatchlistLine
            watchlistPrices={watchlistPrices}
            currentWatchlistId={currentWatchlist.watchlistId}
            setCurrentWatchlist={setCurrentWatchlist}
          />
          <WatchlistSummaryContainer watchlistPrices={currentWatchlist} />
        </Fragment>
      ) : null}
    </div>
  );
};

export default WatchlistContainer;

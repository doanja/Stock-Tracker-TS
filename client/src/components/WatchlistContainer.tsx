import React, { useState, useEffect, Fragment } from 'react';
import { WatchlistLine, WatchlistSummaryContainer, CustomSpinner } from './';

// redux
import { useSelector } from 'react-redux';
import { RootStore } from '../redux/Store';

const WatchlistContainer: React.FC = () => {
  // redux
  const { watchlistPrices, watchlists } = useSelector((state: RootStore) => state.stock);
  const [wlPriceCopy, setWlPriceCopy] = useState<WatchlistPrice[]>([]);
  const [currentWatchlist, setCurrentWatchlist] = useState<WatchlistPrice | undefined>();

  // TODO: figure out how to setCurrentWatchlist to recently created list

  useEffect(() => {
    setWlPriceCopy([...watchlistPrices]);

    setCurrentWatchlist(wlPriceCopy[0]);
  }, [watchlists]);

  useEffect(() => {
    console.log('currentWatchlist', currentWatchlist);

    console.log('watchlists', watchlists);

    console.log('watchlistPrices', watchlistPrices);

    console.log('wlPriceCopy', wlPriceCopy);

    console.log('----------------------------------');
  }, [currentWatchlist, watchlists]);

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

import React, { useState, useEffect } from 'react';
import WatchlistLine from './WatchlistLine';

// redux
import { useSelector } from 'react-redux';
import { RootStore } from '../redux/Store';
import WatchlistSummaryContainer from './WatchlistSummaryContainer';

const WatchlistContainer: React.FC = () => {
  // redux
  const { watchlistPrices, watchlists } = useSelector((state: RootStore) => state.stock);

  const [currentWatchlist, setCurrentWatchlist] = useState<Watchlist | undefined>();
  const [index, setIndex] = useState<number | undefined>();

  useEffect(() => {
    if (watchlists.length > 0) {
      setCurrentWatchlist(watchlists[0]);
      setIndex(0);
    }
  }, [watchlists]);

  return (
    <div className='mt-3'>
      <WatchlistLine watchlists={watchlists} setCurrentWatchlist={setCurrentWatchlist} index={index} setIndex={setIndex} />
      {watchlistPrices.length > 0 && index !== undefined ? (
        <WatchlistSummaryContainer watchlist={currentWatchlist} watchlistPrices={watchlistPrices[index]} index={index} />
      ) : null}
    </div>
  );
};

export default WatchlistContainer;

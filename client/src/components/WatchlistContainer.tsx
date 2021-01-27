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

  return (
    <div>
      <h1>this is the watchlist container</h1>

      <WatchlistLine watchlists={watchlists} setCurrentWatchlist={setCurrentWatchlist} />
      <WatchlistSummaryContainer watchlist={currentWatchlist} />
    </div>
  );
};

export default WatchlistContainer;

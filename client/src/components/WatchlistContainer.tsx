import React, { useState, useEffect } from 'react';
import WatchlistLine from './WatchlistLine';

// redux
import { useSelector } from 'react-redux';
import { RootStore } from '../redux/Store';
import WatchlistSummaryContainer from './WatchlistSummaryContainer';

const WatchlistContainer: React.FC = () => {
  // redux
  const { watchlistPrices, watchlists } = useSelector((state: RootStore) => state.stock);

  const [currentWatchlist, setCurrentWatchlist] = useState<Watchlist>(watchlists[0]); // does not like 0
  const [index, setIndex] = useState<number>(0);

  return (
    <div className='mt-3'>
      <WatchlistLine watchlists={watchlists} setCurrentWatchlist={setCurrentWatchlist} setIndex={setIndex} />
      <WatchlistSummaryContainer watchlist={currentWatchlist} watchlistPrices={watchlistPrices[index]} index={index} />
    </div>
  );
};

export default WatchlistContainer;

import React, { Fragment } from 'react';
import WatchlistLine from './WatchlistLine';

// redux
import { useSelector } from 'react-redux';
import { RootStore } from '../redux/Store';

const WatchlistContainer: React.FC = () => {
  // redux
  const { watchlistPrices, watchlists } = useSelector((state: RootStore) => state.stock);

  return (
    <div>
      <h1>this is the watchlist container</h1>

      <WatchlistLine watchlists={watchlists} />
    </div>
  );
};

export default WatchlistContainer;

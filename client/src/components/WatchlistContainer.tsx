import React, { useState, useEffect } from 'react';
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
    // console.log('watchlists :>> ', watchlists);

    // console.log('watchlistPrices[0] :>> ', watchlistPrices[0]);
    if (watchlists.length > 0) {
      // console.log('watchlist length reater than 0');
      // console.log('watchlistPrices[0] :>> ', watchlistPrices[0]);
      setCurrentWatchlist(watchlistPrices[0]);
      // console.log('watchlists', watchlists);
      // console.log('currentWatchlist', currentWatchlist);
      // console.log('watchlistPrices[0]', watchlistPrices[0]);
    }
  }, [watchlists]);

  return (
    <div className='mt-3'>
      <WatchlistLine watchlistPrices={watchlistPrices} currentWatchlist={currentWatchlist} setCurrentWatchlist={setCurrentWatchlist} />
      {currentWatchlist ? <WatchlistSummaryContainer watchlistPrices={currentWatchlist} /> : <CustomSpinner />}
    </div>
  );
};

export default WatchlistContainer;

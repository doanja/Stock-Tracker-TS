import React, { Fragment } from 'react';
import { ReconmendedContainer, MostFollowedContainer, WatchlistSummaryTickerParent, WatchlistSummaryParent, TickerLineContainer } from '.';
import '../styles/main.min.css';

// redux
import { useSelector } from 'react-redux';
import { RootStore } from '../redux/Store';

const HomeContainer: React.FC = () => {
  // TODO: figure out how to setCurrentWatchlist to recently created list
  // TODO: find way to not refresh entire watchlistPrices so WatchlistSummaryTickerParent doesn't have to refresh 20x

  // redux
  const { loginStatus } = useSelector((state: RootStore) => state.auth);
  const { watchlists, currentWatchlist, currentWatchlistPrice } = useSelector((state: RootStore) => state.stock);

  return (
    <Fragment>
      {currentWatchlistPrice && loginStatus ? <TickerLineContainer tickerPrices={currentWatchlistPrice.tickerPrices} /> : null}

      {loginStatus ? (
        <div className='mt-3'>
          <WatchlistSummaryTickerParent watchlists={watchlists} />
        </div>
      ) : null}

      {currentWatchlist && currentWatchlistPrice && loginStatus ? (
        <WatchlistSummaryParent currentWatchlist={currentWatchlist} currentWatchlistPrice={currentWatchlistPrice} />
      ) : (
        <div className='mt-3 ticker-home-wrap'>
          <ReconmendedContainer />
          <MostFollowedContainer />
        </div>
      )}
    </Fragment>
  );
};

export default HomeContainer;

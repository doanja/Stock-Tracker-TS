import React, { useState, Fragment } from 'react';
import { ReconmendedContainer, MostFollowedContainer, WatchlistSummaryTickerParent, WatchlistSummaryParent, TickerLineContainer } from '.';
import '../styles/main.min.css';

interface HomeContainerProps {
  loginStatus: boolean;
  watchlistPrices: WatchlistPrice[];
}

const HomeContainer: React.FC<HomeContainerProps> = ({ loginStatus, watchlistPrices }) => {
  // TODO: figure out how to setCurrentWatchlist to recently created list
  // TODO: find way to not refresh entire watchlistPrices so WatchlistSummaryTickerParent doesn't have to refresh 20x

  // redux
  const [currentWatchlist, setCurrentWatchlist] = useState<WatchlistPrice | undefined>();

  return (
    <Fragment>
      {currentWatchlist && loginStatus && currentWatchlist ? <TickerLineContainer tickerPrices={currentWatchlist.tickerPrices} /> : null}

      {loginStatus ? (
        <div className='mt-3'>
          <WatchlistSummaryTickerParent
            watchlistPrices={watchlistPrices}
            currentWatchlist={currentWatchlist}
            setCurrentWatchlist={setCurrentWatchlist}
          />
        </div>
      ) : null}

      {currentWatchlist && loginStatus ? (
        <WatchlistSummaryParent watchlistPrices={currentWatchlist} />
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

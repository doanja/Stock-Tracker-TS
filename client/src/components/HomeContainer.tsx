import React, { useState, useEffect, Fragment } from 'react';
import { ReconmendedContainer, MostFollowedContainer, WatchlistSummaryTickerParent, WatchlistSummaryParent, TickerLineContainer } from '.';
import '../styles/main.min.css';

// redux
import { useSelector } from 'react-redux';
import { RootStore } from '../redux/Store';

interface HomeContainerProps {
  loginStatus: boolean;
  watchlistPrices: WatchlistPrice[];
}

const HomeContainer: React.FC<HomeContainerProps> = ({ loginStatus, watchlistPrices }) => {
  // TODO: figure out how to setCurrentWatchlist to recently created list
  // redux
  const { watchlists } = useSelector((state: RootStore) => state.stock);
  const [currentWatchlist, setCurrentWatchlist] = useState<WatchlistPrice | undefined>();

  useEffect(() => {
    // TODO: solve issue when adding tickers would re-load the watchlisttickerline like mad

    setCurrentWatchlist(watchlistPrices[0]);
    console.log('something changed with watchlistPrices', watchlistPrices);
  }, [watchlistPrices]);

  return (
    <Fragment>
      {currentWatchlist && loginStatus ? (
        <Fragment>
          <TickerLineContainer tickerPrices={currentWatchlist.tickerPrices} />

          <div className='mt-3'>
            <WatchlistSummaryTickerParent
              watchlistPrices={watchlistPrices}
              currentWatchlist={currentWatchlist}
              setCurrentWatchlist={setCurrentWatchlist}
            />
            <WatchlistSummaryParent watchlistPrices={currentWatchlist} />
          </div>
        </Fragment>
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

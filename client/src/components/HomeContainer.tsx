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

  const compareTickerPrices = (a: TickerPrice[], b: TickerPrice[]): boolean => {
    for (let i = 0; i < a.length; ++i) {
      if (a[i].symbol !== b[i].symbol) return false;
    }
    return true;
  };

  useEffect(() => {
    // TODO: solve issue when adding tickers would re-load the watchlisttickerline like mad

    console.log('watchlists', watchlists);

    if (!currentWatchlist && watchlists.length > 0) {
      console.log('current watchlist is undefined, setting current watchlist');
      setCurrentWatchlist(watchlistPrices[0]);
      console.log('watchlistPrices[0]', watchlistPrices[0]);
      console.log('currentWatchlist', currentWatchlist);
    } else if (currentWatchlist && compareTickerPrices(currentWatchlist.tickerPrices, watchlistPrices[0].tickerPrices)) {
      console.log('do nothing');
    }
  }, [/*watchlistPrices*/ watchlists, watchlistPrices]);

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

import React, { useEffect, Fragment } from 'react';
import {
  SearchBar,
  CustomNavbar,
  HomeContainer,
  TickerNewsContainer,
  TickerAbout,
  CustomFooter,
  DiscoverContainer,
  MarketTrendsContainer,
  TickerContainerWrap,
} from '../components';
import { useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { generateWatchlist, getTickerPrices } from '../helper';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTickerPrice, setWatchlistPrices } from '../redux/actions/stockActions';
import { RootStore } from '../redux/Store';

const Home: React.FC = () => {
  const history = useHistory();

  // redux
  const { loginStatus } = useSelector((state: RootStore) => state.auth);
  const { currentTickerPrice, currentTicker, currentWatchlistPrice, watchlistPrices } = useSelector((state: RootStore) => state.stock);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginStatus) history.push('/watchlist');
    //  else if not login, generate some watchlist
    else {
      const watchlistPrices: WatchlistPrice[] = [];
      const watchlistPrice: WatchlistPrice = { tickerPrices: [] };

      getTickerPrices(generateWatchlist(5)).then(res => {
        const prices: TickerPrice[] = res.data.tickerPrices;

        for (let i = 0; i < prices.length; i++) {
          watchlistPrice.tickerPrices.push(prices[i]);
        }
        watchlistPrices.push(watchlistPrice);

        dispatch(setWatchlistPrices(watchlistPrices));
      });
    }
  }, [loginStatus, history, dispatch]);

  useEffect(() => {
    if (currentTicker) {
      let tickerPrice: TickerPrice | undefined;

      if (currentWatchlistPrice) {
        tickerPrice = currentWatchlistPrice.tickerPrices.find((tp: TickerPrice) => tp.symbol === currentTicker);
      } else if (watchlistPrices && watchlistPrices.length > 0) {
        tickerPrice = watchlistPrices[watchlistPrices.length - 1].tickerPrices.find((tp: TickerPrice) => tp.symbol === currentTicker);
      }

      if (tickerPrice) {
        dispatch(setCurrentTickerPrice(tickerPrice));
      } else {
        getTickerPrices([currentTicker]).then(res => dispatch(setCurrentTickerPrice(res.data.tickerPrices[0])));
      }

      window.scrollTo(0, 0);
    }
  }, [currentTicker, currentWatchlistPrice, watchlistPrices, dispatch]);

  return (
    <Fragment>
      <CustomNavbar />
      <Container className='home-wrap'>
        <SearchBar />

        {currentTicker && currentTickerPrice ? (
          <TickerContainerWrap currentWatchlistPrice={currentWatchlistPrice} currentTicker={currentTicker} currentTickerPrice={currentTickerPrice} />
        ) : (
          <HomeContainer />
        )}

        <div className='my-3 ticker-home-wrap'>
          <TickerNewsContainer ticker={currentTicker} />
          {currentTicker && currentTickerPrice ? <TickerAbout tickerPrice={currentTickerPrice} /> : <MarketTrendsContainer />}
        </div>
      </Container>
      <DiscoverContainer heading={'Discover more'} />
      <DiscoverContainer heading={'People also search for'} />
      <CustomFooter />
    </Fragment>
  );
};

export default Home;

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
  const { currentTickerPrice, watchlistPrices, currentTicker } = useSelector((state: RootStore) => state.stock);
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

        // TODO: move dispatch method outside of loop after forEach loop ends
        dispatch(setWatchlistPrices(watchlistPrices));
      });
    }
  }, [loginStatus, history, dispatch]);

  useEffect(() => {
    if (currentTicker) {
      // search for ticker in default watchlist
      const tickerPrice: TickerPrice | undefined = watchlistPrices[watchlistPrices.length - 1].tickerPrices.find(
        (tp: TickerPrice) => tp.symbol === currentTicker
      );

      if (tickerPrice) dispatch(setCurrentTickerPrice(tickerPrice));
      // if tickerPrice wasn't found, get the tickerPrice from the API
      else getTickerPrices([currentTicker]).then(res => dispatch(setCurrentTickerPrice(res.data.tickerPrices[0])));

      window.scrollTo(0, 0);
    }
  }, [currentTicker, watchlistPrices, dispatch]);

  return (
    <Fragment>
      <CustomNavbar />
      <Container className='home-wrap'>
        <SearchBar />

        {currentTicker && currentTickerPrice ? (
          <TickerContainerWrap watchlistPrices={watchlistPrices} currentTicker={currentTicker} currentTickerPrice={currentTickerPrice} />
        ) : (
          <HomeContainer loginStatus={loginStatus} watchlistPrices={watchlistPrices} />
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

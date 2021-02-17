import React, { useEffect, Fragment } from 'react';
import {
  SearchBar,
  CustomNavbar,
  TickerHome,
  TickerNewsContainer,
  TickerAbout,
  CustomFooter,
  DiscoverContainer,
  MarketTrendsContainer,
  TickerContainerWrap,
} from '../components';
import { StockService } from '../services';
import { useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { getTickerName, generateWatchlist } from '../helper';

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
      const stockAPI = new StockService();
      const watchlist: string[] = generateWatchlist(5);
      const watchlistPrices: WatchlistPrice[] = [];
      const watchlistPrice: WatchlistPrice = { tickerPrices: [] };

      const loadPrices = async () => Promise.all(watchlist.map(() => stockAPI.getTickerPrices()));

      loadPrices().then(promise => {
        for (let i = 0; i < promise.length; i++) {
          watchlistPrice.tickerPrices.push({ symbol: watchlist[i], companyName: getTickerName(watchlist[i]), prices: promise[i].data.prices });
        }
        watchlistPrices.push(watchlistPrice);
        dispatch(setWatchlistPrices(watchlistPrices));
      });
    }
  }, [loginStatus, history, dispatch]);

  useEffect(() => {
    if (currentTicker) {
      const stockAPI = new StockService();
      // search for ticker in default watchlist
      const tickerPrice: TickerPrice | undefined = watchlistPrices[watchlistPrices.length - 1].tickerPrices.find(
        (tp: TickerPrice) => tp.symbol === currentTicker
      );

      if (tickerPrice) dispatch(setCurrentTickerPrice(tickerPrice));

      const tickerPriceData = async () => stockAPI.getTickerPrices();

      tickerPriceData().then(promise => {
        dispatch(
          setCurrentTickerPrice({
            symbol: currentTicker,
            companyName: getTickerName(currentTicker),
            prices: promise.data.prices,
          })
        );
      });

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
          <TickerHome loginStatus={loginStatus} watchlistPrices={watchlistPrices} />
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

import React, { useEffect, Fragment } from 'react';
import {
  SearchBar,
  CustomNavbar,
  TickerContainer,
  TickerHome,
  TickerNewsContainer,
  TickerAbout,
  CustomFooter,
  DiscoverContainer,
  SaveButton,
  TickerLineContainer,
  MarketTrendsContainer,
  WatchlistContainer,
} from '../components';
import { StockService } from '../services';
import { useHistory } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import { getTickerName, generateWatchlist } from '../helper';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTickerPrice, setWatchlistPrices } from '../redux/actions/stockActions';
import { RootStore } from '../redux/Store';

const Home: React.FC = () => {
  const stockAPI = new StockService();
  const history = useHistory();

  // redux
  const { loginStatus } = useSelector((state: RootStore) => state.auth);
  const { currentTickerPrice, watchlistPrices, currentTicker } = useSelector((state: RootStore) => state.stock);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginStatus) history.push('/watchlist');
    //  else if not login, generate some watchlist
    else {
      const watchlist: string[] = generateWatchlist(5);
      const watchlistPrices: TickerPrice[][] = [];
      const tickerPrices: TickerPrice[] = [];

      const loadPrices = async () => Promise.all(watchlist.map(ticker => stockAPI.getTickerPrices()));

      loadPrices().then(promise => {
        for (let i = 0; i < promise.length; i++) {
          tickerPrices.push({ symbol: watchlist[i], companyName: getTickerName(watchlist[i]), prices: promise[i].data.prices });
        }
        watchlistPrices.push(tickerPrices);
        dispatch(setWatchlistPrices(watchlistPrices.reverse()));
      });
    }
  }, []);

  useEffect(() => {
    if (currentTicker) {
      // search for ticker in default watchlist
      const tickerPrice: TickerPrice | undefined = watchlistPrices[watchlistPrices.length - 1].find((tp: TickerPrice) => tp.symbol === currentTicker);

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
  }, [currentTicker]);

  return (
    <Fragment>
      <CustomNavbar />
      <Container className='home-wrap'>
        <SearchBar />

        <WatchlistContainer />

        {/* hide this */}
        {/* {watchlistPrices.length > 0 ? (
          <TickerLineContainer tickerPrices={watchlistPrices[watchlistPrices.length - 1]} />
        ) : (
          <div className='mt-3 text-center'>
            <Spinner animation='border' variant='light' />
          </div>
        )}

        {currentTicker && currentTickerPrice ? (
          <div className='mt-3'>
            <SaveButton ticker={currentTicker} />
            <TickerContainer tickerPrice={currentTickerPrice} ticker={currentTicker} />
          </div>
        ) : (
          <TickerHome />
        )}

        <div className='my-3 ticker-home-wrap'>
          <TickerNewsContainer ticker={currentTicker} />
          {currentTicker && currentTickerPrice ? <TickerAbout tickerPrice={currentTickerPrice} /> : <MarketTrendsContainer />}
        </div> */}
        {/* to this for watchlist */}
      </Container>
      {/* <DiscoverContainer heading={'Discover more'} />
      <DiscoverContainer heading={'People also search for'} /> */}
      <CustomFooter />
    </Fragment>
  );
};

export default Home;

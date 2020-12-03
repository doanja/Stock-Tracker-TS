import React, { useEffect, Fragment } from 'react';
import { SearchBar, CustomNavbar, TickerLine, TickerContainer, TickerHome, TickerNewsContainer, TickerAbout } from '../components';
import { StockService } from '../services';
import { useHistory } from 'react-router-dom';
import { Container, Spinner, Row } from 'react-bootstrap';
import { getTickerName, generateWatchlist } from '../helper';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setTickerPrice, setTickerPrices } from '../redux/actions/stockActions';
import { RootStore } from '../redux/Store';

const Home: React.FC = () => {
  const stockAPI = new StockService();
  const history = useHistory();

  // redux
  const { loginStatus } = useSelector((state: RootStore) => state.auth);
  const { tickerPrice, tickerPrices, ticker } = useSelector((state: RootStore) => state.stock);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginStatus) history.push('/watchlist');
    //  else if not login, generate some watchlist
    else {
      const sampleWatchlist = generateWatchlist(5);

      const loadPrices = async () => Promise.all(sampleWatchlist.map(ticker => stockAPI.getTickerPrices()));

      const tickerPrices: TickerPrice[] = [];

      loadPrices().then(promise => {
        for (let i = 0; i < promise.length; i++) {
          tickerPrices.push({ symbol: sampleWatchlist[i], companyName: getTickerName(sampleWatchlist[i]), prices: promise[i].data.prices });
        }
        dispatch(setTickerPrices(tickerPrices));
      });
    }
  }, []);

  useEffect(() => {
    let currentTickerPrice: TickerPrice | undefined = tickerPrices.find((tick: TickerPrice) => tick.symbol === ticker);

    if (currentTickerPrice) dispatch(setTickerPrice(currentTickerPrice));

    // case for when searching for a stock
    if (!currentTickerPrice && ticker) {
      const tickerPriceData = async () => stockAPI.getTickerPrices();

      tickerPriceData().then(promise => {
        currentTickerPrice = { symbol: ticker as string, companyName: getTickerName(ticker as string), prices: promise.data.prices };
        dispatch(setTickerPrice(currentTickerPrice));
      });
    }
  }, [ticker]);

  return (
    <Fragment>
      <CustomNavbar />
      <Container>
        <SearchBar />

        {tickerPrices.length > 0 ? <TickerLine tickerPrices={tickerPrices} /> : <Spinner animation='grow' variant='light' className='d-block' />}

        {ticker && tickerPrice ? <TickerContainer tickerPrice={tickerPrice} ticker={ticker} /> : <TickerHome />}

        <Row noGutters={true}>
          <TickerNewsContainer ticker={ticker} />
          <TickerAbout tickerPrice={tickerPrice} />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Home;

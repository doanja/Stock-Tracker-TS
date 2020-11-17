import React, { useEffect, Fragment } from 'react';
import { SearchBar, CustomNavbar, TickerLine, TickerContainer, TickerHome } from '../components';
import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setTickerPrice } from '../redux/actions/stockActions';
import { RootStore } from '../redux/Store';

const Home: React.FC = () => {
  const history = useHistory();

  // redux
  const { loginStatus } = useSelector((state: RootStore) => state.auth);
  const { tickerPrice, tickerPrices, ticker } = useSelector((state: RootStore) => state.stock);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginStatus) history.push('/watchlist');

    // TODO: else if not login, generate some sample stocks
  }, []);

  useEffect(() => {
    const currentTickerPrice: TickerPrice = tickerPrices.find((tick: TickerPrice) => tick.symbol === ticker) as TickerPrice;
    dispatch(setTickerPrice(currentTickerPrice!));
  }, [ticker]);

  return (
    <Fragment>
      <CustomNavbar />
      <Container>
        <SearchBar />
        <TickerLine tickerPrices={tickerPrices} />

        {ticker ? <TickerContainer tickerPrice={tickerPrice} /> : <TickerHome />}
        {/* either show quote component or home component () */}
      </Container>
    </Fragment>
  );
};

export default Home;

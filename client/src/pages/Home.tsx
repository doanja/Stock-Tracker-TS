import React, { useEffect, Fragment } from 'react';
import { SearchBar, CustomNavbar } from '../components';
import { useHistory } from 'react-router-dom';
import { StockService } from '../services';
import Container from 'react-bootstrap/Container';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../redux/Store';
import { setTicker } from '../redux/actions/stockActions';

interface HomeProps {
  watchlist?: string[];
}

const Home: React.FC<HomeProps> = ({ watchlist }) => {
  const api = new StockService();
  const history = useHistory();

  // redux
  const { ticker } = useSelector((state: RootStore) => state.stock);

  const dispatch = useDispatch();

  useEffect(() => {
    if (ticker) history.push(`/stock/${ticker}`);
  }, [ticker]);

  // renders a single ticker
  const loadTicker: LoadTicker = ticker => dispatch(setTicker(ticker));

  return (
    <Fragment>
      <CustomNavbar />
      <Container>
        <SearchBar />
        {/* TODO: create stock dashboard here */}
        {/* TODO: need conditional on dashboard to display user's watchlist or default watchlist */}
        {/* TODO: create a component to display a single ticker  */}
        {/* {ticker ? <Watchlists watchlist={watchlist} /> : watchlist ? <TickerDetails ticker={ticker} /> : null} */}
      </Container>
    </Fragment>
  );
};

export default Home;

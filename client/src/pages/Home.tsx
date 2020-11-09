import React, { useEffect, Fragment } from 'react';
import { SearchBar, CustomNavbar, TickerLine } from '../components';
import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../redux/Store';

interface HomeProps {
  watchlist?: Ticker[];
}

const Home: React.FC<HomeProps> = ({ watchlist }) => {
  const history = useHistory();

  // redux
  const { ticker } = useSelector((state: RootStore) => state.stock);

  const dispatch = useDispatch();

  useEffect(() => {
    watchlist = [
      { Symbol: 'AMD', 'Company Name': 'Advance Micro Devices Inc.' },
      { Symbol: 'GOOG', 'Company Name': 'Google Inc.' },
    ];
  }, []);

  useEffect(() => {
    // TODO: this might not be needed? instead pass the ticker into the dashboard as a parameter
    // if (ticker) history.push(`/quote/${ticker}`);
  }, [ticker]);

  return (
    <Fragment>
      <CustomNavbar />
      <Container>
        <SearchBar />
        {/* TODO: create stock dashboard here */}
        <h1>test</h1>
        <TickerLine watchlist={watchlist} />
        <h1>hello</h1>
        {/* TODO: need conditional on dashboard to display user's watchlist or default watchlist */}
        {/* TODO: create a component to display a single ticker  */}
        {/* {ticker ? <Watchlists watchlist={watchlist} /> : watchlist ? <TickerDetails ticker={ticker} /> : null} */}
      </Container>
    </Fragment>
  );
};

export default Home;

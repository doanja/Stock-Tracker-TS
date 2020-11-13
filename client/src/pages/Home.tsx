import React, { useEffect, Fragment } from 'react';
import { SearchBar, CustomNavbar, TickerLine } from '../components';
import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

// redux
import { useSelector } from 'react-redux';
import { RootStore } from '../redux/Store';

const Home: React.FC = () => {
  const history = useHistory();

  // redux
  const { loginStatus } = useSelector((state: RootStore) => state.auth);
  const { watchlist, ticker, tickerPrices } = useSelector((state: RootStore) => state.stock);

  useEffect(() => {
    if (loginStatus) history.push('/watchlist');
  }, []);

  // useEffect(() => {
  //   console.log('watchlist :>> ', watchlist);
  // }, [watchlist]);

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

        {/* optional pass in watchlist,  */}
        <TickerLine tickerPrices={tickerPrices} />

        {/* TODO: need conditional on dashboard to display user's watchlist or default watchlist */}
        {/* TODO: create a component to display a single ticker  */}
        {/* {ticker ? <Watchlists watchlist={watchlist} /> : watchlist ? <TickerDetails ticker={ticker} /> : null} */}
      </Container>
    </Fragment>
  );
};

export default Home;

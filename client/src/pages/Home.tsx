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
  const { tickerPrices } = useSelector((state: RootStore) => state.stock);

  useEffect(() => {
    if (loginStatus) history.push('/watchlist');

    // TODO: else if not login, generate some sample stocks
  }, []);

  return (
    <Fragment>
      <CustomNavbar />
      <Container>
        <SearchBar />
        <TickerLine tickerPrices={tickerPrices} />

        {/* either show quote component or home component () */}
      </Container>
    </Fragment>
  );
};

export default Home;

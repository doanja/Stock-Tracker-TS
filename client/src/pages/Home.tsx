import React, { useState, useEffect, Fragment } from 'react';
import { SearchBar, NavigationBar } from '../components';
import { StockService } from '../services';
import Container from 'react-bootstrap/Container';

interface HomeProps {
  watchlist?: string[];
}

const Home: React.FC<HomeProps> = ({ watchlist }) => {
  const api = new StockService();

  // modal
  const [showModal, setShowModal] = useState(false);
  const toggleModal: ToggleModal = () => setShowModal(!showModal);

  const getTickerPrice: GetTickerPrice = ticker => {
    api
      .getTickerPrice(ticker)
      .then(res => {
        if (res.data.results.length === 0) {
          setShowModal(true);
          // dispatch(clearSearchQuery());
        } else {
          // dispatch(setRecipeIds(res.data.results.map((recipe: any) => recipe.id)));
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <Fragment>
      <NavigationBar />
      <Container>
        <SearchBar getTickerPrice={getTickerPrice} />
        {/* TODO: create stock dashboard here */}
      </Container>
    </Fragment>
  );
};

export default Home;

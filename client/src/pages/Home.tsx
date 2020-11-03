import React, { useState, useEffect, Fragment } from 'react';
import { SearchBar, NavigationBar } from '../components';
import Container from 'react-bootstrap/Container';

interface HomeProps {
  watchlist?: string[];
}

const Home: React.FC<HomeProps> = ({ watchlist }) => {
  // modal
  const [showModal, setShowModal] = useState(false);
  const toggleModal: ToggleModal = () => setShowModal(!showModal);

  return (
    <Fragment>
      <NavigationBar />
      <Container>{/* <SearchBar getRecipeId={getRecipeId} /> */}</Container>
    </Fragment>
  );
};

export default Home;

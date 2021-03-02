import React, { Fragment, useState } from 'react';
import { WatchlistSummaryChild, WatchlistModal, CustomSearchBarModal, WatchlistSummaryButtons, WatchlistSummaryEmpty } from './';
import { Container } from 'react-bootstrap';
import '../styles/main.min.css';

interface WatchlistSummaryParentProps {
  currentWatchlist: Watchlist;
  currentWatchlistPrice: WatchlistPrice;
}

const WatchlistSummaryParent: React.FC<WatchlistSummaryParentProps> = ({ currentWatchlist, currentWatchlistPrice }) => {
  // modal
  const [showModal, setShowModal] = useState(false);
  const toggleModal: ToggleModal = () => setShowModal(!showModal);

  const [showSearchModal, setShowSearchModal] = useState(false);
  const toggleSearchModal: ToggleModal = () => setShowSearchModal(!showSearchModal);

  return (
    <Container className='p-3 sub-container ticker-home-sub-wrap'>
      <WatchlistModal
        showModal={showModal}
        toggleModal={toggleModal}
        title={'Update Watchlist Name'}
        placeholder={currentWatchlistPrice.name}
        buttonText={'Update'}
        dispatchFunction={'updateWatchlistName'}
        watchlistName={currentWatchlistPrice.name}
        watchlistId={currentWatchlistPrice._id}
      />
      <CustomSearchBarModal toggleModal={toggleSearchModal} showModal={showSearchModal} watchlistId={currentWatchlistPrice._id as string} />

      <WatchlistSummaryButtons currentWatchlistPrice={currentWatchlistPrice} toggleSearchModal={toggleSearchModal} toggleModal={toggleModal} />

      {currentWatchlist && currentWatchlistPrice && currentWatchlistPrice.tickerPrices.length > 0 ? (
        <Fragment>
          {currentWatchlistPrice.tickerPrices.map((price: TickerPrice) => (
            <WatchlistSummaryChild tickerPrice={price} key={price.companyName} watchlistId={currentWatchlist._id} />
          ))}
        </Fragment>
      ) : (
        <WatchlistSummaryEmpty toggleSearchModal={toggleSearchModal} />
      )}
    </Container>
  );
};

export default WatchlistSummaryParent;

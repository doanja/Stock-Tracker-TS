import React, { Fragment, useState } from 'react';
import { WatchlistSummaryChild, WatchlistModal, CustomSearchBarModal, WatchlistSummaryButtons, WatchlistSummaryEmpty } from './';
import { Container } from 'react-bootstrap';
import '../styles/main.min.css';

interface WatchlistSummaryParentProps {
  watchlistPrices: WatchlistPrice;
}

const WatchlistSummaryParent: React.FC<WatchlistSummaryParentProps> = ({ watchlistPrices }) => {
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
        placeholder={watchlistPrices.watchlistName}
        buttonText={'Update'}
        dispatchFunction={'updateWatchlistName'}
        watchlistName={watchlistPrices.watchlistName}
        watchlistId={watchlistPrices.watchlistId}
      />
      <CustomSearchBarModal toggleModal={toggleSearchModal} showModal={showSearchModal} watchlistId={watchlistPrices.watchlistId as string} />

      <WatchlistSummaryButtons watchlistPrices={watchlistPrices} toggleSearchModal={toggleSearchModal} toggleModal={toggleModal} />

      {watchlistPrices && watchlistPrices.tickerPrices.length > 0 ? (
        <Fragment>
          {watchlistPrices.tickerPrices.map((price: TickerPrice) => (
            <WatchlistSummaryChild tickerPrice={price} key={price.symbol} watchlistId={watchlistPrices.watchlistId} />
          ))}
        </Fragment>
      ) : (
        <WatchlistSummaryEmpty toggleSearchModal={toggleSearchModal} />
      )}
    </Container>
  );
};

export default WatchlistSummaryParent;

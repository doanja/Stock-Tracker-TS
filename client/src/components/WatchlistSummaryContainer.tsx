import React, { Fragment, useState } from 'react';
import { WatchlistSummary, WatchlistModal, CustomSearchBarModal } from './';
import { Container, Dropdown } from 'react-bootstrap';
import '../styles/main.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// redux
import { useDispatch } from 'react-redux';
import { deleteWatchlist } from '../redux/actions/stockActions';

interface WatchlistSummaryContainerProps {
  watchlistPrices: WatchlistPrice;
}

const WatchlistSummaryContainer: React.FC<WatchlistSummaryContainerProps> = ({ watchlistPrices }) => {
  // redux
  const dispatch = useDispatch();

  // modal
  const [showModal, setShowModal] = useState(false);
  const toggleModal: ToggleModal = () => setShowModal(!showModal);

  const [showSearchModal, setShowSearchModal] = useState(false);
  const toggleSearchModal: ToggleModal = () => setShowSearchModal(!showSearchModal);

  return (
    // TODO: fix issue where watchlistprices initialy does not load data, have to click home button
    <Container className='p-3 sub-container ticker-home-sub-wrap'>
      {watchlistPrices && watchlistPrices.tickerPrices.length > 0 ? (
        <Fragment>
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

          <div className='position-relative'>
            <h2 className='sub-heading mb-3'>{watchlistPrices?.watchlistName}</h2>

            <div className='dropdown-buttons'>
              <Dropdown>
                <Dropdown.Toggle variant='dark' size='sm'>
                  Options
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as='button' onClick={() => toggleSearchModal()}>
                    Add Ticker
                  </Dropdown.Item>
                  <Dropdown.Item as='button' onClick={() => toggleModal()}>
                    Rename
                  </Dropdown.Item>
                  <Dropdown.Item as='button' onClick={() => dispatch(deleteWatchlist(watchlistPrices!.watchlistId))}>
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          {watchlistPrices.tickerPrices.map((price: TickerPrice) => (
            <WatchlistSummary tickerPrice={price} key={price.symbol} watchlistId={watchlistPrices.watchlistId} />
          ))}
        </Fragment>
      ) : (
        <div className='empty-watchlist'>
          <p className='font-weight-bold'>Nothing in this watchlist yet</p>
          <p> Track investments you care about here</p>
          <div className='watchlist-ticker mt-2' onClick={() => toggleSearchModal()}>
            <FontAwesomeIcon className='watchlists-icon' icon={faPlus} size='1x' />
            <p className='watchlist-ticker-text'>Add Investments</p>
          </div>
        </div>
      )}
    </Container>
  );
};

export default WatchlistSummaryContainer;

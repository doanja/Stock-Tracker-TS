import React, { Fragment, useState } from 'react';
import { WatchlistSummary, CustomSpinner, WatchlistModal } from './';
import { Container, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import '../styles/main.min.css';

// redux
import { useDispatch } from 'react-redux';
import { deleteWatchlist } from '../redux/actions/stockActions';

interface WatchlistSummaryContainerProps {
  watchlistPrices: WatchlistPrice | undefined;
}

const WatchlistSummaryContainer: React.FC<WatchlistSummaryContainerProps> = ({ watchlistPrices }) => {
  // redux
  const dispatch = useDispatch();

  // modal
  const [showModal, setShowModal] = useState(false);
  const toggleModal: ToggleModal = () => setShowModal(!showModal);

  return (
    <Container className='p-3 sub-container ticker-home-sub-wrap'>
      {watchlistPrices ? (
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

          <div className='position-relative'>
            <h2 className='sub-heading mb-3'>{watchlistPrices?.watchlistName}</h2>

            <div className='dropdown-buttons'>
              <Dropdown>
                <Dropdown.Toggle variant='dark' size='sm'>
                  Options
                </Dropdown.Toggle>
                <Dropdown.Menu className='test'>
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
        <CustomSpinner />
      )}
    </Container>
  );
};

export default WatchlistSummaryContainer;

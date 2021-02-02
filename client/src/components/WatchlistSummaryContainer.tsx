import React, { useState } from 'react';
import { WatchlistSummary, CustomSpinner, WatchlistModal } from './';
import { Container, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import '../styles/main.min.css';

// redux
import { useDispatch } from 'react-redux';
import { deleteWatchlist } from '../redux/actions/stockActions';

interface WatchlistSummaryContainerProps {
  watchlist: Watchlist | undefined;
  watchlistPrices: TickerPrice[];
  index: number;
}

const WatchlistSummaryContainer: React.FC<WatchlistSummaryContainerProps> = ({ watchlist, watchlistPrices, index }) => {
  // redux
  const dispatch = useDispatch();

  // modal
  const [showModal, setShowModal] = useState(false);
  const toggleModal: ToggleModal = () => setShowModal(!showModal);

  return (
    <Container className='p-3 sub-container ticker-home-sub-wrap'>
      <WatchlistModal
        showModal={showModal}
        toggleModal={toggleModal}
        title={'Update Watchlist Name'}
        placeholder={watchlist!.name}
        buttonText={'Update'}
        dispatchFunction={'updateWatchlistName'}
        watchlistName={watchlist!.name}
        watchlistId={watchlist!._id}
      />

      <div className='position-relative'>
        <h2 className='sub-heading mb-3'>{watchlist?.name}</h2>

        <div className='dropdown-buttons'>
          <Dropdown>
            <Dropdown.Toggle variant='dark' size='sm'>
              Options
            </Dropdown.Toggle>
            <Dropdown.Menu className='test'>
              <Dropdown.Item as='button' onClick={() => toggleModal()}>
                Rename
              </Dropdown.Item>
              <Dropdown.Item as='button' onClick={() => dispatch(deleteWatchlist(watchlist?._id))}>
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {watchlistPrices ? (
        watchlistPrices.map((price: TickerPrice) => <WatchlistSummary tickerPrice={price} key={price.symbol} index={index} />)
      ) : (
        <CustomSpinner />
      )}
    </Container>
  );
};

export default WatchlistSummaryContainer;

import React from 'react';
import { Dropdown } from 'react-bootstrap';
import '../styles/main.min.css';

// redux
import { useDispatch } from 'react-redux';
import { deleteWatchlist } from '../redux/actions/stockActions';

interface WatchlistSummaryButtonsProps {
  currentWatchlistPrice: WatchlistPrice;
  toggleSearchModal: ToggleSearchModal;
  toggleModal: ToggleModal;
}

const WatchlistSummaryButtons: React.FC<WatchlistSummaryButtonsProps> = ({ currentWatchlistPrice, toggleSearchModal, toggleModal }) => {
  // redux
  const dispatch = useDispatch();

  return (
    <div className='position-relative'>
      <h2 className='sub-heading mb-3'>{currentWatchlistPrice?.name}</h2>
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
            <Dropdown.Item as='button' onClick={() => dispatch(deleteWatchlist(currentWatchlistPrice!._id))}>
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default WatchlistSummaryButtons;

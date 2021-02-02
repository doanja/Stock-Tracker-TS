import React, { Fragment, useState } from 'react';
import { WatchlistModal } from './';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/main.min.css';

interface WatchlistTickerProps {
  watchlist: Watchlist;
  index: number;
  setCurrentWatchlist: SetCurrentWatchlist;
  setIndex: SetIndex;
  isActive: boolean;
}

const WatchlistTicker: React.FC<WatchlistTickerProps> = ({ watchlist, index, setCurrentWatchlist, setIndex, isActive }) => {
  // modal
  const [showModal, setShowModal] = useState(false);
  const toggleModal: ToggleModal = () => setShowModal(!showModal);

  return (
    <div className='position-relative'>
      <WatchlistModal
        showModal={showModal}
        toggleModal={toggleModal}
        title={'Update Watchlist Name'}
        placeholder={watchlist.name}
        buttonText={'Update'}
        dispatchFunction={'updateWatchlistName'}
        watchlistName={watchlist.name}
        watchlistId={watchlist._id}
      />

      <div
        className={isActive ? 'watchlist-ticker selected' : 'watchlist-ticker'}
        onClick={() => {
          setCurrentWatchlist(watchlist);
          setIndex(index);
        }}>
        <FontAwesomeIcon className='watchlists-icon' icon={faList} size='1x' />
        <p className='watchlist-ticker-text'>{watchlist.name}</p>
      </div>
      <FontAwesomeIcon className='pencil-icon-overlayed icon' icon={faPencilAlt} size='1x' onClick={() => toggleModal()} />
    </div>
  );
};

export default WatchlistTicker;

import React from 'react';
import '../styles/main.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface WatchlistSummaryEmptyProps {
  toggleSearchModal: ToggleSearchModal;
}

const WatchlistSummaryEmpty: React.FC<WatchlistSummaryEmptyProps> = ({ toggleSearchModal }) => {
  return (
    <div className='empty-watchlist'>
      <p className='font-weight-bold'>Nothing in this watchlist yet</p>
      <p> Track investments you care about here</p>
      <div className='watchlist-ticker mt-2' onClick={() => toggleSearchModal()}>
        <FontAwesomeIcon className='watchlists-icon' icon={faPlus} size='1x' />
        <p className='watchlist-ticker-text'>Add Investments</p>
      </div>
    </div>
  );
};

export default WatchlistSummaryEmpty;

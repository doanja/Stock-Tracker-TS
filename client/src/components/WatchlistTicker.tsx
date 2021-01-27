import React from 'react';
import '../styles/main.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

interface WatchlistTickerProps {
  watchlist: Watchlist;
}

const WatchlistTicker: React.FC<WatchlistTickerProps> = ({ watchlist }) => {
  return (
    <div className='watchlist-ticker' onClick={() => console.log('set current watchlist in watchlist container')}>
      <FontAwesomeIcon className='watchlist-icon' icon={faList} size='1x' />
      <p className='watchlist-ticker-text'>{watchlist.name}</p>
    </div>
  );
};

export default WatchlistTicker;

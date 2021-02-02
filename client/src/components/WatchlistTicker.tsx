import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import '../styles/main.min.css';

interface WatchlistTickerProps {
  watchlist: Watchlist;
  index: number;
  setCurrentWatchlist: SetCurrentWatchlist;
  setIndex: SetIndex;
  isActive: boolean;
}

const WatchlistTicker: React.FC<WatchlistTickerProps> = ({ watchlist, index, setCurrentWatchlist, setIndex, isActive }) => {
  return (
    <div className='position-relative'>
      <div
        className={isActive ? 'watchlist-ticker selected' : 'watchlist-ticker'}
        onClick={() => {
          setCurrentWatchlist(watchlist);
          setIndex(index);
        }}>
        <FontAwesomeIcon className='watchlists-icon' icon={faList} size='1x' />
        <p className='watchlist-ticker-text'>{watchlist.name}</p>
      </div>
    </div>
  );
};

export default WatchlistTicker;

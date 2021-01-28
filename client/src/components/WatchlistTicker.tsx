import React from 'react';
import '../styles/main.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

interface WatchlistTickerProps {
  watchlist: Watchlist;
  index: number;
  setCurrentWatchlist: SetCurrentWatchlist;
  setIndex: SetIndex;
}

const WatchlistTicker: React.FC<WatchlistTickerProps> = ({ watchlist, index, setCurrentWatchlist, setIndex }) => {
  return (
    <div
      className='watchlist-ticker'
      onClick={() => {
        setCurrentWatchlist(watchlist);
        setIndex(index);
      }}>
      <FontAwesomeIcon className='watchlist-icon' icon={faList} size='1x' />
      <p className='watchlist-ticker-text'>{watchlist.name}</p>
    </div>
  );
};

export default WatchlistTicker;

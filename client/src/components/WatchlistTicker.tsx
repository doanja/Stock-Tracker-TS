import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import '../styles/main.min.css';

interface WatchlistTickerProps {
  watchlistPrice: WatchlistPrice;
  currentWatchlistId: string;
  setCurrentWatchlist: SetCurrentWatchlist;
}

const WatchlistTicker: React.FC<WatchlistTickerProps> = ({ watchlistPrice, currentWatchlistId, setCurrentWatchlist }) => {
  return (
    <div className='position-relative'>
      <div
        className={currentWatchlistId === watchlistPrice.watchlistId ? 'watchlist-ticker selected' : 'watchlist-ticker'}
        onClick={() => setCurrentWatchlist(watchlistPrice)}>
        <FontAwesomeIcon className='watchlists-icon' icon={faList} size='1x' />
        <p className='watchlist-ticker-text'>{watchlistPrice.watchlistName}</p>
      </div>
    </div>
  );
};

export default WatchlistTicker;

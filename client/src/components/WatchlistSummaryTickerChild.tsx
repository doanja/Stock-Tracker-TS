import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import '../styles/main.min.css';

interface WatchlistSummaryTickerChildProps {
  watchlistPrice: WatchlistPrice;
  currentWatchlistId: string | undefined;
  setCurrentWatchlist: SetCurrentWatchlist;
}

const WatchlistSummaryTickerChild: React.FC<WatchlistSummaryTickerChildProps> = ({ watchlistPrice, currentWatchlistId, setCurrentWatchlist }) => {
  return (
    <div className='position-relative'>
      <div
        className={currentWatchlistId === watchlistPrice._id ? 'watchlist-ticker selected' : 'watchlist-ticker'}
        onClick={() => setCurrentWatchlist(watchlistPrice)}>
        <FontAwesomeIcon className='watchlists-icon' icon={faList} size='1x' />
        <p className='watchlist-ticker-text'>{watchlistPrice.name}</p>
      </div>
    </div>
  );
};

export default WatchlistSummaryTickerChild;
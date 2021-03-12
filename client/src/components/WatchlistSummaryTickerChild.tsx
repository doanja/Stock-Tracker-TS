import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import '../styles/main.min.css';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../redux/Store';
import { setCurrentWatchlist } from '../redux/actions/stockActions';

interface WatchlistSummaryTickerChildProps {
  watchlist: Watchlist;
}

const WatchlistSummaryTickerChild: React.FC<WatchlistSummaryTickerChildProps> = ({ watchlist }) => {
  // redux
  const { currentWatchlist } = useSelector((state: RootStore) => state.stock);
  const dispatch = useDispatch();

  return (
    <div className='position-relative'>
      <div
        className={currentWatchlist?._id === watchlist._id ? 'watchlist-ticker selected' : 'watchlist-ticker'}
        onClick={() => dispatch(setCurrentWatchlist(watchlist))}>
        <FontAwesomeIcon className='watchlists-icon' icon={faList} size='1x' />
        <p className='watchlist-ticker-text'>{watchlist.name}</p>
      </div>
    </div>
  );
};

export default WatchlistSummaryTickerChild;

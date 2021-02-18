import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../redux/Store';
import { addToWatchlist, removeFromWatchlist } from '../redux/actions/stockActions';

interface TickerSaveButtonProps {
  ticker: string;
}

const TickerSaveButton: React.FC<TickerSaveButtonProps> = ({ ticker }) => {
  const history = useHistory();
  const [isWatching, setIsWatching] = useState(false);

  // redux
  const { loginStatus } = useSelector((state: RootStore) => state.auth);
  const { watchlists } = useSelector((state: RootStore) => state.stock);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginStatus && watchlists) watchlists[0].watchlist.includes(ticker) ? setIsWatching(true) : setIsWatching(false);
  }, [watchlists, ticker, loginStatus]);

  const saveTicker = (saveTicker: boolean): void => {
    if (loginStatus && watchlists) {
      if (saveTicker) {
        dispatch(addToWatchlist(watchlists[0]._id, ticker));
        setIsWatching(true);
      } else {
        dispatch(removeFromWatchlist(watchlists[0]._id, ticker));
        setIsWatching(false);
      }
    } else history.push('/login');
  };

  return (
    <div className='my-3 float-right'>
      {isWatching ? (
        <Button variant='danger' onClick={() => saveTicker(false)}>
          Unfollow
        </Button>
      ) : (
        <Button variant='dark' onClick={() => saveTicker(true)}>
          Follow
        </Button>
      )}
    </div>
  );
};
export default TickerSaveButton;

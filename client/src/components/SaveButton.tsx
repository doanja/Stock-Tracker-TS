import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../redux/Store';
import { addToWatchlist, removeFromWatchlist } from '../redux/actions/stockActions';

interface SaveIconProps {
  ticker: string;
}

const SaveIcon: React.FC<SaveIconProps> = ({ ticker }) => {
  const history = useHistory();
  const [isWatching, setIsWatching] = useState(false);

  // redux
  const { loginStatus } = useSelector((state: RootStore) => state.auth);
  const { watchlist } = useSelector((state: RootStore) => state.stock);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginStatus) watchlist.includes(ticker) ? setIsWatching(true) : setIsWatching(false);
  }, [watchlist, ticker]);

  const saveTicker = () => {
    if (loginStatus) {
      isWatching ? dispatch(removeFromWatchlist(ticker)) : dispatch(addToWatchlist(ticker));
    } else history.push('/login');
  };

  return (
    <div className='mb-3 float-right'>
      {isWatching ? (
        <Button variant='dark' onClick={saveTicker}>
          Unfollow
        </Button>
      ) : (
        <Button variant='dark' onClick={saveTicker}>
          Follow
        </Button>
      )}
    </div>
  );
};
export default SaveIcon;

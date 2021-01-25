import React, { useState } from 'react';
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
  const { watchlists } = useSelector((state: RootStore) => state.stock);
  const dispatch = useDispatch();

  const unsaveTicker = (): void => {
    if (loginStatus && watchlists) {
      dispatch(removeFromWatchlist(watchlists[0]._id, ticker));
      setIsWatching(false);
    } else history.push('/login');
  };
  const saveTicker = (): void => {
    if (loginStatus && watchlists) {
      dispatch(addToWatchlist(watchlists[0]._id, ticker));
      setIsWatching(true);
    } else history.push('/login');
  };

  return (
    <div className='mb-3 float-right'>
      {isWatching ? (
        <Button variant='danger' onClick={unsaveTicker}>
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

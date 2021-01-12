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

// TODO: make button blue with checkmark if its being followed

const SaveIcon: React.FC<SaveIconProps> = ({ ticker }) => {
  const history = useHistory();
  const [isWatching, setIsWatching] = useState(false);

  // redux
  const { loginStatus } = useSelector((state: RootStore) => state.auth);
  const { watchlists } = useSelector((state: RootStore) => state.stock);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginStatus) {
      // watchlists[0].watchlist.includes(ticker) ? setIsWatching(true) : setIsWatching(false);
      console.log('watchlists', watchlists);
    }
  }, [watchlists, ticker]);

  const saveTicker = () => {
    if (loginStatus) {
      isWatching ? dispatch(removeFromWatchlist(watchlists[0]._id, ticker)) : dispatch(addToWatchlist(watchlists[0]._id, ticker));
    } else history.push('/login');
  };

  return (
    <div className='mb-3 float-right'>
      {isWatching ? (
        <Button variant='danger' onClick={saveTicker}>
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

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faStar } from '@fortawesome/free-solid-svg-icons';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../redux/Store';
import { addToWatchlist, removeFromWatchlist } from '../redux/actions/stockActions';

interface SaveIconProps {
  ticker: string;
}

const SaveIcon: React.FC<SaveIconProps> = ({ ticker }) => {
  const history = useHistory();

  // redux
  const { loginStatus } = useSelector((state: RootStore) => state.auth);
  const { watchlist } = useSelector((state: RootStore) => state.stock);
  const dispatch = useDispatch();

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (watchlist.includes(ticker)) setIsSaved(true);
  }, [watchlist]);

  const saveTicker = () => {
    if (loginStatus) {
      isSaved ? dispatch(removeFromWatchlist(ticker)) : dispatch(addToWatchlist(ticker));
    } else history.push('/');
  };

  return (
    <div style={{ zIndex: 10 }}>
      {isSaved ? (
        <FontAwesomeIcon className='icon-favorite' icon={faTrash} onClick={saveTicker} />
      ) : (
        <FontAwesomeIcon className='icon-favorite' icon={faStar} onClick={saveTicker} />
      )}
    </div>
  );
};
export default SaveIcon;

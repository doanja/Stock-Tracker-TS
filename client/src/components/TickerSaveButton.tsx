import React, { useState } from 'react';
import { TickerSaveButtonModal } from './';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

// redux
import { useSelector } from 'react-redux';
import { RootStore } from '../redux/Store';

interface TickerSaveButtonProps {
  ticker: string;
}

const TickerSaveButton: React.FC<TickerSaveButtonProps> = ({ ticker }) => {
  const history = useHistory();

  // modal
  const [showModal, setShowModal] = useState(false);
  const toggleModal: ToggleModal = () => {
    if (loginStatus) {
      setShowModal(!showModal);
    } else history.push('/login');
  };

  // redux
  const { loginStatus } = useSelector((state: RootStore) => state.auth);

  return (
    <div className='mt-3 float-right'>
      <TickerSaveButtonModal toggleModal={toggleModal} showModal={showModal} tickerSymbol={ticker} />
      <Button variant='light' onClick={() => toggleModal()}>
        Add to Watchlist
      </Button>
    </div>
  );
};
export default TickerSaveButton;

import React, { useState, useEffect } from 'react';
import { Modal, Form, InputGroup, Button } from 'react-bootstrap';

// redux
import { useDispatch } from 'react-redux';
import { createWatchlist, updateWatchlistName } from '../redux/actions/stockActions';

interface WatchlistModalProps {
  toggleModal: ToggleModal;
  showModal: boolean;
  title: string;
  placeholder: string | undefined;
  buttonText: string;
  dispatchFunction: string;
  watchlistId?: string;
  watchlistName?: string;
}

const WatchlistModal: React.FC<WatchlistModalProps> = ({
  toggleModal,
  showModal,
  title,
  placeholder,
  buttonText,
  dispatchFunction,
  watchlistId,
  watchlistName,
}) => {
  const [input, setInput] = useState('');

  // redux
  const dispatch = useDispatch();

  useEffect(() => {
    if (watchlistId && watchlistName) {
      setInput(watchlistName);
    }
  }, [watchlistId, watchlistName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    dispatchFunction === 'createWatchlist' ? dispatch(createWatchlist(input)) : dispatch(updateWatchlistName(watchlistId, input));
    closeModal();
  };

  const closeModal = () => {
    if (watchlistId && watchlistName) {
      setInput(watchlistName);
      placeholder = watchlistName;
    } else setInput('');
    toggleModal();
  };

  return (
    <Modal show={showModal} onHide={closeModal} backdrop={true} animation={true}>
      <Modal.Body>
        <Modal.Title>
          <Form.Label>{title}</Form.Label>
        </Modal.Title>

        <Form onSubmit={handleSubmit}>
          <InputGroup className='mt-3'>
            <Form.Control
              type='text'
              placeholder={placeholder}
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
          </InputGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='dark' type='submit' onClick={handleSubmit}>
          {buttonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WatchlistModal;

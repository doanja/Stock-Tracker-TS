import React, { useState, useEffect } from 'react';
import { SearchBarDropdown } from './';
import { Modal, Form, InputGroup, Button } from 'react-bootstrap';

// redux
import { useDispatch } from 'react-redux';
import { addToWatchlist } from '../redux/actions/stockActions';

interface ModalProps {
  toggleModal: ToggleModal;
  showModal: boolean;
  watchlistId?: string;
}

const CustomSearchBarModal: React.FC<ModalProps> = ({ toggleModal, showModal, watchlistId }) => {
  const [input, setInput] = useState('');

  // redux
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log('searched');
    // dispatch(addToWatchlist('something'));
    // closeModal();
  };

  const closeModal = () => {
    setInput('');
    toggleModal();
  };

  return (
    <Modal show={showModal} onHide={closeModal} backdrop={true} animation={true}>
      <Modal.Body>
        <Modal.Title>
          <Form.Label>Search</Form.Label>
        </Modal.Title>

        <Form onSubmit={handleSubmit}>
          <InputGroup className='mt-3'>
            <Form.Control
              type='text'
              placeholder={'Search for stocks, ETFs and more'}
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
          </InputGroup>
          <SearchBarDropdown searchTerm={input} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='dark' type='submit' onClick={handleSubmit}>
          Search
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomSearchBarModal;

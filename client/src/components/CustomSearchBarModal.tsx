import React, { useState } from 'react';
import { SearchResults } from './';
import { Modal, Form, InputGroup, Button } from 'react-bootstrap';

interface ModalProps {
  toggleModal: ToggleModal;
  showModal: boolean;
  watchlistId: string;
  watchlistPrices: WatchlistPrice;
}

const CustomSearchBarModal: React.FC<ModalProps> = ({ toggleModal, showModal, watchlistId, watchlistPrices }) => {
  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setSearchTerm(input);
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
          <SearchResults searchTerm={searchTerm} watchlistId={watchlistId} watchlistPrices={watchlistPrices} />
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

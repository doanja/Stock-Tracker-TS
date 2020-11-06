import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { validateTicker } from '../helper';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../redux/Store';
import { setSearchQuery, clearSearchQuery, setTicker, clearTicker } from '../redux/actions/stockActions';
import { toggleModal } from '../redux/actions/modalActions';

const SearchBar: React.FC = () => {
  const [input, setInput] = useState('');

  // redux
  const { searchQuery } = useSelector((state: RootStore) => state.stock);
  const { showModal } = useSelector((state: RootStore) => state.modal);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    searchTicker(input);
    setInput('');
  };

  const searchTicker = (input: string) => {
    dispatch(setSearchQuery(input));
    dispatch(clearTicker());

    // if ticker is invalid
    if (!validateTicker(input)) {
      dispatch(toggleModal(!showModal, `No results found for '${searchQuery}'.`, `Error searching for ${searchQuery}`));
      dispatch(clearSearchQuery());
    }

    // otherwise dispatch action to set ticker
    else dispatch(setTicker(input));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className='mt-3'>
        <Form.Control
          type='text'
          placeholder='Search for stocks, ETFs and more'
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
        <InputGroup.Append>
          <Button variant='dark' type='submit' onClick={handleSubmit}>
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;

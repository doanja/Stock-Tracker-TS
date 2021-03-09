import React, { useState } from 'react';
import { SearchBarDropdown } from './';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { validateTicker } from '../helper';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../redux/Store';
import { setTicker, clearTicker } from '../redux/actions/stockActions';
import { toggleModal } from '../redux/actions/modalActions';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  // redux

  const { showModal } = useSelector((state: RootStore) => state.modal);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    searchTicker(searchTerm);
  };

  const searchTicker = (input: string) => {
    dispatch(clearTicker());
    const ticker = validateTicker(input);

    ticker
      ? dispatch(setTicker(ticker.Symbol))
      : dispatch(toggleModal(!showModal, `No results found for '${searchTerm}'.`, `Error searching for ${searchTerm}`));

    setSearchTerm('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className='mt-3'>
        <Form.Control
          type='text'
          placeholder='Search for stocks, ETFs and more'
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
        <InputGroup.Append>
          <Button variant='outline-light' type='submit' onClick={handleSubmit}>
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
      <SearchBarDropdown searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </Form>
  );
};

export default SearchBar;

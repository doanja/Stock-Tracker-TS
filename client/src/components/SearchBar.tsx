import React, { Fragment, useState, useEffect } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { validateTicker } from '../helper';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../redux/Store';
import { setSearchQuery, clearSearchQuery, setTicker, clearTicker } from '../redux/actions/stockActions';
import { toggleModal } from '../redux/actions/modalActions';

import tickers from '../tickers.json';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Ticker[] | undefined>([]);

  // redux
  const { searchQuery } = useSelector((state: RootStore) => state.stock);
  const { showModal } = useSelector((state: RootStore) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchTerm === '') {
      setSearchResults([]);
    } else if (searchTerm) {
      let results: Ticker[] | undefined = tickers.filter((ticker: Ticker) => ticker['Company Name'].toLowerCase().includes(searchTerm));

      // if symbol not found, search by company name
      if (results.length === 0) results = tickers.filter((ticker: Ticker) => ticker.Symbol.toLowerCase().includes(searchTerm));

      setSearchResults(results.slice(0, 5));
    }
  }, [searchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    searchTicker(searchTerm);
    setSearchTerm('');
  };

  const searchTicker = (input: string) => {
    dispatch(setSearchQuery(input));
    dispatch(clearTicker());

    // if ticker is invalid
    const ticker = validateTicker(input);
    if (!ticker) {
      dispatch(toggleModal(!showModal, `No results found for '${searchQuery}'.`, `Error searching for ${searchQuery}`));
      dispatch(clearSearchQuery());
    }

    // otherwise dispatch action to set ticker
    else dispatch(setTicker(ticker.Symbol));
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
          <Button variant='dark' type='submit' onClick={handleSubmit}>
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
      <div className='search-dropdown-parent test'>
        {searchResults ? (
          <Fragment>
            {searchResults.map((ticker: Ticker) => (
              <div className='search-dropdown-item' key={ticker.Symbol}>
                <div>
                  <div className='search-dropdown-item-company-name'>{ticker['Company Name']}</div>
                  <div className='search-dropdown-item-company-symbol'>{ticker.Symbol}</div>
                </div>

                <div className='search-dropdown-item-price-wrap'>
                  <div className='search-dropdown-item-price'>$1.00</div>

                  <div className='search-dropdown-item-percent'>2.00%</div>
                </div>
              </div>
            ))}
          </Fragment>
        ) : null}
      </div>
    </Form>
  );
};

export default SearchBar;

import React, { Fragment, useState, useEffect } from 'react';

import tickers from '../tickers.json';

interface SearchBarDropdownProps {
  searchTerm: string;
}

const SearchBarDropdown: React.FC<SearchBarDropdownProps> = ({ searchTerm }) => {
  const [searchResults, setSearchResults] = useState<Ticker[] | undefined>([]);

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

  return (
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
  );
};
export default SearchBarDropdown;

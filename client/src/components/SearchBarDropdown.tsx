import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getTickerName } from '../helper';
import { StockService } from '../services';
import { CustomSpinner } from './';
import tickers from '../tickers.json';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../redux/Store';
import { addToWatchlist, removeFromWatchlist } from '../redux/actions/stockActions';

interface SearchBarDropdownProps {
  searchTerm: string;
  quickAddMode?: boolean;
}

const SearchBarDropdown: React.FC<SearchBarDropdownProps> = ({ searchTerm, quickAddMode }) => {
  const [searchResults, setSearchResults] = useState<Ticker[] | undefined>([]);
  const [tickerPrices, setTickerPrices] = useState<TickerPrice[]>([]);

  const history = useHistory();
  const [isWatching, setIsWatching] = useState(false);

  // redux
  const { watchlists } = useSelector((state: RootStore) => state.stock);
  const { loginStatus } = useSelector((state: RootStore) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginStatus && watchlists) {
      watchlists[0].watchlist.includes(searchResults.symbol) ? setIsWatching(true) : setIsWatching(false);
    }
  }, [watchlists, searchResults]);

  const saveTicker = (saveTicker: boolean, ticker: string): void => {
    if (loginStatus && watchlists) {
      if (saveTicker) {
        dispatch(addToWatchlist(watchlists[0]._id, ticker));
        setIsWatching(true);
      } else {
        dispatch(removeFromWatchlist(watchlists[0]._id, ticker));
        setIsWatching(false);
      }
    } else history.push('/login');
  };

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

  useEffect(() => {
    if (searchResults) {
      const stockAPI = new StockService();

      const watchlist: string[] = searchResults.map((ticker: Ticker) => ticker.Symbol);

      const loadPrices = async () => Promise.all(watchlist.map(ticker => stockAPI.getTickerPrices()));

      const tickerPrices: TickerPrice[] = [];

      loadPrices().then(promise => {
        for (let i = 0; i < promise.length; i++) {
          tickerPrices.push({ symbol: watchlist[i], companyName: getTickerName(watchlist[i]), prices: promise[i].data.prices });
        }
        setTickerPrices(tickerPrices);
      });
    } else {
      setTickerPrices([]);
    }
  }, [searchResults]);

  return (
    <div className='search-dropdown-parent test'>
      {searchResults ? (
        <Fragment>
          {tickerPrices.map((ticker: TickerPrice) => (
            <div className='search-dropdown-item' key={ticker.symbol}>
              <div>
                <div className='search-dropdown-item-company-name'>{ticker.companyName}</div>
                <div className='search-dropdown-item-company-symbol'>{ticker.symbol}</div>
              </div>

              {ticker.prices[0].priceChange > 0 ? (
                <Fragment>
                  <div className='search-dropdown-item-price-wrap'>
                    <div className='search-dropdown-item-price'>${ticker.prices[0].price}</div>

                    <div className='search-dropdown-item-percent discover-green'>{ticker.prices[0].changePercent}%</div>
                  </div>
                  {quickAddMode ? <p>hi</p> : null}
                </Fragment>
              ) : (
                <Fragment>
                  <div className='search-dropdown-item-price-wrap'>
                    <div className='search-dropdown-item-price'>${ticker.prices[0].price}</div>

                    <div className='search-dropdown-item-percent discover-red'>{ticker.prices[0].changePercent}%</div>
                  </div>
                </Fragment>
              )}
            </div>
          ))}
        </Fragment>
      ) : (
        <CustomSpinner />
      )}
    </div>
  );
};
export default SearchBarDropdown;

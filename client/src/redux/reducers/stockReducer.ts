import { StockState, StockActionTypes } from '../types/stockTypes';
import { Reducer } from 'redux';

const initialState: StockState = {
  tickerPriceChange: { price: 0, percent: 0 },
  tickerPrice: null,
  tickerPrices: [],
  searchQuery: '',
  ticker: null,
  watchlists: [],
  error: undefined,
  token: '',
  isLoading: false,
};

const stockReducer: Reducer<StockState> = (state = initialState, action) => {
  switch (action.type) {
    case StockActionTypes.SET_TICKER_PRICE_CHANGE:
      return { ...state, tickerPriceChange: action.payload };
    case StockActionTypes.SET_TICKER_PRICE:
      return { ...state, tickerPrice: action.payload };
    case StockActionTypes.SET_TICKER_PRICES:
      return { ...state, tickerPrices: action.payload };
    case StockActionTypes.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    case StockActionTypes.CLEAR_SEARCH_QUERY:
      return { ...state, searchQuery: '' };
    case StockActionTypes.SET_TICKER:
      return { ...state, ticker: action.payload };
    case StockActionTypes.CLEAR_TICKER:
      return { ...state, ticker: null };
    case StockActionTypes.GET_WATCHLISTS:
      return { ...state, error: state.error, isLoading: false, watchlists: action.payload, token: action.token };
    case StockActionTypes.ADD_TICKER:
      return { ...state, error: state.error, isLoading: false, watchlists: action.payload, token: action.token };
    case StockActionTypes.REMOVE_TICKER:
      return { ...state, error: state.error, isLoading: false, watchlists: action.payload, token: action.token };
    case StockActionTypes.REQUEST_FAILED:
      return { ...state, error: action.error };
    case StockActionTypes.SET_IS_LOADING:
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

export default stockReducer;

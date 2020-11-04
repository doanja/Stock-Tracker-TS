import { StockState, StockActionTypes } from '../types/stockTypes';
import { Reducer } from 'redux';

const initialState: StockState = {
  // tickerPrices: [],
  searchQuery: '',
  ticker: null,

  watchlist: [],
  error: undefined,
  token: '',
  isLoading: false,
};

const stockReducer: Reducer<StockState> = (state = initialState, action) => {
  switch (action.type) {
    // case StockActionTypes.GET_TICKER:
    //   // TODO: check this case
    //   return { ...state, error: state.error, isLoading: false, tickerPrices: [...action.payload], token: action.token };
    case StockActionTypes.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    case StockActionTypes.CLEAR_SEARCH_QUERY:
      return { ...state, searchQuery: '' };
    case StockActionTypes.SET_TICKER:
      return { ...state, ticker: action.payload };
    case StockActionTypes.CLEAR_TICKER:
      return { ...state, ticker: null };

    case StockActionTypes.GET_WATCHLIST:
      return { ...state, error: state.error, isLoading: false, watchlist: action.payload, token: action.token };
    case StockActionTypes.ADD_TICKER:
      return { ...state, error: state.error, isLoading: false, watchlist: action.payload, token: action.token };
    case StockActionTypes.REMOVE_TICKER:
      return { ...state, error: state.error, isLoading: false, watchlist: action.payload, token: action.token };
    case StockActionTypes.REQUEST_FAILED:
      return { ...state, error: action.error };
    case StockActionTypes.SET_IS_LOADING:
      return { ...state, isLoading: true };

    default:
      return state;
  }
};

export default stockReducer;

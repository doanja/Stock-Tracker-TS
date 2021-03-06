import { StockState, StockActionTypes } from '../types/stockTypes';
import { Reducer } from 'redux';

const initialState: StockState = {
  currentTickerPriceChange: { price: 0, percent: 0 },
  currentTickerPrice: null,
  watchlistPrices: [],
  currentTicker: null,
  watchlists: [],
  error: undefined,
  token: '',
  isLoading: false,
  currentWatchlist: null,
  currentWatchlistPrice: null,
};

const stockReducer: Reducer<StockState> = (state = initialState, action) => {
  switch (action.type) {
    case StockActionTypes.SET_CURRENT_TICKER_PRICE_CHANGE:
      return { ...state, currentTickerPriceChange: action.payload };
    case StockActionTypes.SET_CURRENT_TICKER_PRICE:
      return { ...state, currentTickerPrice: action.payload };
    case StockActionTypes.SET_WATCHLIST_PRICES:
      return { ...state, watchlistPrices: [...action.payload] };
    case StockActionTypes.SET_TICKER:
      return { ...state, currentTicker: action.payload };
    case StockActionTypes.CLEAR_TICKER:
      return { ...state, currentTicker: null };
    case StockActionTypes.GET_WATCHLISTS:
      return { ...state, error: state.error, isLoading: false, watchlists: [...action.payload], token: action.token };
    case StockActionTypes.CREATE_WATCHLIST:
      return {
        ...state,
        error: state.error,
        isLoading: false,
        watchlists: [...action.payload],
        token: action.token,
        currentWatchlist: action.newWatchlist,
      };
    case StockActionTypes.UPDATE_WATCHLIST_NAME:
      return { ...state, error: state.error, isLoading: false, watchlists: [...action.payload], token: action.token };
    case StockActionTypes.ADD_TICKER:
      return { ...state, error: state.error, isLoading: false, watchlists: [...action.payload], token: action.token, newSymbol: action.newSymbol };
    case StockActionTypes.REMOVE_TICKER:
      return { ...state, error: state.error, isLoading: false, watchlists: [...action.payload], token: action.token, newSymbol: action.newSymbol };
    case StockActionTypes.DELETE_WATCHLIST:
      return { ...state, error: state.error, isLoading: false, watchlists: [...action.payload], token: action.token };
    case StockActionTypes.REQUEST_FAILED:
      return { ...state, error: action.error };
    case StockActionTypes.SET_IS_LOADING:
      return { ...state, isLoading: true };

    case StockActionTypes.SET_CURRENT_WATCHLIST:
      return { ...state, currentWatchlist: action.payload };

    case StockActionTypes.CLEAR_CURRENT_WATCHLIST:
      return { ...state, currentWatchlist: null };

    case StockActionTypes.SET_CURRENT_WATCHLIST_PRICE:
      return { ...state, currentWatchlistPrice: action.payload };

    default:
      return state;
  }
};

export default stockReducer;

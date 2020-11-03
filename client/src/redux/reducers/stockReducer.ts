import { StockState, StockActionTypes } from '../types/stockTypes';
import { Reducer } from 'redux';

const initialState: StockState = {
  watchlist: [],
  error: undefined,
  token: '',
  isLoading: false,
};

const stockReducer: Reducer<StockState> = (state = initialState, action) => {
  switch (action.type) {
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

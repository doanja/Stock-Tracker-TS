import { StockActionTypes, StockState } from '../types/stockTypes';
import { ActionCreator, Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StockService } from '../../services';
import { AxiosResponse } from 'axios';
import { roundDecimals } from '../../helper';

const api = new StockService();

export type AppThunk = ActionCreator<ThunkAction<void, StockState, null, Action<string>>>;

export const setCurrentTickerPriceChange = (nums: { first: number; last: number }) => {
  const priceDiff = roundDecimals(nums.last - nums.first);
  const percentDiff = roundDecimals(nums.last / nums.first);
  return { type: StockActionTypes.SET_CURRENT_TICKER_PRICE_CHANGE, payload: { price: priceDiff, percent: percentDiff } };
};

export const setCurrentTickerPrice = (tickerPrice: TickerPrice) => {
  return { type: StockActionTypes.SET_CURRENT_TICKER_PRICE, payload: tickerPrice };
};

export const setWatchlistPrices = (watchlistPrices: WatchlistPrice[]) => {
  console.log('setWatchlistPrices action dispatched');
  return { type: StockActionTypes.SET_WATCHLIST_PRICES, payload: watchlistPrices };
};

export const setIsLoading = () => {
  return { type: StockActionTypes.SET_IS_LOADING };
};

export const setSearchQuery = (searchQuery: string) => {
  return { type: StockActionTypes.SET_SEARCH_QUERY, payload: searchQuery };
};

export const clearSearchQuery = () => {
  return { type: StockActionTypes.CLEAR_SEARCH_QUERY };
};

export const setTicker = (ticker: string) => {
  return { type: StockActionTypes.SET_TICKER, payload: ticker };
};

export const clearTicker = () => {
  return { type: StockActionTypes.CLEAR_TICKER };
};

export const getWatchlists: AppThunk = () => {
  return async (dispatch: Dispatch) => {
    dispatch(setIsLoading());
    try {
      const req: AxiosResponse<any> = await api.getWatchlists();
      const watchlist: Watchlist[] = req.data.watchlists;

      console.log('watchlist', watchlist);

      return dispatch({
        type: StockActionTypes.GET_WATCHLISTS,
        payload: watchlist,
        token: req.headers.authorization,
      });
    } catch (error) {
      return dispatch({
        type: StockActionTypes.REQUEST_FAILED,
        error: error.response.data.name,
      });
    }
  };
};

export const createWatchlist: AppThunk = (name: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(setIsLoading());
    try {
      const req: AxiosResponse<any> = await api.createWatchlist(name);
      const watchlist: Watchlist[] = req.data.watchlists;

      return dispatch({
        type: StockActionTypes.CREATE_WATCHLIST,
        payload: watchlist,
        token: req.headers.authorization,
      });
    } catch (error) {
      return dispatch({
        type: StockActionTypes.REQUEST_FAILED,
        error: error.response.data.name,
      });
    }
  };
};

export const updateWatchlistName: ActionCreator<ThunkAction<void, StockState, Watchlist, Action<string>>> = (watchlistId: string, name: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const req: AxiosResponse<any> = await api.updateWatchlistName(watchlistId, name);
      const watchlist: Watchlist[] = req.data.watchlists;

      return dispatch({
        type: StockActionTypes.UPDATE_WATCHLIST_NAME,
        payload: watchlist,
        token: req.headers.authorization,
      });
    } catch (error) {
      return dispatch({
        type: StockActionTypes.REQUEST_FAILED,
        error: error.response.data.name,
      });
    }
  };
};

export const addToWatchlist: ActionCreator<ThunkAction<void, StockState, Watchlist, Action<string>>> = (watchlistId: string, ticker: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const req: AxiosResponse<any> = await api.addToWatchlist(watchlistId, ticker);
      const watchlist: Watchlist[] = req.data.watchlists;
      console.log('added');
      return dispatch({
        type: StockActionTypes.ADD_TICKER,
        payload: watchlist,
        token: req.headers.authorization,
      });
    } catch (error) {
      return dispatch({
        type: StockActionTypes.REQUEST_FAILED,
        error: error.response.data.name,
      });
    }
  };
};

export const removeFromWatchlist: ActionCreator<ThunkAction<void, StockState, Watchlist, Action<string>>> = (watchlistId: string, ticker: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const req: AxiosResponse<any> = await api.removeFromWatchlist(watchlistId, ticker);
      const watchlist: Watchlist[] = req.data.watchlists;
      console.log('removed');
      return dispatch({
        type: StockActionTypes.REMOVE_TICKER,
        payload: watchlist,
        token: req.headers.authorization,
      });
    } catch (error) {
      return dispatch({
        type: StockActionTypes.REQUEST_FAILED,
        error: error.response.data.name,
      });
    }
  };
};

export const deleteWatchlist: ActionCreator<ThunkAction<void, StockState, Watchlist, Action<string>>> = (watchlistId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const req: AxiosResponse<any> = await api.deleteWatchlist(watchlistId);
      const watchlist: Watchlist[] = req.data.watchlists;

      return dispatch({
        type: StockActionTypes.DELETE_WATCHLIST,
        payload: watchlist,
        token: req.headers.authorization,
      });
    } catch (error) {
      return dispatch({
        type: StockActionTypes.REQUEST_FAILED,
        error: error.response.data.name,
      });
    }
  };
};

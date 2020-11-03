import { StockActionTypes, StockState, Watchlist } from '../types/stockTypes';
import { ActionCreator, Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StockService } from '../../services';
import { AxiosResponse } from 'axios';

const api = new StockService();

export type AppThunk = ActionCreator<ThunkAction<void, StockState, null, Action<string>>>;

export const setIsLoading = () => {
  return { type: StockActionTypes.SET_IS_LOADING };
};

export const getTickerPrices: AppThunk = () => {
  return async (dispatch: Dispatch) => {
    dispatch(setIsLoading());
    try {
      const req: AxiosResponse<any> = await api.getTickerPrices();
      const prices: string[] = req.data.prices;

      return dispatch({
        type: StockActionTypes.GET_WATCHLIST,
        payload: prices,
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

export const getWatchlist: AppThunk = () => {
  return async (dispatch: Dispatch) => {
    dispatch(setIsLoading());
    try {
      const req: AxiosResponse<any> = await api.getWatchlist();
      const watchlist: string[] = req.data.watchlist;

      return dispatch({
        type: StockActionTypes.GET_WATCHLIST,
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

export const addToWatchlist: ActionCreator<ThunkAction<void, StockState, Watchlist, Action<string>>> = (ticker: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const req: AxiosResponse<any> = await api.addToWatchlist(ticker);
      const watchlist: string[] = req.data.watchlist;

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

export const removeFromWatchlist: ActionCreator<ThunkAction<void, StockState, Watchlist, Action<string>>> = (ticker: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const req: AxiosResponse<any> = await api.removeFromWatchlist(ticker);
      const watchlist: string[] = req.data.watchlist;

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

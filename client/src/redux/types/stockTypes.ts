export interface StockState {
  readonly tickerPrices: [{ ticker: string; prices: number[] }];
  readonly watchlist: string[];
  readonly error?: string;
  readonly token: string;
  readonly isLoading: boolean;
}

export interface Watchlist {
  watchlist: string[];
}

export enum StockActionTypes {
  GET_TICKER = 'GET_TICKER',
  GET_WATCHLIST = 'GET_WATCHLIST',
  ADD_TICKER = 'ADD_TICKER',
  REMOVE_TICKER = 'REMOVE_TICKER',
  REQUEST_FAILED = 'REQUEST_FAILED',
  SET_IS_LOADING = 'SET_IS_LOADING',
}

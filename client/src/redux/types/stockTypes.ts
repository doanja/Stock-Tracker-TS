export interface StockState {
  // readonly tickerPrices: TickerPrices;
  readonly searchQuery: string; // current searched ticker
  readonly ticker: Ticker | null; // used to display detailed stock info

  readonly watchlist: string[];
  readonly error?: string;
  readonly token: string;
  readonly isLoading: boolean;
}

export interface Watchlist {
  watchlist: string[];
}

export enum StockActionTypes {
  // GET_TICKER_PRICES = 'GET_TICKER_PRICES',
  SET_SEARCH_QUERY = 'SET_SEARCH_QUERY',
  CLEAR_SEARCH_QUERY = 'CLEAR_SEARCH_QUERY',
  SET_TICKER = 'SET_TICKER',
  CLEAR_TICKER = 'CLEAR_TICKER',

  GET_WATCHLIST = 'GET_WATCHLIST',
  ADD_TICKER = 'ADD_TICKER',
  REMOVE_TICKER = 'REMOVE_TICKER',
  REQUEST_FAILED = 'REQUEST_FAILED',
  SET_IS_LOADING = 'SET_IS_LOADING',
}

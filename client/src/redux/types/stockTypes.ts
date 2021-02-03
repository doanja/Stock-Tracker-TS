export interface StockState {
  readonly currentTickerPriceChange: TickerPriceChange;
  readonly currentTickerPrice: TickerPrice | null;
  readonly watchlistPrices: WatchlistPrice[]; // array of WatchlistPrices
  readonly searchQuery: string; // current searched ticker
  readonly currentTicker: string | null; // used to display detailed stock info
  readonly watchlists: Watchlist[]; // array of Watchlist objects (contains id, name, user, watchlist)
  readonly error?: string;
  readonly token: string;
  readonly isLoading: boolean;
}

export enum StockActionTypes {
  SET_CURRENT_TICKER_PRICE_CHANGE = 'SET_CURRENT_TICKER_PRICE_CHANGE',

  SET_CURRENT_TICKER_PRICE = 'SET_CURRENT_TICKER_PRICE',

  SET_WATCHLIST_PRICES = 'SET_WATCHLIST_PRICES',

  SET_SEARCH_QUERY = 'SET_SEARCH_QUERY',
  CLEAR_SEARCH_QUERY = 'CLEAR_SEARCH_QUERY',

  SET_TICKER = 'SET_TICKER',
  CLEAR_TICKER = 'CLEAR_TICKER',

  GET_WATCHLISTS = 'GET_WATCHLISTS',
  CREATE_WATCHLIST = 'CREATE_WATCHLIST',
  UPDATE_WATCHLIST_NAME = 'UPDATE_WATCHLIST_NAME',
  ADD_TICKER = 'ADD_TICKER',
  REMOVE_TICKER = 'REMOVE_TICKER',
  DELETE_WATCHLIST = 'DELETE_WATCHLIST',

  REQUEST_FAILED = 'REQUEST_FAILED',
  SET_IS_LOADING = 'SET_IS_LOADING',
}

type Watchlist = {
  watchlist: string[];
  _id: string;
  name: string;
  user: string;
};

type Article = {
  source: { name: string };
  publishedAt: string;
  title: string;
  url: string;
  urlToImage: string;
};

type TickerPriceChange = {
  price: number;
  percent: number;
};

type ChartData = {
  labels: string[];
  datasets: DataSets[];
};

type DataSets = {
  data: number[];
  backgroundColor?: string = 'rgba(55, 106, 135, 0.5)';
  borderColor?: string = '#376a87';
  fill?: boolean = true;
};

type Prices = {
  price: number;
  changePercent: number;
  priceChange: number;
};

type Ticker = {
  'Company Name': string;
  Symbol: string;
};

type WatchlistPrice = {
  watchlistId?: string;
  watchlistName?: string;
  user?: string;
  tickerPrices: TickerPrice[];
};

type TickerPrice = {
  symbol: string;
  companyName: string;
  prices: Prices[];
};

type SetCurrentWatchlist = (watchlist: WatchlistPrice) => void;

type LoadTicker = (ticker: string) => void;

type GetTickerPrice = () => void;

type ToggleModal = (errorText?: string) => void;

type SignupFormValues = {
  email: string;
  password: string;
  password_2: string;
};

type LoginFormValues = {
  email: string;
  password: string;
};

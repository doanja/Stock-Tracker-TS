type Prices = {
  price: number;
  changePercent: number;
  priceChange: number;
};

type Ticker = {
  'Company Name': string;
  Symbol: string;
};

type TickerPrice = {
  symbol: string;
  companyName: string;
  prices: Prices[];
};

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

// type TickerPrices = TickerPrice[];

// type TickerPrice = { ticker: string; prices: number[] };

// type Ticker = {
//   symbol: string;
//   prices: { date: string; price: number };
// };

type LoadTicker = (ticker: string) => void;

type GetTickerPrice = (ticker: string) => void;

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

declare module 'check-ticker-symbol' {
  export function valid(ticker: string): boolean;
}

type TickerPrices = TickerPrice[];

type TickerPrice = { ticker: string; prices: number[] };

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

import { decode } from 'jsonwebtoken';
import * as Yup from 'yup';
import tickers from '../tickers.json';

/**
 * function to check JWT expiration
 * @param {string} token the JWT
 * @return {boolean} true if token is valid, otherwise false
 */
export const checkTokenExp = (token: string) => {
  const decodedToken = decode(token, { complete: true }) as { [key: string]: any };

  return decodedToken.payload.exp > new Date().getTime() / 1000;
};

export const loginSchema = Yup.object({
  email: Yup.string().required('Email is required.').email('Must be a valid email.'),
  password: Yup.string().required('Password is required.').min(8, 'Password must be at least 8 characters long.'),
});

export const signupSchema = Yup.object({
  email: Yup.string().required('Email is equired').email('Invalid email.'),
  password: Yup.string().required('Password is required.').min(8, 'Password must be at least 8 characters long.'),
  password_2: Yup.string()
    .required('Must confirm password.')
    .oneOf([Yup.ref('password'), 'null'], 'Passwords must match.'),
});

export const validateTicker = (input: string) => {
  input = input.toUpperCase();

  let ticker: Ticker | undefined = tickers.find((obj: Ticker) => obj.Symbol === input);

  // if symbol not found, search by company name
  if (!ticker) {
    ticker = tickers.find((obj: Ticker) => obj['Company Name'].toUpperCase().indexOf(input) > -1);
  }

  return ticker;
};

export const getTickerName = (symbol: string) => {
  symbol = symbol.toUpperCase();

  let ticker: Ticker | undefined = tickers.find((obj: Ticker) => obj.Symbol === symbol);

  return ticker ? ticker['Company Name'] : 'N/A';
};

export const generateWatchlist = (count: number) => {
  let sampleWatchlist = [...tickers];
  return [...Array(count)].map(() => sampleWatchlist.splice(Math.floor(Math.random() * sampleWatchlist.length), 1)[0].Symbol);
};

export const parseArr = (arr: number[], nth: number) => arr.filter((num, i) => i % nth === nth - 1);

import { decode } from 'jsonwebtoken';
import * as Yup from 'yup';
import tickers from '../tickers.json';
import moment from 'moment';
import { StockService } from '../services';
import { AxiosResponse } from 'axios';

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

/**
 * validates input to verify if its a valid ticker
 * @param {string} input the ticker to be validated
 * @return {Ticker | undefined} returns the ticker if input is valid, undefined otherwise
 */
export const validateTicker = (input: string): Ticker | undefined => {
  input = input.toUpperCase();

  let ticker: Ticker | undefined = tickers.find((ticker: Ticker) => ticker.Symbol === input);

  // if symbol not found, search by company name
  if (!ticker) ticker = tickers.find((obj: Ticker) => obj['Company Name'].toUpperCase().indexOf(input) > -1);

  return ticker;
};

/**
 * function to get ticker name from the symbol
 * @param {string} symbol the ticker's symbol
 * @return {string} the ticker's company name otherwise N/A
 */
export const getTickerName = (symbol: string): string => {
  symbol = symbol.toUpperCase();

  let ticker: Ticker | undefined = tickers.find((obj: Ticker) => obj.Symbol === symbol);

  return ticker ? ticker['Company Name'] : 'N/A';
};

/**
 * function to randomly select a set of Tickers from an array
 * @param {number} count the number of tickers to get
 * @param {Ticker[]} arr an array containing the Tickers
 * @return {string[]} an array of strings containing count random tickers
 */
export const generateWatchlist = (count: number, arr: Ticker[] = tickers): string[] => {
  const sampleWatchlist: Ticker[] = [...arr];
  return [...Array(count)].map(() => sampleWatchlist.splice(Math.floor(Math.random() * sampleWatchlist.length), 1)[0].Symbol);
};

/**
 * function to filter array by nth number
 * @param {number[]} arr the array to filter
 * @param {number} nth the numberth to filter by
 * @return {number[]} a filtered array of numbers
 */
export const parseArr = (arr: number[], nth: number): number[] => arr.filter((num, i) => i % nth === nth - 1);

/**
 * function to generate timestamps to be used as x axis labels
 * @param {number} num the number of timeframes to generate
 * @param {number} amount the amount for units
 * @param {any} unit a string representing the unit of time
 * @return {string[]} an array of strings containing the timestamps
 */
export const generateTimstamps = (num: number, amount: number, unit: any): string[] => {
  const times = [];
  const currentDate = moment().format('lll');
  times.push(currentDate);

  let m = moment(currentDate);

  for (let i = 0; i < num; i++) {
    times.push(m.subtract(amount, unit).format('lll'));
  }

  return times.reverse();
};

/**
 * function to get the first and last number form an array
 * @param {number[]} arr the array to lookup first and last numbers
 * @return {{first: number; last: number}} an object containing the first and last number from the array
 */
export const getFirstAndLastValues = (arr: number[]): { first: number; last: number } => {
  return { first: arr[0], last: arr[arr.length - 1] };
};

/**
 * function to round a number to two decimal places
 * @param {number} num the number to be rounded
 * @return {number} return a number rounded to two decimal places
 */
export const roundDecimals = (num: number): number => parseFloat((Math.round(num * 100) / 100).toFixed(2));

/**
 * function to generate the next price
 * @param {number} oldPrice the previous price
 * @return {Prices} a Price object containing the price, changePercent and priceChange
 * @return {Price} the new price
 */
export const getNextPrice = (oldPrice: number): Prices => {
  const volatility: number = Math.random() * 0.05 + 0.02;
  const rnd: number = Math.random();
  let changePercent = 2 * volatility * rnd;

  if (changePercent > volatility) changePercent -= 2 * volatility;

  changePercent = roundDecimals(changePercent);

  const changeAmount: number = (oldPrice * changePercent) / 100;
  const price: number = roundDecimals(oldPrice + changeAmount); // new price
  const priceChange: number = roundDecimals(price - oldPrice);

  return { price, changePercent, priceChange };
};

/**
 * function to calculate the change in percent and price
 * @param {Price} newPrice the updated Price
 * @param {Price} initialPrice the starting Price
 * @return {Price} the new price
 */
export const getPriceDifference = (newPrice: Prices, initialPrice: Prices): Prices => {
  const { price, changePercent, priceChange } = newPrice;

  return {
    price,
    changePercent: roundDecimals(initialPrice.changePercent - changePercent),
    priceChange: roundDecimals(initialPrice.priceChange - priceChange),
  };
};

/**
 * function that updates the prices of an array of Ticker Prices
 * @param tickerPrices an array of Ticker Prices
 * @return {TickerPrice[]} an array of Ticker Prices
 */
export const bulkUpdatePrices = (tickerPrices: TickerPrice[]): TickerPrice[] => {
  const updatedPrices: TickerPrice[] = [...tickerPrices!];

  updatedPrices.forEach(tickerPrice => {
    const newPrice = getNextPrice(tickerPrice.prices[0].price);
    const initialPrice = tickerPrice.prices[0];
    tickerPrice.prices[0] = getPriceDifference(newPrice, initialPrice);
  });

  return updatedPrices;
};

/**
 * function to create an array of promises containing the TickerPricese
 * @param {string[]} watchlist an array of strings containing the tickers
 * @return {Promise<AxiosResponse<TickerPrice>[]>} an array of promises containing the TickerPrices
 */
export const loadPrices = async (watchlist: string[]): Promise<AxiosResponse<any>> => {
  const stockAPI = new StockService();
  return stockAPI.getTickerPrices(watchlist);
};

/**
 * function to generate stock data
 * @param {string[]} sampleWatchlist an array of strings containing the tickers
 * @return {Promise<TickerPrice[]} returns an array of TickerPrice
 */
export const generateTickerPrices = async (sampleWatchlist: string[]): Promise<TickerPrice[]> => {
  const tickerPrices: TickerPrice[] = [];

  try {
    await loadPrices(sampleWatchlist).then(res => {
      const prices: TickerPrice[] = res.data.tickerPrices;

      for (let i = 0; i < res.data.tickerPrices.length; i++) {
        tickerPrices.push(prices[i]);
      }
    });

    return tickerPrices;
  } catch (error) {
    return [];
  }
};

/**
 * function that converts a number to a string with 2 decimal places
 * @param {number} price the price to be converted
 * @return {string} the price converted to string formatted to two decimal places
 */
export const formatPrice = (price: number): string => (Math.round(price * 100) / 100).toFixed(2);

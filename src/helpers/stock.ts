import tickers from '../tickers.json';

/**
 * function to round a number to two decimal places
 * @param {number} num the number to be rounded
 * @return {number} return a number rounded to two decimal places
 */
const roundDecimals = (num: number): number => +(Math.round(num * 100) / 100).toFixed(2);

/**
 * function to generate the next price
 * @param {number} oldPrice the previous price
 * @return {Prices} a Price object containing the price, changePercent and priceChange
 */
export const getNextPrice = (oldPrice: number): Prices => {
  const volatility: number = Math.random() * 5 + 2;
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
 * function to build an array of prices
 * @param {number} days the number of days to generate prices for
 * @return {Prices[]} an array of prices
 */
export const generatePrices = (days: number): Prices[] => {
  const prices: Prices[] = [];
  const min = Math.random() * 300;
  const max = Math.random() * 300 + min;

  const initialPrice = Math.random() * (max - min + 1) + min;

  prices.push({ price: initialPrice, changePercent: 0, priceChange: 0 });

  for (let i = 0; i < days; i++) {
    const { price, changePercent, priceChange } = getNextPrice(prices[i].price);
    prices.push({ price, changePercent, priceChange });
  }

  prices.shift();

  return prices;
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

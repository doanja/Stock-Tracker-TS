interface Prices {
  price: number;
  changePercent: number;
  priceChange: number;
}

const roundDecimals = (num: number) => parseFloat((Math.round(num * 100) / 100).toFixed(2));

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

export const generatePrices = (days: number = 1825): Prices[] => {
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

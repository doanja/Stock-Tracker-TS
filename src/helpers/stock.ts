export const getNextPrice = (oldPrice: number): number => {
  const volatility = Math.random() * 10 + 2;
  const rnd = Math.random();
  let changePercent = 2 * volatility * rnd;

  if (changePercent > volatility) changePercent -= 2 * volatility;

  const changeAmount = (oldPrice * changePercent) / 100;

  let newPrice = oldPrice + changeAmount;

  return newPrice;
};

export const generatePrices = (days: number = 1825): number[] => {
  const prices: number[] = [];
  const min = Math.random() * 6 + 300;
  let max = Math.random() * 6 + 300;

  if (min < max) max = min;

  const initialPrice = Math.random() * (max - min + 1) + min;

  prices.push(initialPrice);

  for (let i = 0; i < days; i++) {
    prices.push(getNextPrice(prices[i]));
    // prices.push(getNextPrice(initialPrice));
  }

  return prices;
};

export const parseArr = (arr: number[], nth: number) => arr.filter((num, i) => i % nth === nth - 1);

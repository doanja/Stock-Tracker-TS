interface Prices {
  price: number;
  changePercent: number;
  priceChange: number;
}

export const getNextPrice = (oldPrice: number): Prices => {
  const volatility: number = Math.random() * 5 + 2;
  const rnd: number = Math.random();
  let changePercent = 2 * volatility * rnd;

  if (changePercent > volatility) changePercent -= 2 * volatility;

  const changeAmount: number = (oldPrice * changePercent) / 100;

  let price = oldPrice + changeAmount; // new price

  const priceChange = price - oldPrice;

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

  return prices;
};

// TODO: move this function to front end to grab X amount of data points
export const parseArr = (arr: number[], nth: number) => arr.filter((num, i) => i % nth === nth - 1);

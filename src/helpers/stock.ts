export const getNextPrice = (oldPrice: number): number => {
  const volatility = Math.random() * 10 + 2;

  const rnd = Math.random();

  let changePercent = 2 * volatility * rnd;

  if (changePercent > volatility) changePercent -= 2 * volatility;

  const changeAmount = (oldPrice * changePercent) / 100;

  let newPrice = oldPrice + changeAmount;

  return newPrice;
};

export const genRandomNumArr = (numbersToGen: number, min: number, max: number): number[] => {
  const numArr: number[] = [];

  for (let i = 0; i < numbersToGen; i++) {
    numArr.push(Math.random() * (max - min + 1) + min);
  }

  return numArr;
};

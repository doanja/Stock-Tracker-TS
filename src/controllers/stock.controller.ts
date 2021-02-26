import { Request, Response } from 'express';
import { generatePrices, getTickerName } from '../helpers/stock';

export const getTickerPrices = async (req: Request, res: Response): Promise<void> => {
  try {
    const tickerPrices = req.body.watchlist.map((ticker: string) => {
      return { symbol: ticker, companyName: getTickerName(ticker), prices: generatePrices(1) };
    });

    res.status(200).json({ tickerPrices });
  } catch (error) {
    res.status(401).json(error);
  }
};

export const getTickerPricesMin = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({ prices: generatePrices(1) });
  } catch (error) {
    res.status(401).json(error);
  }
};

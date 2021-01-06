import { Request, Response } from 'express';

import { generatePrices } from '../helpers/stock';

export const getTickerPrices = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({ prices: generatePrices() });
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

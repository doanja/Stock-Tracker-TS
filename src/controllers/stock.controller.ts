import { Request, Response } from 'express';
import { generatePrices, getTickerName } from '../helpers/stock';
import axios from 'axios';

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

export const getCompanyInfo = async (req: Request, res: Response): Promise<void> => {
  const { symbol } = req.params;

  axios
    .get<any>(`https://cloud.iexapis.com/stable/stock/${symbol}/company?token=sk_bfc879f084974187bdfc0ad251bb331d`)
    .then(responses => {
      const articles = responses.data;
      res.status(200).json({ articles });
    })
    .catch(error => {
      res.status(401).json(error);
    });
};

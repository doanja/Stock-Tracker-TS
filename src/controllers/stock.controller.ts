import { Request, Response } from 'express';
import { User } from '../models';
import { IUser } from '../@types';
import { generatePrices } from '../helpers/stock';

export const getWatchlist = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser | null = await User.findById(req.accessToken?._id);

    res.status(200).json({ watchlist: user!.watchlist });
  } catch (error) {
    res.status(401).json(error);
  }
};

export const addToWatchlist = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ticker } = req.body;

    if (!ticker) res.status(401);

    const user: IUser | null = await User.findOneAndUpdate({ _id: req.accessToken?._id }, { $addToSet: { watchlist: ticker } }, { new: true });

    // User.findOneAndUpdate({ _id: req.accessToken?._id }, { $addToSet: { watchlist: ticker } }, { new: true })
    //   .then(user => {
    //     res.status(200).json({ watchlist: user!.watchlist });
    //   })
    //   .catch(error => {
    //     res.status(401).json(error);
    //   });

    res.status(200).json({ watchlist: user!.watchlist });
  } catch (error) {
    res.status(401).json(error);
  }
};

export const removeFromWatchlist = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ticker } = req.body;

    if (!ticker) res.status(401);

    const user: IUser | null = await User.findOneAndUpdate({ _id: req.accessToken?._id }, { $pull: { watchlist: ticker } }, { new: true });

    res.status(200).json({ watchlist: user!.watchlist });
  } catch (error) {
    res.status(401).json(error);
  }
};

export const getStockPrices = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({ prices: generatePrices() });
  } catch (error) {
    res.status(401).json(error);
  }
};

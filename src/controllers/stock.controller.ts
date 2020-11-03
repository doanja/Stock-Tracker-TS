import { Request, Response } from 'express';
import { User } from '../models';
import { IUser } from '../@types';
import { generatePrices, getNextPrice } from '../helpers/stock';

export const getFavorites = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser | null = await User.findById(req.accessToken?._id);

    res.status(200).json({ watchlist: user!.watchlist });
  } catch (error) {
    res.status(401).json(error);
  }
};

export const addFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ticker } = req.body;
    if (!ticker) res.status(401);

    const user: IUser | null = await User.findOneAndUpdate({ _id: req.accessToken?._id }, { $addToSet: { watchlist: ticker } }, { new: true });

    res.status(200).json({ watchlist: user!.watchlist });
  } catch (error) {
    res.status(401).json(error);
  }
};

export const removeFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ticker } = req.body;

    if (!ticker) res.status(401);

    const user: IUser | null = await User.findOneAndUpdate({ _id: req.accessToken?._id }, { $pull: { watchlist: ticker } }, { new: true });

    res.status(200).json({ watchlist: user!.watchlist });
  } catch (error) {
    res.status(401).json(error);
  }
};

export const test = async (req: Request, res: Response): Promise<void> => {
  try {
    const prices = generatePrices();

    res.status(200).json({ prices });
  } catch (error) {
    res.status(401).json(error);
  }
};

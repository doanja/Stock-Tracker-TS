import { Request, Response } from 'express';
import { Watchlist } from '../models';
import { IWatchlist } from '../@types';

export const getWatchlists = async (req: Request, res: Response): Promise<void> => {
  try {
    const watchlists: IWatchlist[] | null = await Watchlist.find({ user: req.accessToken?._id });

    res.status(200).json({ watchlists });
  } catch (error) {
    res.status(401).json(error);
  }
};

export const createWatchlist = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;

    const watchlist: IWatchlist | null = await Watchlist.create({ name, user: req.accessToken?._id, watchlist: [] });

    res.status(200).json({ watchlist });
  } catch (error) {
    res.status(401).json(error);
  }
};

export const updateWatchlistName = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, watchlistId } = req.params;

    const watchlist: IWatchlist | null = await Watchlist.findOneAndUpdate({ _id: watchlistId }, { name }, { new: true });

    res.status(200).json({ watchlist });
  } catch (error) {
    res.status(401).json(error);
  }
};

export const addToWatchlist = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ticker, watchlistId } = req.params;

    const watchlist: IWatchlist | null = await Watchlist.findOneAndUpdate(
      { _id: watchlistId },
      { $addToSet: { watchlist: ticker.toUpperCase() } },
      { new: true }
    );

    res.status(200).json({ watchlist });
  } catch (error) {
    res.status(401).json(error);
  }
};

export const removeFromWatchlist = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ticker, watchlistId } = req.params;

    const watchlist: IWatchlist | null = await Watchlist.findOneAndUpdate(
      { _id: watchlistId },
      { $pull: { watchlist: ticker.toUpperCase() } },
      { new: true }
    );

    res.status(200).json({ watchlist });
  } catch (error) {
    res.status(401).json(error);
  }
};

export const deleteWatchlist = async (req: Request, res: Response): Promise<void> => {
  try {
    const { watchlistId } = req.params;

    const watchlist: IWatchlist | null = await Watchlist.findOneAndDelete({ _id: watchlistId });

    res.status(200).json({ watchlist });
  } catch (error) {
    res.status(401).json(error);
  }
};

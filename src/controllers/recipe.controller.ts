import { Request, Response } from 'express';
import { User } from '../models';
import { IUser } from '../@types';

export const getFavorites = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser | null = await User.findById(req.accessToken?._id);

    res.status(200).json({ recipes: user!.recipes });
  } catch (error) {
    res.status(401).json(error);
  }
};

export const addFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { recipeId } = req.body;
    if (!recipeId) res.status(401);

    const user: IUser | null = await User.findOneAndUpdate({ _id: req.accessToken?._id }, { $addToSet: { recipes: recipeId } }, { new: true });

    res.status(200).json({ recipes: user!.recipes });
  } catch (error) {
    res.status(401).json(error);
  }
};

export const removeFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { recipeId } = req.body;

    if (!recipeId) res.status(401);

    const user: IUser | null = await User.findOneAndUpdate({ _id: req.accessToken?._id }, { $pull: { recipes: recipeId } }, { new: true });

    res.status(200).json({ recipes: user!.recipes });
  } catch (error) {
    res.status(401).json(error);
  }
};

import { Router } from 'express';
import { addFavorite, getFavorites, removeFavorite } from '../controllers/recipe.controller';
import { verifyAccessToken } from '../middleware/verifyToken';

export default class RecipeRoute {
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get('/favorites', [verifyAccessToken], getFavorites);
    this.router.put('/favorites/add', [verifyAccessToken], addFavorite);
    this.router.put('/favorites/remove', [verifyAccessToken], removeFavorite);
  }
}

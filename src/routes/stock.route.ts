import { Router } from 'express';
import { addFavorite, getFavorites, removeFavorite, getStockPrices } from '../controllers/stock.controller';
import { verifyAccessToken } from '../middleware/verifyToken';

export default class StockRoute {
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get('/favorites', [verifyAccessToken], getFavorites);
    this.router.put('/favorites/add', [verifyAccessToken], addFavorite);
    this.router.put('/favorites/remove', [verifyAccessToken], removeFavorite);
    this.router.get('/stock/', getStockPrices);
  }
}

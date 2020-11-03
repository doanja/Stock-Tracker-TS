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
    // this.router.get('/stock/day/:sampleSize', getDailyPrices); // show 7 to represent 1 week
    // this.router.get('/stock/week/:sampleSize', getWeeklyPrices); // show 4 to represent 1 month
    // this.router.get('/stock/month/:sampleSize'); // show 12 to represent 1 year
    this.router.get('/stock', getStockPrices);
  }
}

import { Router } from 'express';
import { addToWatchlist, getWatchlist, removeFromWatchlist, getTickerPrices } from '../controllers/stock.controller';
import { verifyAccessToken } from '../middleware/verifyToken';

export default class StockRoute {
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get('/watchlist', [verifyAccessToken], getWatchlist);
    this.router.put('/watchlist/add', [verifyAccessToken], addToWatchlist);
    this.router.put('/watchlist/remove', [verifyAccessToken], removeFromWatchlist);
    this.router.get('/stock/prices', getTickerPrices);
  }
}

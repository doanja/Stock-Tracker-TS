import { Router } from 'express';
import {
  getWatchlists,
  createWatchlist,
  updateWatchlistName,
  addToWatchlist,
  removeFromWatchlist,
  deleteWatchlist,
} from '../controllers/watchlist.controller';
import { verifyAccessToken } from '../middleware/verifyToken';

export default class WatchlistRoute {
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get('/watchlist', [verifyAccessToken], getWatchlists);
    this.router.post('/watchlist', [verifyAccessToken], createWatchlist);
    this.router.put('/watchlist/:watchlistId/:name', [verifyAccessToken], updateWatchlistName);
    this.router.put('/watchlist/add/:watchlistId/:ticker', [verifyAccessToken], addToWatchlist);
    this.router.put('/watchlist/remove/:watchlistId/:ticker', [verifyAccessToken], removeFromWatchlist);
    this.router.delete('/watchlist/:watchlistId', [verifyAccessToken], deleteWatchlist);
  }
}

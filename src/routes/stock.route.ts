import { Router } from 'express';
import { getCompanyInfo, getTickerPrices } from '../controllers/stock.controller';

export default class StockRoute {
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post('/stock/prices', getTickerPrices);
    this.router.get('/stock/prices/:symbol', getCompanyInfo);
  }
}

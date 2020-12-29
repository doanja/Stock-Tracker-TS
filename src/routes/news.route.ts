import { Router } from 'express';
import { getNews, getTopHeadlines } from '../controllers/news.controller';

export default class NewsRoute {
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get('/news/:ticker', getNews);
    this.router.get('/news', getTopHeadlines);
  }
}

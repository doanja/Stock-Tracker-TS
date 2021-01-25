import { Request, Response } from 'express';
import axios from 'axios';
import moment from 'moment';

export const getNews = (req: Request, res: Response) => {
  const { query } = req.params;

  try {
    axios
      .get<any>(
        `https://newsapi.org/v2/everything?q=${query}&from=${moment().format('YYYY-MM-DD')}&sortBy=popularity&apiKey=66942a780eeb4313a546f9909092a61c`
      )
      .then(responses => {
        const articles = responses.data.articles;
        res.status(200).json({ articles });
      });
  } catch (error) {
    res.status(401).json(error);
  }
};

export const getTopHeadlines = (req: Request, res: Response) => {
  try {
    axios.get<any>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=66942a780eeb4313a546f9909092a61c`).then(responses => {
      const articles = responses.data.articles;
      res.status(200).json({ articles });
    });
  } catch (error) {
    res.status(401).json(error);
  }
};

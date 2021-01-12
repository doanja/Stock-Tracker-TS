import React, { useState, useEffect } from 'react';
import { NewsService } from '../services';
import moment from 'moment';
import { TickerNews } from './';
import '../styles/main.min.css';

interface TickerNewsContainerProps {
  ticker: string | null;
}

const TickerNewsContainer: React.FC<TickerNewsContainerProps> = ({ ticker }) => {
  const api = new NewsService();
  const [articles, setArticles] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  const getHoursFromCurrent = (time: string): string => {
    const then = moment(time).format();
    const now = moment().format();
    return moment.utc(moment(now).diff(moment(then))).format('H');
  };

  const getTopHeadLines = () => {
    api.getTopHeadlines().then(res => {
      const articles = res.data.articles;
      articles.forEach((article: Article) => (article.publishedAt = getHoursFromCurrent(article.publishedAt)));
      setArticles(articles.slice(0, 6));
    });
  };

  useEffect(() => {
    setIsMounted(true);
    if (ticker) {
      api.getNews(ticker).then(res => {
        const articles = res.data.articles;
        if (articles.length > 0) {
          articles.forEach((article: Article) => (article.publishedAt = getHoursFromCurrent(article.publishedAt)));
          setArticles(articles.slice(0, 6));
        } else getTopHeadLines();
      });
    } else getTopHeadLines();
    return () => setIsMounted(false);
  }, [ticker]);

  if (!isMounted) return null;

  return (
    <div className='p-3 sub-container ticker-home-sub-wrap flex-even'>
      <h2 className='sub-heading'>In the news</h2>
      {articles.map((article: Article, index) => (
        <TickerNews article={article} key={index} />
      ))}
    </div>
  );
};

export default TickerNewsContainer;

import React, { useState, useEffect } from 'react';
import { NewsService } from '../services';
import moment from 'moment';
import { TickerNews } from '.';
import '../styles/main.min.css';

interface TickerNewsContainerProps {
  ticker: string | null;
}

const TickerNewsContainer: React.FC<TickerNewsContainerProps> = ({ ticker }) => {
  const api = new NewsService('66942a780eeb4313a546f9909092a61c');
  const [articles, setArticles] = useState([]);

  const getHoursFromCurrent = (time: string): string => {
    const then = moment(time).format();
    const now = moment().format();
    return moment.utc(moment(now).diff(moment(then))).format('H');
  };

  useEffect(() => {
    if (ticker)
      api.getNews(ticker).then(res => {
        const articles = res.data.articles;
        articles.forEach((article: Article) => (article.publishedAt = getHoursFromCurrent(article.publishedAt)));
        setArticles(articles.slice(0, 6));
      });
  }, [ticker]);

  return (
    <div className='mt-3 p-3 main-container'>
      <h2 className='main-heading'>In the news</h2>
      {articles.map((article: Article, index) => (
        <TickerNews article={article} key={index} />
      ))}
    </div>
  );
};

export default TickerNewsContainer;

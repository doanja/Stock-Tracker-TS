import React, { useState, useEffect } from 'react';
import { NewsService } from '../services';
import moment from 'moment';
import { TickerNews } from './';
import '../styles/news.min.css';
import { Col } from 'react-bootstrap';

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
        setArticles(articles);
      });
  }, [ticker]);

  return (
    <Col md={8} className='mt-3 p-3 news-container'>
      <h3>In the news</h3>
      {articles.map(article => (
        <TickerNews article={article} />
      ))}
    </Col>
  );
};

export default TickerNewsContainer;

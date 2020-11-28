import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/news.min.css';

interface TickerNewsProps {
  article: Article;
}

const TickerNews: React.FC<TickerNewsProps> = ({ article }) => {
  return (
    <div className='py-1 ticker-news'>
      <aside>
        {article.source.name} * {article.publishedAt}
      </aside>

      <Link to={article.url}>{article.title}</Link>
      <img src={article.urlToImage} alt={article.url} />
    </div>
  );
};

export default TickerNews;

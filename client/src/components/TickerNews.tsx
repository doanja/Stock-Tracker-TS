import React from 'react';
import { Row, Col } from 'react-bootstrap';
import '../styles/main.min.css';
import error from '../images/error.png';

interface TickerNewsProps {
  article: Article;
}

const TickerNews: React.FC<TickerNewsProps> = ({ article }) => {
  return (
    <div className='py-1 ticker-news d-inline'>
      <hr />
      <Row noGutters={true}>
        <Col xs={9}>
          <a href={article.url} className='d-block pr-1 text-dark'>
            <div className='news-source'>
              {article.source.name} - {article.publishedAt} hours ago
            </div>
            <br />
            <p className='news-title'>{article.title}</p>
          </a>
        </Col>

        <Col xs={3}>
          <img src={article.urlToImage ? article.urlToImage : error} alt={article.url} className='news-image' />
        </Col>
      </Row>
    </div>
  );
};

export default TickerNews;

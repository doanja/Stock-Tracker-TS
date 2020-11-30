import React from 'react';
import { Row, Col } from 'react-bootstrap';
import '../styles/news.min.css';

interface TickerNewsProps {
  article: Article;
}

const TickerNews: React.FC<TickerNewsProps> = ({ article }) => {
  return (
    <div className='py-1 ticker-news d-inline'>
      <hr />
      <Row noGutters={true}>
        <Col xs={9}>
          <a href={article.url} className='d-block pr-1'>
            <div className='mb-1'>
              {article.source.name} - {article.publishedAt} hours ago
            </div>
            <br />
            {article.title}
          </a>
        </Col>

        <Col xs={3}>
          <img src={article.urlToImage} alt={article.url} className='news-image' />
        </Col>
      </Row>
    </div>
  );
};

export default TickerNews;

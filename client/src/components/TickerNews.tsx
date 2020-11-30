import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import '../styles/news.min.css';

interface TickerNewsProps {
  article: Article;
}

const TickerNews: React.FC<TickerNewsProps> = ({ article }) => {
  return (
    <div className='py-1 ticker-news d-inline'>
      <hr />
      <Row xs={9} noGutters={true}>
        <Col>
          <Link to={article.url}>
            <div className='mb-1 pr-2'>
              {article.source.name} - {article.publishedAt} hours ago
            </div>
            <br />
            {article.title}
          </Link>
        </Col>

        <Col xs={3}>
          <img src={article.urlToImage} alt={article.url} className='news-image' />
        </Col>
      </Row>
    </div>
  );
};

export default TickerNews;

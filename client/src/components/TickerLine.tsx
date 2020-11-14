import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/ticker.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretSquareUp, faCaretSquareDown } from '@fortawesome/free-solid-svg-icons';

interface TickerLineProps {
  tickerPrices?: TickerPrice[];
}

const TickerLine: React.FC<TickerLineProps> = ({ tickerPrices }) => {
  tickerPrices = tickerPrices?.slice(0, 5);

  return (
    <Container className='mt-3'>
      <Row>
        {tickerPrices?.map((ticker: TickerPrice) => (
          <Col md={true} sm={12} xs={12} className='ticker-item' key={ticker.symbol}>
            <Link to={`/quote/${ticker.symbol}`} style={{ textDecoration: 'none' }}>
              {ticker.prices[1].priceChange < 0 ? (
                <Row>
                  <Col xs={2}>
                    <FontAwesomeIcon className='ticker-icon ticker-icon-red' icon={faCaretSquareDown} />
                  </Col>
                  <Col xs={5}>
                    <p className='font-weight-bold'>{ticker.symbol}</p>
                    <p>{ticker.prices[1].price}</p>
                  </Col>
                  <Col xs={5} className='text-danger'>
                    <p>${ticker.prices[1].priceChange * -1}</p>
                    <p>{ticker.prices[1].changePercent}%</p>
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col xs={2}>
                    <FontAwesomeIcon className='ticker-icon ticker-icon-green' icon={faCaretSquareUp} />
                  </Col>
                  <Col xs={5}>
                    <p className='font-weight-bold'>{ticker.symbol}</p>
                    <p>{ticker.prices[1].price}</p>
                  </Col>
                  <Col xs={5} className='text-success'>
                    <p>${ticker.prices[1].priceChange}</p>
                    <p>+{ticker.prices[1].changePercent}%</p>
                  </Col>
                </Row>
              )}
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TickerLine;

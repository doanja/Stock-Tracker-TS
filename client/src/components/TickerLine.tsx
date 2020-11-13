import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/ticker.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

interface TickerLineProps {
  tickerPrices?: TickerPrice[];
}

const TickerLine: React.FC<TickerLineProps> = ({ tickerPrices }) => {
  // each ticker box, needs the name, current price, how much it went up/down

  <FontAwesomeIcon icon={faArrowUp} />;

  return (
    <Container className='mt-3'>
      <Row>
        {tickerPrices?.map(ticker => (
          <Col md='2' className='ticker-item'>
            <Link to={`/quote/${ticker.symbol}`} key={ticker.symbol}>
              <Row>
                <Col md={4}>{ticker.prices[1].priceChange < 0 ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} />}</Col>
                <Col md={4}>
                  <h3 className='text-center'>{ticker.symbol}</h3>
                  <h3 className='text-center'>{ticker.prices[1].price}</h3>
                </Col>
                <Col md={4}>
                  {ticker.prices[1].priceChange < 0 ? (
                    <h3 className='text-center'>-${ticker.prices[1].priceChange * -1}</h3>
                  ) : (
                    <h3 className='text-center'>${ticker.prices[1].priceChange}</h3>
                  )}

                  <h3 className='text-center'>{ticker.prices[1].changePercent}%</h3>
                </Col>
              </Row>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TickerLine;

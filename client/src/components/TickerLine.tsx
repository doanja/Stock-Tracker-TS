import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/ticker.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretSquareUp, faCaretSquareDown } from '@fortawesome/free-solid-svg-icons';

// redux
import { useDispatch } from 'react-redux';
import { setTicker } from '../redux/actions/stockActions';

interface TickerLineProps {
  tickerPrices?: TickerPrice[];
}

const TickerLine: React.FC<TickerLineProps> = ({ tickerPrices }) => {
  tickerPrices = tickerPrices?.slice(0, 5);

  // redux
  const dispatch = useDispatch();

  return (
    <Container className='mt-3'>
      <Row>
        {tickerPrices?.map((ticker: TickerPrice) => (
          <Col md={true} sm={12} xs={12} className='ticker-item' key={ticker.symbol} onClick={() => dispatch(setTicker(ticker.symbol))}>
            {ticker.prices[1].priceChange > 0 ? (
              <Row>
                <Col xs={2}>
                  <FontAwesomeIcon className='ticker-icon font-green-dark' icon={faCaretSquareUp} size='lg' />
                </Col>
                <Col xs={5}>
                  <p className='font-weight-bold'>{ticker.symbol}</p>
                  <p>{ticker.prices[1].price}</p>
                </Col>
                <Col xs={5} className='font-green-dark'>
                  <p>${ticker.prices[1].priceChange}</p>
                  <p>+{ticker.prices[1].changePercent}%</p>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col xs={2}>
                  <FontAwesomeIcon className='ticker-icon font-red-dark' icon={faCaretSquareDown} size='lg' />
                </Col>
                <Col xs={5}>
                  <p className='font-weight-bold'>{ticker.symbol}</p>
                  <p>{ticker.prices[1].price}</p>
                </Col>
                <Col xs={5} className='font-red-dark'>
                  <p>${ticker.prices[1].priceChange * -1}</p>
                  <p>{ticker.prices[1].changePercent}%</p>
                </Col>
              </Row>
            )}
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TickerLine;

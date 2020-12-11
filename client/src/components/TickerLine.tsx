import React from 'react';
import { Row, Col } from 'react-bootstrap';
import '../styles/ticker.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretSquareUp, faCaretSquareDown } from '@fortawesome/free-solid-svg-icons';

// redux
import { useDispatch } from 'react-redux';
import { setTicker } from '../redux/actions/stockActions';

interface TickerLineProps {
  ticker: TickerPrice;
}

const TickerLine: React.FC<TickerLineProps> = ({ ticker }) => {
  // redux
  const dispatch = useDispatch();

  return (
    <Col md={true} sm={12} xs={12} className='ticker-item' key={ticker.symbol} onClick={() => dispatch(setTicker(ticker.symbol))}>
      {ticker.prices[0].priceChange > 0 ? (
        <Row>
          <Col xs={2}>
            <FontAwesomeIcon className='ticker-icon font-green-dark' icon={faCaretSquareUp} size='lg' />
          </Col>
          <Col xs={5}>
            <p className='font-weight-bold'>{ticker.symbol}</p>
            <p>{ticker.prices[0].price}</p>
          </Col>
          <Col xs={5} className='font-green-dark'>
            <p>${ticker.prices[0].priceChange}</p>
            <p>+{ticker.prices[0].changePercent}%</p>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col xs={2}>
            <FontAwesomeIcon className='ticker-icon font-red-dark' icon={faCaretSquareDown} size='lg' />
          </Col>
          <Col xs={5}>
            <p className='font-weight-bold'>{ticker.symbol}</p>
            <p>{ticker.prices[0].price}</p>
          </Col>
          <Col xs={5} className='font-red-dark'>
            <p>${ticker.prices[0].priceChange * -1}</p>
            <p>{ticker.prices[0].changePercent}%</p>
          </Col>
        </Row>
      )}
    </Col>
  );
};

export default TickerLine;

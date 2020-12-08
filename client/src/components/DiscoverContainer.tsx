import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { StockService } from '../services';
import { generateWatchlist, getTickerName } from '../helper';
import '../styles/main.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// redux
import { useDispatch } from 'react-redux';
import { setTicker } from '../redux/actions/stockActions';

export const DiscoverContainer: React.FC = () => {
  const stockAPI = new StockService();

  // redux
  const dispatch = useDispatch();

  const [tickerPrices, setTickerPrices] = useState<TickerPrice[]>([]);

  useEffect(() => {
    initializeDiscoverTickers();
  }, []);

  const initializeDiscoverTickers = () => {
    const sampleWatchlist = generateWatchlist(6);

    const loadPrices = async () => Promise.all(sampleWatchlist.map(ticker => stockAPI.getTickerPrices()));

    const tickerPrices: TickerPrice[] = [];

    loadPrices().then(promise => {
      for (let i = 0; i < promise.length; i++) {
        tickerPrices.push({ symbol: sampleWatchlist[i], companyName: getTickerName(sampleWatchlist[i]), prices: promise[i].data.prices });
      }
      setTickerPrices(tickerPrices);
    });
  };

  return (
    <div className='mt-3 p-3 sub-container'>
      <h3 className='sub-heading'>Discover</h3>

      <Container fluid={true}>
        <Row>
          {tickerPrices?.map((ticker: TickerPrice) => (
            <Col md={true} sm={12} xs={12} className='ticker-item' key={ticker.symbol} onClick={() => dispatch(setTicker(ticker.symbol))}>
              <Badge variant='dark' className='mb-1'>
                {ticker.symbol}
              </Badge>

              <p className='mb-3'>{ticker.companyName}</p>
              <p className='mb-3'>${ticker.prices[0].price}</p>
              <div className='mb-3'>
                <div className='float-left'>
                  <Badge variant='primary '>{ticker.prices[0].changePercent}%</Badge>
                </div>
                <div className='float-right' onClick={() => alert('added to watchlist')}>
                  <FontAwesomeIcon className='ticker-icon' icon={faPlus} size='lg' />
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

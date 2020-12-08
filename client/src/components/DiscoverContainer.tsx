import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { StockService } from '../services';
import { generateWatchlist, getTickerName } from '../helper';
import '../styles/main.min.css';

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

      {/* <Navbar bg='dark' variant='dark' className='mt-3 custom-footer'> */}
      <Container>
        {/* <div className='text-center'>
            <Navbar.Brand className='brand' href='/'>
              Stock Tracker
            </Navbar.Brand>
            <Nav className='mr-auto'>
              <Nav.Link href='/help'>Help</Nav.Link>
              <Nav.Link href='/privacy'>Privacy</Nav.Link>
              <Nav.Link href='/terms'>Terms</Nav.Link>
            </Nav>
          </div> */}
        <Row>
          {tickerPrices?.map((ticker: TickerPrice) => (
            <Col md={true} sm={12} xs={12} className='ticker-item' key={ticker.symbol} onClick={() => dispatch(setTicker(ticker.symbol))}>
              <p>{ticker.symbol}</p>
            </Col>
          ))}
        </Row>
      </Container>
      {/* </Navbar> */}
    </div>
  );
};

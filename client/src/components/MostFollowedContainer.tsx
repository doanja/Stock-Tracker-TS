import React, { useState, useEffect } from 'react';
import { StockService } from '../services';
import { getTickerName } from '../helper';
import { MostFollowed } from './';
import { Container, Spinner } from 'react-bootstrap';
import '../styles/main.min.css';

const MostFollowedContainer: React.FC = ({}) => {
  const stockAPI = new StockService();
  const [tickerPrices, setTickerPrices] = useState<TickerPrice[]>([]);

  useEffect(() => {
    generateTickerPrices();
  }, []);

  // function to generate stock data
  const generateTickerPrices = () => {
    const sampleWatchlist = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB', 'TSLA'];
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
    <Container className='m-0 p-0 sub-container'>
      <h2 className='sub-heading mb-3'>Most followed on Stock Tracker</h2>
      {tickerPrices.length > 0 ? (
        tickerPrices?.map((ticker: TickerPrice) => <MostFollowed tickerPrice={ticker} key={ticker.symbol} />)
      ) : (
        <div className='mt-3 text-center'>
          <Spinner animation='border' variant='dark' />
        </div>
      )}
    </Container>
  );
};

export default MostFollowedContainer;

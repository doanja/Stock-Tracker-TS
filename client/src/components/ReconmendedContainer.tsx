import React, { useState, useEffect } from 'react';
import { StockService } from '../services';
import { getTickerName, bulkUpdatePrices } from '../helper';
import { Reconmended } from './';
import { Container, Spinner } from 'react-bootstrap';
import '../styles/main.min.css';

const ReconmendedContainer: React.FC = ({}) => {
  const stockAPI = new StockService();
  const [tickerPrices, setTickerPrices] = useState<TickerPrice[]>([]);

  useEffect(() => {
    generateTickerPrices();
  }, []);

  //function to generate stock data
  const generateTickerPrices = () => {
    const sampleWatchlist = ['TSLA', 'INDEX', 'AAPL', 'F', 'AMZN', 'BA'];
    const loadPrices = async () => Promise.all(sampleWatchlist.map(ticker => stockAPI.getTickerPricesMin()));
    const tickerPrices: TickerPrice[] = [];
    loadPrices().then(promise => {
      for (let i = 0; i < promise.length; i++) {
        tickerPrices.push({ symbol: sampleWatchlist[i], companyName: getTickerName(sampleWatchlist[i]), prices: promise[i].data.prices });
        setTickerPrices(tickerPrices);
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (tickerPrices) setTickerPrices(bulkUpdatePrices(tickerPrices));
    }, 5000);
    return () => clearInterval(interval);
  }, [tickerPrices]);

  return (
    <Container className='p-3 sub-container ticker-home-sub-wrap'>
      <h2 className='sub-heading mb-3'>You may be interested in</h2>
      {tickerPrices.length > 0 ? (
        tickerPrices?.map((ticker: TickerPrice) => <Reconmended tickerPrice={ticker} key={ticker.symbol} />)
      ) : (
        <div className='mt-3 text-center'>
          <Spinner className='mb-3' animation='border' variant='dark' />
        </div>
      )}
    </Container>
  );
};

export default ReconmendedContainer;

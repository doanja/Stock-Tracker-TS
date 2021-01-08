import React, { useState, useEffect } from 'react';
import { StockService } from '../services';
import { getTickerName, bulkUpdatePrices } from '../helper';
import { MostFollowed } from './';
import { Spinner } from 'react-bootstrap';
import '../styles/main.min.css';

const MostFollowedContainer: React.FC = ({}) => {
  const stockAPI = new StockService();
  const [tickerPrices, setTickerPrices] = useState<TickerPrice[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    generateTickerPrices();
    return () => setIsMounted(false);
  }, []);

  // function to generate stock data
  const generateTickerPrices = () => {
    const sampleWatchlist = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB', 'TSLA'];
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

  if (!isMounted) return null;

  return (
    <div className='p-3 sub-container ticker-home-sub-wrap'>
      <h2 className='sub-heading mb-3'>Most followed</h2>
      {tickerPrices.length > 0 ? (
        tickerPrices?.map((ticker: TickerPrice) => <MostFollowed tickerPrice={ticker} key={ticker.symbol} />)
      ) : (
        <div className='mt-3 text-center'>
          <Spinner className='mb-3' animation='border' variant='dark' />
        </div>
      )}
    </div>
  );
};

export default MostFollowedContainer;

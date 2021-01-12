import React, { useState, useEffect } from 'react';
import { generateWatchlist, bulkUpdatePrices, generateTickerPrices } from '../helper';
import { MarketTrend } from './';
import { Spinner } from 'react-bootstrap';
import '../styles/main.min.css';

const MarketTrendsContainer: React.FC = () => {
  const [tickerPrices, setTickerPrices] = useState<TickerPrice[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const loadTickerPrices = async () => setTickerPrices(await generateTickerPrices(generateWatchlist(10)));

    loadTickerPrices();

    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (tickerPrices) setTickerPrices(bulkUpdatePrices(tickerPrices));
    }, 5000);
    return () => clearInterval(interval);
  }, [tickerPrices]);

  if (!isMounted) return null;

  return (
    <div className='p-3 sub-container ticker-home-sub-wrap flex-even'>
      <h2 className='sub-heading mb-3'>Market Trends</h2>
      {tickerPrices.length > 0 ? (
        tickerPrices?.map((ticker: TickerPrice) => <MarketTrend tickerPrice={ticker} key={ticker.symbol} />)
      ) : (
        <div className='mt-3 text-center'>
          <Spinner className='mb-3' animation='border' variant='dark' />
        </div>
      )}
    </div>
  );
};

export default MarketTrendsContainer;

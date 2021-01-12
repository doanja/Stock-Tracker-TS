import React, { useState, useEffect } from 'react';
import { bulkUpdatePrices, generateTickerPrices } from '../helper';
import { MostFollowed } from './';
import { Spinner } from 'react-bootstrap';
import '../styles/main.min.css';

const MostFollowedContainer: React.FC = ({}) => {
  const [tickerPrices, setTickerPrices] = useState<TickerPrice[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const loadTickerPrices = async () => setTickerPrices(await generateTickerPrices(['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB', 'TSLA']));

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

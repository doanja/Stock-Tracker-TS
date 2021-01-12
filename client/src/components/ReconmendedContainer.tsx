import React, { useState, useEffect } from 'react';
import { bulkUpdatePrices, generateTickerPrices } from '../helper';
import { Reconmended } from './';
import { Container, Spinner } from 'react-bootstrap';
import '../styles/main.min.css';

const ReconmendedContainer: React.FC = ({}) => {
  const [tickerPrices, setTickerPrices] = useState<TickerPrice[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    async function loadTickerPrices() {
      setTickerPrices(await generateTickerPrices(['TSLA', 'INDEX', 'AAPL', 'F', 'AMZN', 'BA']));
    }

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

import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { StockService } from '../services';
import { generateWatchlist, getTickerName } from '../helper';
import { DiscoverCard } from './';
import '../styles/main.min.css';

const DiscoverContainer: React.FC = () => {
  const stockAPI = new StockService();
  const [tickerPrices, setTickerPrices] = useState<TickerPrice[]>([]);

  useEffect(() => {
    initializeDiscoverTickers();
  }, []);

  const initializeDiscoverTickers = () => {
    const sampleWatchlist = generateWatchlist(18);
    const loadPrices = async () => Promise.all(sampleWatchlist.map(ticker => stockAPI.getTickerPrices()));
    const tickerPrices: TickerPrice[] = [];
    loadPrices().then(promise => {
      for (let i = 0; i < promise.length; i++) {
        tickerPrices.push({ symbol: sampleWatchlist[i], companyName: getTickerName(sampleWatchlist[i]), prices: promise[i].data.prices });
      }
      setTickerPrices(tickerPrices);
    });
  };

  const ref = useRef<null | HTMLDivElement>(null);

  const handleNav = (direction: string) => {
    if (ref.current !== null) {
      ref.current.scroll({
        behavior: 'smooth',
      });
      direction === 'left' ? (ref.current.scrollLeft -= 100) : (ref.current.scrollLeft += 100);
    }
  };

  return (
    <div className='mt-3 p-3 sub-container'>
      <Container>
        <h3 className='sub-heading'>Discover more</h3>
      </Container>

      <button onClick={() => handleNav('left')}> left </button>
      <button onClick={() => handleNav('right')}> right </button>

      <Container className='mt-3 discover-container' ref={ref}>
        {tickerPrices?.map((ticker: TickerPrice) => (
          <DiscoverCard ticker={ticker} key={ticker.symbol} />
        ))}
      </Container>
    </div>
  );
};

export default DiscoverContainer;

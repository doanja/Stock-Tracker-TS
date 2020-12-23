import React, { useState, useEffect, useRef } from 'react';
import { StockService } from '../services';
import { generateWatchlist, getTickerName } from '../helper';
import { DiscoverCard } from './';
import { Container, Spinner } from 'react-bootstrap';
import '../styles/main.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';

const DiscoverContainer: React.FC = () => {
  const stockAPI = new StockService();
  const [tickerPrices, setTickerPrices] = useState<TickerPrice[]>([]);
  const discContainerRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    generateTickerPrices(18);
  }, []);

  /**
   * function to pick and generate stock data for set amount of stocks
   * @param {number} number the number of stock to generate
   */
  const generateTickerPrices = (number: number) => {
    const sampleWatchlist = generateWatchlist(number);
    const loadPrices = async () => Promise.all(sampleWatchlist.map(ticker => stockAPI.getTickerPricesMin()));
    const tickerPrices: TickerPrice[] = [];
    loadPrices().then(promise => {
      for (let i = 0; i < promise.length; i++) {
        tickerPrices.push({ symbol: sampleWatchlist[i], companyName: getTickerName(sampleWatchlist[i]), prices: promise[i].data.prices });
      }
      setTickerPrices(tickerPrices);
    });
  };

  /**
   * function to navigate the scrollbar
   * @param {string} direction the direction to scroll
   */
  const shiftDiscoverContainer = (direction: string) => {
    if (discContainerRef.current !== null) {
      discContainerRef.current.scroll({
        behavior: 'smooth',
      });
      direction === 'left' ? (discContainerRef.current.scrollLeft -= 100) : (discContainerRef.current.scrollLeft += 100);
    }
  };

  return (
    <div className='mt-3 p-3 sub-container'>
      <Container>
        <h3 className='sub-heading'>Discover more</h3>
      </Container>

      {tickerPrices.length > 0 ? (
        <Container className='position-relative'>
          <FontAwesomeIcon className='scroll-icon-left icon' icon={faChevronCircleLeft} size='2x' onClick={() => shiftDiscoverContainer('left')} />
          <FontAwesomeIcon className='scroll-icon-right icon' icon={faChevronCircleRight} size='2x' onClick={() => shiftDiscoverContainer('right')} />

          <Container className='mt-3 discover-container' ref={discContainerRef}>
            {tickerPrices?.map((ticker: TickerPrice) => (
              <DiscoverCard tickerPrice={ticker} key={ticker.symbol} />
            ))}
          </Container>
        </Container>
      ) : (
        <div className='mt-3 text-center'>
          <Spinner animation='border' variant='dark' />
        </div>
      )}
    </div>
  );
};

export default DiscoverContainer;

import React, { useState, useEffect, useRef } from 'react';
import { generateWatchlist, generateTickerPrices } from '../helper';
import { DiscoverCard, CustomSpinner } from './';
import { Container } from 'react-bootstrap';
import '../styles/main.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';

interface DiscoverContainerProps {
  heading: string;
}

const DiscoverContainer: React.FC<DiscoverContainerProps> = ({ heading }) => {
  const [tickerPrices, setTickerPrices] = useState<TickerPrice[]>([]);
  const discContainerRef = useRef<null | HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const loadTickerPrices = async () => setTickerPrices(await generateTickerPrices(generateWatchlist(18)));

    loadTickerPrices();

    return () => setIsMounted(false);
  }, []);

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

  if (!isMounted) return null;

  return (
    <div className='p-3 sub-container'>
      <Container>
        <h3 className='sub-heading'>{heading}</h3>
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
        <CustomSpinner />
      )}
    </div>
  );
};

export default DiscoverContainer;

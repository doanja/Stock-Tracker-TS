import React, { useRef } from 'react';

import { WatchlistTicker } from './';
import { Container, Spinner } from 'react-bootstrap';
import '../styles/main.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';

interface WatchlistLineProps {
  watchlists: Watchlist[];
  setCurrentWatchlist: SetCurrentWatchlist;
  setIndex: SetIndex;
}

const WatchlistLine: React.FC<WatchlistLineProps> = ({ watchlists, setCurrentWatchlist, setIndex }) => {
  const discContainerRef = useRef<null | HTMLDivElement>(null);

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
    <div className='p-3 sub-container'>
      <Container>
        <h3 className='sub-heading'>Your Watchlists</h3>
      </Container>

      {watchlists.length > 0 ? (
        <Container className='position-relative'>
          <FontAwesomeIcon
            className='scroll-icon-left-watchlist icon'
            icon={faChevronCircleLeft}
            size='2x'
            onClick={() => shiftDiscoverContainer('left')}
          />
          <FontAwesomeIcon
            className='scroll-icon-right-watchlist icon'
            icon={faChevronCircleRight}
            size='2x'
            onClick={() => shiftDiscoverContainer('right')}
          />

          <Container className='mt-3 watchlist-container' ref={discContainerRef}>
            {watchlists.map((watchlist: Watchlist, index: number) => (
              <WatchlistTicker
                watchlist={watchlist}
                key={watchlist.name}
                index={index}
                setCurrentWatchlist={setCurrentWatchlist}
                setIndex={setIndex}
              />
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

export default WatchlistLine;

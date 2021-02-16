import React, { useState, useRef, Fragment } from 'react';
import { WatchlistTicker, WatchlistModal } from './';
import { Container } from 'react-bootstrap';
import '../styles/main.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faChevronCircleLeft, faPlus } from '@fortawesome/free-solid-svg-icons';

interface WatchlistLineProps {
  watchlistPrices: WatchlistPrice[];
  currentWatchlist: WatchlistPrice;
  setCurrentWatchlist: SetCurrentWatchlist;
}

const WatchlistLine: React.FC<WatchlistLineProps> = ({ watchlistPrices, currentWatchlist, setCurrentWatchlist }) => {
  // modal
  const [showModal, setShowModal] = useState(false);
  const toggleModal: ToggleModal = () => setShowModal(!showModal);

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

      <WatchlistModal
        showModal={showModal}
        toggleModal={toggleModal}
        title={'Create Watchlist'}
        placeholder={'create watchlist'}
        buttonText={'Create'}
        dispatchFunction={'createWatchlist'}
      />

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
          {watchlistPrices.length > 0 && currentWatchlist.watchlistId ? (
            <Fragment>
              {watchlistPrices.map((wl: WatchlistPrice) => (
                <WatchlistTicker
                  watchlistPrice={wl}
                  key={wl.watchlistId}
                  currentWatchlistId={currentWatchlist.watchlistId}
                  setCurrentWatchlist={setCurrentWatchlist}
                />
              ))}
            </Fragment>
          ) : null}
          <div className='watchlist-ticker' onClick={() => toggleModal()}>
            <FontAwesomeIcon className='watchlists-icon' icon={faPlus} size='1x' />
            <p className='watchlist-ticker-text'>New Watchlist</p>
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default WatchlistLine;

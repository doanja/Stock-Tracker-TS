import React, { useState, useRef } from 'react';
import { WatchlistTicker, CustomSpinner, WatchlistModal } from './';
import { Container } from 'react-bootstrap';
import '../styles/main.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faChevronCircleLeft, faPlus } from '@fortawesome/free-solid-svg-icons';

interface WatchlistLineProps {
  watchlists: Watchlist[];
  setCurrentWatchlist: SetCurrentWatchlist;
  index: number | undefined;
  setIndex: SetIndex;
}

const WatchlistLine: React.FC<WatchlistLineProps> = ({ watchlists, setCurrentWatchlist, index, setIndex }) => {
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
            {watchlists.map((watchlist: Watchlist, i: number) => (
              <WatchlistTicker
                watchlist={watchlist}
                key={i}
                index={i}
                setCurrentWatchlist={setCurrentWatchlist}
                setIndex={setIndex}
                isActive={i === index ? true : false}
              />
            ))}
            <div className='watchlist-ticker' onClick={() => toggleModal()}>
              <FontAwesomeIcon className='watchlists-icon' icon={faPlus} size='1x' />
              <p className='watchlist-ticker-text'>New Watchlist</p>
            </div>
          </Container>
        </Container>
      ) : (
        <CustomSpinner />
      )}
    </div>
  );
};

export default WatchlistLine;

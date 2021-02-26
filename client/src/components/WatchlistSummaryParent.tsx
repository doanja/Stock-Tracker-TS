import React, { Fragment, useState, useEffect } from 'react';
import { WatchlistSummaryChild, WatchlistModal, CustomSearchBarModal, WatchlistSummaryButtons, WatchlistSummaryEmpty } from './';
import { Container } from 'react-bootstrap';
import '../styles/main.min.css';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../redux/Store';

interface WatchlistSummaryParentProps {
  watchlistPrices: WatchlistPrice;
}

const WatchlistSummaryParent: React.FC<WatchlistSummaryParentProps> = ({ watchlistPrices }) => {
  // modal
  const [showModal, setShowModal] = useState(false);
  const toggleModal: ToggleModal = () => setShowModal(!showModal);

  const [showSearchModal, setShowSearchModal] = useState(false);
  const toggleSearchModal: ToggleModal = () => setShowSearchModal(!showSearchModal);

  // redux
  const { watchlists } = useSelector((state: RootStore) => state.stock);
  const dispatch = useDispatch();

  const [localTickerPrices, setLocalTickerPrices] = useState<TickerPrice[]>([]);

  useEffect(() => {
    console.log('watchlists', watchlists);
    setLocalTickerPrices(watchlistPrices.tickerPrices);
    console.log('watchlistPrices.tickerPrices', watchlistPrices.tickerPrices);
  }, [watchlists]);

  return (
    <Container className='p-3 sub-container ticker-home-sub-wrap'>
      <WatchlistModal
        showModal={showModal}
        toggleModal={toggleModal}
        title={'Update Watchlist Name'}
        placeholder={watchlistPrices.name}
        buttonText={'Update'}
        dispatchFunction={'updateWatchlistName'}
        watchlistName={watchlistPrices.name}
        watchlistId={watchlistPrices._id}
      />
      <CustomSearchBarModal toggleModal={toggleSearchModal} showModal={showSearchModal} watchlistId={watchlistPrices._id as string} />

      <WatchlistSummaryButtons watchlistPrices={watchlistPrices} toggleSearchModal={toggleSearchModal} toggleModal={toggleModal} />

      {watchlistPrices && watchlistPrices.tickerPrices.length > 0 ? (
        <Fragment>
          {watchlistPrices.tickerPrices.map((price: TickerPrice) => (
            <WatchlistSummaryChild tickerPrice={price} key={price.companyName} watchlistId={watchlistPrices._id} />
          ))}
        </Fragment>
      ) : (
        <WatchlistSummaryEmpty toggleSearchModal={toggleSearchModal} />
      )}
    </Container>
  );
};

export default WatchlistSummaryParent;

import React from 'react';
import { WatchlistSummary, CustomSpinner } from './';
import { Container } from 'react-bootstrap';
import '../styles/main.min.css';

interface WatchlistSummaryContainerProps {
  watchlist: Watchlist | undefined;
  watchlistPrices: TickerPrice[];
  index: number;
}

const WatchlistSummaryContainer: React.FC<WatchlistSummaryContainerProps> = ({ watchlist, watchlistPrices, index }) => {
  return (
    <Container className='p-3 sub-container ticker-home-sub-wrap'>
      <h2 className='sub-heading mb-3'>{watchlist?.name}</h2>
      {watchlistPrices ? (
        watchlistPrices.map((price: TickerPrice) => <WatchlistSummary tickerPrice={price} key={price.symbol} index={index} />)
      ) : (
        <CustomSpinner />
      )}
    </Container>
  );
};

export default WatchlistSummaryContainer;

import React from 'react';
import { WatchlistSummary } from './';
import { Container, Spinner } from 'react-bootstrap';
import '../styles/main.min.css';

interface WatchlistSummaryContainerProps {
  watchlist: Watchlist;
  watchlistPrices: TickerPrice[];
}

const WatchlistSummaryContainer: React.FC<WatchlistSummaryContainerProps> = ({ watchlist, watchlistPrices }) => {
  return (
    <Container className='p-3 sub-container ticker-home-sub-wrap'>
      <h2 className='sub-heading mb-3'>{watchlist?.name}</h2>
      <div className='watchlist-summary-container'>
        {watchlistPrices ? (
          watchlistPrices.map((price: TickerPrice) => <WatchlistSummary tickerPrice={price} key={price.symbol} />)
        ) : (
          <div className='mt-3 text-center'>
            <Spinner className='mb-3' animation='border' variant='dark' />
          </div>
        )}
      </div>
    </Container>
  );
};

export default WatchlistSummaryContainer;

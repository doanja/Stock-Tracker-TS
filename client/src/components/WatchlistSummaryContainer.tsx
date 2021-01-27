import React from 'react';

interface WatchlistSummaryContainerProps {
  watchlist: Watchlist | undefined;
}

const WatchlistSummaryContainer: React.FC<WatchlistSummaryContainerProps> = ({ watchlist }) => {
  return <h1>{watchlist?.name}</h1>;
};

export default WatchlistSummaryContainer;

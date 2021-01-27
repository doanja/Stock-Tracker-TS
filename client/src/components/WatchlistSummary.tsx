import React from 'react';

interface WatchlistSummaryProps {
  watchlist: Watchlist;
}

const WatchlistSummary: React.FC<WatchlistSummaryProps> = ({ watchlist }) => {
  return <h1>{watchlist.name}</h1>;
};
export default WatchlistSummary;

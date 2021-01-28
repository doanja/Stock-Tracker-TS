import React from 'react';

interface WatchlistSummaryProps {
  tickerPrice: TickerPrice;
}

const WatchlistSummary: React.FC<WatchlistSummaryProps> = ({ tickerPrice }) => {
  return <div className='watchlist-summary-child'>{tickerPrice.companyName}</div>;
};
export default WatchlistSummary;

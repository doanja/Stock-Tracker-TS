import React from 'react';
import { TickerLineContainer, SaveButton, TickerContainer, CustomSpinner } from './';

interface TickerContainerWrapProps {
  watchlistPrices: WatchlistPrice[];
  currentTicker: string;
  currentTickerPrice: TickerPrice;
}

const TickerContainerWrap: React.FC<TickerContainerWrapProps> = ({ watchlistPrices, currentTicker, currentTickerPrice }) => {
  return (
    <div>
      {watchlistPrices.length > 0 ? (
        <TickerLineContainer tickerPrices={watchlistPrices[watchlistPrices.length - 1].tickerPrices} />
      ) : (
        <CustomSpinner />
      )}
      <SaveButton ticker={currentTicker} />
      <TickerContainer tickerPrice={currentTickerPrice} ticker={currentTicker} />
    </div>
  );
};
export default TickerContainerWrap;

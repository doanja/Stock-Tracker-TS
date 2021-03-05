import React, { Fragment } from 'react';
import { TickerLineContainer, TickerSaveButton, TickerContainer, CustomSpinner } from './';
import '../styles/main.min.css';

interface TickerContainerWrapProps {
  currentWatchlistPrice: WatchlistPrice | null;
  currentTicker: string;
  currentTickerPrice: TickerPrice;
}

const TickerContainerWrap: React.FC<TickerContainerWrapProps> = ({ currentWatchlistPrice, currentTicker, currentTickerPrice }) => {
  return (
    <Fragment>
      {currentWatchlistPrice && currentWatchlistPrice.tickerPrices.length > 0 ? (
        <TickerLineContainer tickerPrices={currentWatchlistPrice.tickerPrices} />
      ) : null}
      <TickerSaveButton ticker={currentTicker} />
      <TickerContainer tickerPrice={currentTickerPrice} ticker={currentTicker} />
    </Fragment>
  );
};
export default TickerContainerWrap;

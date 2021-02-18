import React, { Fragment } from 'react';
import { TickerLineContainer, TickerSaveButton, TickerContainer, CustomSpinner } from './';
import '../styles/main.min.css';

interface TickerContainerWrapProps {
  watchlistPrices: WatchlistPrice[];
  currentTicker: string;
  currentTickerPrice: TickerPrice;
}

const TickerContainerWrap: React.FC<TickerContainerWrapProps> = ({ watchlistPrices, currentTicker, currentTickerPrice }) => {
  return (
    <Fragment>
      {watchlistPrices.length > 0 ? (
        <TickerLineContainer tickerPrices={watchlistPrices[watchlistPrices.length - 1].tickerPrices} />
      ) : (
        <CustomSpinner />
      )}
      <TickerSaveButton ticker={currentTicker} />
      <TickerContainer tickerPrice={currentTickerPrice} ticker={currentTicker} />
    </Fragment>
  );
};
export default TickerContainerWrap;

import React, { useState, useEffect, useReducer } from 'react';
import { TickerHeader, TickerPrice, TickerGraphButtons, Graph } from './';
import '../styles/ticker.min.css';
import { parseArr, generateTimstamps } from '../helper';

interface TickerContainerProps {
  tickerPrice: TickerPrice;
  ticker: string;
}

const TickerContainer: React.FC<TickerContainerProps> = ({ tickerPrice, ticker }) => {
  const [timeframe, setTimeframe] = useState('1D');
  const currentPrices: number[] = tickerPrice.prices.map(a => a.price);

  const initialState = {
    labels: [],
    datasets: [{ data: [] }],
  };

  function reducer(state: any, action: any) {
    switch (action.type) {
      case '1D':
        return { labels: generateTimstamps(24, 30, 'minutes'), datasets: [{ data: currentPrices }] };
      case '5D':
        return { labels: generateTimstamps(60, 2, 'hours'), datasets: [{ data: parseArr(currentPrices, 4) }] };
      case '1M':
        return { labels: generateTimstamps(30, 1, 'day'), datasets: [{ data: parseArr(currentPrices, 48) }] };
      case '6M':
        return { labels: generateTimstamps(24, 1, 'week'), datasets: [{ data: parseArr(currentPrices, 48) }] };
      case '1Y':
        return { labels: generateTimstamps(48, 1, 'week'), datasets: [{ data: parseArr(currentPrices, 48) }] };
      case '5Y':
        return { labels: generateTimstamps(20, 4, 'months'), datasets: [{ data: parseArr(currentPrices, 360) }] };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: timeframe });
  }, [timeframe, ticker]);

  return (
    <div className='mt-3 p-3 ticker-container'>
      <TickerHeader tickerPrice={tickerPrice} />
      <TickerPrice tickerPrice={tickerPrice} />
      <TickerGraphButtons timeframe={timeframe} setTimeframe={setTimeframe} />
      <Graph chartData={state} />
    </div>
  );
};

export default TickerContainer;

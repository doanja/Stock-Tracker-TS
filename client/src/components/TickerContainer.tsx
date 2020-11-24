import React, { useState, useEffect, useReducer } from 'react';
import { TickerHeader, TickerPrice, TickerGraphButtons, Graph } from './';
import '../styles/ticker.min.css';
import { parseArr, generateTimstamps } from '../helper';

interface TickerContainerProps {
  tickerPrice: TickerPrice;
}

const TickerContainer: React.FC<TickerContainerProps> = ({ tickerPrice }) => {
  const [timeframe, setTimeframe] = useState('1D');
  const currentPrices: number[] = tickerPrice.prices.map(a => a.price);

  const initialState = {
    labels: [],
    datasets: [{ data: [] }],
  };

  // 1 data point = 30min
  // 2 data points = 1 hour
  // 48 data points = 1 day
  // 336 data points = 1 week
  // 1440 data points = 1 month

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

  // TODO: fixed issue where selecting different ticker would not update chart
  useEffect(() => {
    dispatch({ type: timeframe });
  }, [timeframe]);

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

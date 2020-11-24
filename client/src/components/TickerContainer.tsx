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

  function reducer(state: any, action: any) {
    switch (action.type) {
      case '1D':
        return { labels: generateTimstamps(24, 30, 'minutes'), datasets: [{ data: currentPrices.slice(0, 24) }] };
      case '5D':
        return { labels: new Array(60).fill('X'), datasets: [{ data: currentPrices.slice(0, 60) }] };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: timeframe });
  }, [timeframe]);

  useEffect(() => {
    console.log('generateTimstamps :>> ', generateTimstamps(24, 30, 'minutes'));
  }, []);

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

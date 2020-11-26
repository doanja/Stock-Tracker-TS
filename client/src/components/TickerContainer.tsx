import React, { useState, useEffect, useReducer } from 'react';
import { TickerHeader, TickerPrice, TickerGraphButtons, Graph } from './';
import { parseArr, generateTimstamps, getFirstAndLastValues } from '../helper';
import '../styles/ticker.min.css';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setTickerPriceChange } from '../redux/actions/stockActions';
import { RootStore } from '../redux/Store';

interface TickerContainerProps {
  tickerPrice: TickerPrice;
  ticker: string;
}

const TickerContainer: React.FC<TickerContainerProps> = ({ tickerPrice, ticker }) => {
  // redux
  const { tickerPriceChange } = useSelector((state: RootStore) => state.stock);
  const dispatch = useDispatch();

  const [timeframe, setTimeframe] = useState('1D');
  const currentPrices: number[] = tickerPrice.prices.map(a => a.price);

  const initialState: ChartData = {
    labels: [],
    datasets: [{ data: [] }],
  };

  const reducer = (state: any, action: any) => {
    let data = [];
    switch (action.type) {
      case '1D':
        data = currentPrices.slice(0, 24);
        dispatch(setTickerPriceChange(getFirstAndLastValues(data)));
        return { labels: generateTimstamps(24, 30, 'minutes'), datasets: [{ data }] };
      case '5D':
        data = parseArr(currentPrices, 4).slice(0, 60);
        dispatch(setTickerPriceChange(getFirstAndLastValues(data)));
        return { labels: generateTimstamps(60, 2, 'hours'), datasets: [{ data }] };
      case '1M':
        data = parseArr(currentPrices, 48).slice(0, 30);
        dispatch(setTickerPriceChange(getFirstAndLastValues(data)));
        return { labels: generateTimstamps(30, 1, 'day'), datasets: [{ data }] };
      case '6M':
        data = parseArr(currentPrices, 48).slice(0, 24);
        dispatch(setTickerPriceChange(getFirstAndLastValues(data)));
        return { labels: generateTimstamps(24, 1, 'week'), datasets: [{ data }] };
      case '1Y':
        data = parseArr(currentPrices, 48).slice(0, 48);
        dispatch(setTickerPriceChange(getFirstAndLastValues(data)));
        return { labels: generateTimstamps(48, 1, 'week'), datasets: [{ data }] };
      case '5Y':
        data = parseArr(currentPrices, 360).slice(0, 20);
        dispatch(setTickerPriceChange(getFirstAndLastValues(data)));
        return { labels: generateTimstamps(20, 4, 'months'), datasets: [{ data }] };
      default:
        return state;
    }
  };

  const [chartData, dispatchChartAction] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatchChartAction({ type: timeframe });
  }, [timeframe, ticker]);

  return (
    <div className='mt-3 p-3 ticker-container'>
      <TickerHeader tickerPrice={tickerPrice} />
      <TickerPrice tickerPrice={tickerPrice} tickerPriceChange={tickerPriceChange} timeframe={timeframe} />
      <TickerGraphButtons timeframe={timeframe} setTimeframe={setTimeframe} />
      <Graph chartData={chartData} tickerPriceChange={tickerPriceChange} />
    </div>
  );
};

export default TickerContainer;

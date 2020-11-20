import React, { useState, useEffect } from 'react';
import { TickerHeader, TickerPrice, TickerGraphButtons, Graph } from './';
import '../styles/ticker.min.css';
import { parseArr } from '../helper';

interface TickerContainerProps {
  tickerPrice: TickerPrice;
}

const TickerContainer: React.FC<TickerContainerProps> = ({ tickerPrice }) => {
  const [timeframe, setTimeframe] = useState('1D');
  const currentPrices: number[] = tickerPrice.prices.map(a => a.price);
  let data: number[] = currentPrices.slice(0, 24);

  const chartData: ChartData = {
    datasets: [
      {
        data,
      },
    ],
    labels: [],
  };

  useEffect(() => {
    chartData.datasets[0].data = parseArr(currentPrices, 24);
  }, [timeframe]);

  return (
    <div className='mt-3 p-3 ticker-container'>
      <TickerHeader tickerPrice={tickerPrice} />
      <TickerPrice tickerPrice={tickerPrice} />
      <TickerGraphButtons timeframe={timeframe} setTimeframe={setTimeframe} />
      <Graph chartData={chartData} />
    </div>
  );
};

export default TickerContainer;

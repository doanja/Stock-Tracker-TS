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
  let data: number[] = currentPrices.slice(0, 25);
  const labels: string[] = [];

  for (let i = 0; i < 25; i++) {
    labels.push(`${i}`);
  }

  const chartData: ChartData = {
    labels,
    datasets: [
      {
        data,
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  // useEffect(() => {
  //   chartData.datasets[0].data = parseArr(currentPrices, 24);

  //   let a: string[] = [];
  //   for (let i = 0; i < 76; i++) {
  //     a.push(`${i}`);
  //   }

  //   chartData.labels = [...a];
  // }, [timeframe]);

  return (
    <div className='mt-3 p-3 ticker-container'>
      <TickerHeader tickerPrice={tickerPrice} />
      <TickerPrice tickerPrice={tickerPrice} />
      <TickerGraphButtons timeframe={timeframe} setTimeframe={setTimeframe} />
      {/* <Graph chartData={test} /> */}

      <Graph chartData={chartData} />
    </div>
  );
};

export default TickerContainer;

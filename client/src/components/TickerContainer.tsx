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

  const chartData: ChartData = {
    labels: new Array(25).fill('X'),
    datasets: [
      {
        data: currentPrices.slice(0, 25),
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const setChartData = (labels: string[], data: number[]) => {
    chartData.labels = [...labels];
    chartData.datasets[0].data = [...data];
  };

  useEffect(() => {
    switch (timeframe) {
      case '1D':
        setChartData(new Array(25).fill('X'), currentPrices.slice(0, 25));
        break;
      default:
    }
  }, [timeframe]);

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

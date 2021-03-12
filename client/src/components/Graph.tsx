import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';

interface GraphProps {
  chartData: ChartData;
  tickerPriceChange: TickerPriceChange;
}

const Graph: React.FC<GraphProps> = ({ chartData, tickerPriceChange }) => {
  useEffect(() => {
    if (tickerPriceChange.price > 0) {
      chartData.datasets[0].borderColor = 'rgb(19, 115, 51)';
      chartData.datasets[0].backgroundColor = 'rgb(92, 184, 92, 0.25)';
    } else {
      chartData.datasets[0].borderColor = 'rgb(165, 14, 14)';
      chartData.datasets[0].backgroundColor = 'rgb(217, 83, 79, 0.25)';
    }
  }, [chartData, tickerPriceChange]);

  const options = {
    title: { display: false },
    legend: { labels: { fontColor: '#fff' }, display: false },
    scales: {
      yAxes: [{ ticks: { fontColor: '#828282', autoSkip: true, maxTicksLimit: 5 }, gridLines: { display: true, color: '#f4edee' } }],
      xAxes: [
        { type: 'time', ticks: { display: true, autoSkip: true, maxTicksLimit: 5, maxRotation: 0, minRotation: 0 }, gridLines: { display: false } },
      ],
    },
    maintainAspectRatio: true,
    animation: {
      duration: 0,
    },
  };

  return <Line data={chartData} height={50} options={options} />;
};

export default Graph;

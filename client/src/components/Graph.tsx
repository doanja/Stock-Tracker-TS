import React from 'react';
import { Line } from 'react-chartjs-2';

interface GraphProps {
  chartData: ChartData;
}

const Graph: React.FC<GraphProps> = ({ chartData }) => {
  const options = {
    title: { display: false },
    legend: { labels: { fontColor: '#fff' }, display: false },
    scales: {
      yAxes: [{ ticks: { fontColor: '#828282' }, gridLines: { display: true, color: '#f4edee' } }],
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

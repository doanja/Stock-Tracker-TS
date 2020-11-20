import React from 'react';
import { Line } from 'react-chartjs-2';

interface GraphProps {
  chartData: ChartData;
}

const Graph: React.FC<GraphProps> = ({ chartData }) => {
  console.log('chartData :>> ', chartData);

  const options = {
    title: {
      display: true,
      text: chartData.datasets[0].label,
      fontSize: 25,
      fontColor: '#fff',
    },
    legend: { labels: { fontColor: '#fff' }, display: false },
    scales: {
      yAxes: [{ ticks: { fontColor: '#fff' }, gridLines: { display: true, color: '#25425f' } }],
      xAxes: [
        {
          ticks: { fontColor: '#fff', display: false },
          gridLines: { display: true, color: '#25425f' },
        },
      ],
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: '50vh' }}>
      <Line data={chartData} height={50} options={options} />
    </div>
  );
};

export default Graph;

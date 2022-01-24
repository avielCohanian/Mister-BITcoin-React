import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const ChartStatistic = ({ values }) => {
  const [marketPrice, setMarketPrice] = useState([]);
  const [data1, setData1] = useState(null);
  const [options1, setOptions1] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
  });

  useEffect(() => {
    (async () => {
      if (values) setMarketPrice(values);
    })();
  }, []);

  useEffect(() => {
    if (marketPrice) {
      const labels = marketPrice.map((item) => new Date(item.x * 1000).toLocaleDateString());
      const data = {
        labels: labels,
        datasets: [
          {
            label: 'BTC Rate ',
            data: marketPrice.map((item) => item.y),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };
      setData1(data);
    }
  }, [marketPrice]);

  return (
    <div className="statistic-page">
      <div className="chart-box">{data1 ? <Line className="chart" options={options1} data={data1} /> : ''}</div>
    </div>
  );
};

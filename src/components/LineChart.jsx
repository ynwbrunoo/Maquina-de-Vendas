import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const options = {
  plugins: {
    legend: true
  },
  scales: {
    y: {
      min: 0,
    }
  }
}

function LineChart({ chartDadosMessages }) {
  return <Line data={chartDadosMessages} options={options} />;
}

export default LineChart;

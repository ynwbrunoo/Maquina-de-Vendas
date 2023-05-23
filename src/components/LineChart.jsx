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

function LineChart({ chartDadosMessages, chartOptions }) {
  return <Line data={chartDadosMessages} options={chartOptions} />;
}

export default LineChart;

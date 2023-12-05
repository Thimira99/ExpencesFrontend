"use client";

import React from "react";
import { Bar } from "react-chartjs-2";

import { Chart as ChartJS } from "chart.js/auto";

export const BarChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Spending",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: Object.values(data),
      },
    ],
  };

  return <Bar data={chartData} />;
};

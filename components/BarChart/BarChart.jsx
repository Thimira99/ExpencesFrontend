"use client";

import React from "react";
import { Bar } from "react-chartjs-2";

import { Chart as ChartJS } from "chart.js/auto";
import { colors } from "@/constants/colors";

export const BarChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Spending",
        backgroundColor: colors.backgroundColour,
        borderColor: colors.borderColor,
        borderWidth: 1,
        hoverBackgroundColor: colors.hoverBackgroundColor,
        hoverBorderColor: colors.hoverBorderColor,
        data: Object.values(data),
      },
    ],
  };

  return <Bar data={chartData} />;
};

// Author: Yatrik Pravinbhai Amrutiya
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const passingData = {
  labels: ["Students Passing", "Students Failing"],
  datasets: [
    {
      data: [75, 25],
      backgroundColor: ["rgba(255, 0, 0, 0.6)", "rgba(0, 255, 0, 0.6)"],
      borderColor: ["rgba(255, 0, 0, 1)", "rgba(0, 255, 0, 1)"],
      borderWidth: 1,
    },
  ],
};

export const gradeDistributionData = {
  labels: ["A", "B", "C", "D", "F"],
  datasets: [
    {
      data: [15, 30, 25, 10, 20],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const chartOptions = {
  plugins: {
    title: {
      display: true,
      text: "Students Passing Statistics",
      font: {
        size: 14,
        weight: "bold",
      },
    },
  },
};

function Analytics() {
  return (
    <div
      style={{ backgroundColor: "#f5f5f5" }}
      className="d-flex flex-column analytics"
    >
      <div className="Headers mt-1">Analytics</div>
      <div className=" analytics-container">
        <div  className="analytics-figures">
            Students passing/failing statistics
          <Doughnut data={passingData} options={chartOptions} />
        </div>
        <div 
        className="analytics-figures analytic-figure-2"
        >
       Grade distribution statistics
          <Doughnut
            data={gradeDistributionData}
            options={{
              ...chartOptions,
              plugins: { title: { text: "Grade Statistics" } },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Analytics;

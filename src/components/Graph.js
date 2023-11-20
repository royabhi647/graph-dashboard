import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const options = {
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: false,
    },
  },
};

const Graph = ({ amounts }) => {
  const labels = Object.keys(amounts).map((key) =>
    key.replace("category_", "Category ")
  );
  console.log("labels", labels);
  const dataValues = Object.values(amounts);
  console.log("dataVAlues", dataValues);

  const data = {
    labels,
    datasets: [
      {
        label: "Amount",
        data: dataValues,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Bar data={data} options={options} />;
};

export default Graph;

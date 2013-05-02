import React from "react";
import { Bar } from "react-chartjs-2";

export default function BarGraph(props) {
  const getGraphData = () => {
    const labels = props.data.map(e => e.LGA);
    const data = props.data.map(e => e.total);

    return {
      labels: labels,
      datasets: [
        {
          label: "Total",
          data: data,
          backgroundColor: "red"
        }
      ]
    };
  };

  return <Bar data={getGraphData} />;
}

import React from "react";
import { HorizontalBar } from "react-chartjs-2";

export default function GraphWrapper(props) {
  const getGraphData = () => {
    const labels = props.data.map(e => e.LGA);
    const data = props.data.map(e => e.total);

    return {
      labels: labels,
      datasets: [
        {
          label: "Total",
          data: data,
          backgroundColor: "#25e3ed"
        }
      ]
    };
  };

  return <HorizontalBar data={getGraphData} height={1000} options={{maintainAspectRatio: false}}/>;
  
}

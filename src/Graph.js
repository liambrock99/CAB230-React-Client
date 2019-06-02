import React from "react";
import { HorizontalBar } from "react-chartjs-2";

/**
 * A wrapper for react-chart-js-2  <HorizontalBar>
 * Ensures data passed to the chart is valid
 */
export default function GraphWrapper(props) {
  const getGraphData = () => {
    // Format search results
    const labels = props.data.map(e => e.LGA);
    const data = props.data.map(e => e.total);

    // Return object to be passed to <HorizontalBar>
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

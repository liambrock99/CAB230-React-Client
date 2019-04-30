import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

export function BarGraph(props) {
  const [graphData, setGraphData] = useState({});

  const getColors = () => {
    const colors = [];
    const pallette = ["#19E8FF", "#FF428D"];
    let previous = 0;

    for (let x = 0; x < props.data.length; x++) {
      let r = Math.round(Math.random());

      while (r === previous) {
        r = Math.round(Math.random());
      }

      previous = r;
      colors.push(pallette[r]);
    }
    return colors;
  };

  const onClick = () => {
    if (props.data.length === 0) {
      alert("Please make a query first.");
      return;
    }
    const labels = props.data.map(e => e.LGA);
    const data = props.data.map(e => e.total);
    const colors = getColors();

    setGraphData({
      labels: labels,
      datasets: [
        {
          label: "Total",
          data: data,
          backgroundColor: colors
        }
      ]
    });
  };

  return (
    <div>
      <button onClick={onClick}>Graph</button>
      <Bar data={graphData} />
    </div>
  );
}

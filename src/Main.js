import React, { useState } from "react";
import MapWrapper from "./Map.js";
import BarGraph from "./Graph";
import Search from "./Search.js";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

export default function Main(props) {
  const [searchResults, setSearchResults] = useState([]);
  const [displayMap, setDisplayMap] = useState(false);
  const [displayGraph, setDisplayGraph] = useState(false);

  const graph = () => {
    setDisplayMap(false);
    setDisplayGraph(true);
  };

  const map = () => {
    setDisplayGraph(false);
    setDisplayMap(true);
  };

  const table_columns = [
    {
      Header: "Area",
      accessor: "LGA"
    },
    {
      Header: "Total",
      accessor: "total"
    }
  ];

  return (
    <div>
      <h1 id="title" class="font center-text">
        Queensland Crime Statistics Database
      </h1>
      <button onClick={props.onLogout} class="pure-button logout-btn">
        Logout
      </button>
     
      <Search _token={props.token} getResults={setSearchResults} />
      <ReactTable
        data={searchResults}
        columns={table_columns}
        style={{ width: "80%", margin: "auto" }}
      />
      <div class="center-text">
        <button onClick={graph} class="pure-button">
          Graph
        </button>
        <button onClick={map} class="pure-button">
          Map
        </button>
      </div>
      {displayMap && <MapWrapper data={searchResults} />}
      {displayGraph && <BarGraph data={searchResults} />}
    </div>
  );
}

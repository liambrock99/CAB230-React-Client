import React, { useState } from "react";
import MapWrapper from "./Map.js";
import GraphWrapper from "./Graph";
import Search from "./Search.js";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default function Main(props) {
  const [searchResults, setSearchResults] = useState([]);

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

      <Tabs style={{ width: "80%", margin: "auto" }}>
        <TabList>
          <Tab>Table View</Tab>
          <Tab>Map View</Tab>
          <Tab>Graph View</Tab>
        </TabList>
        <TabPanel>
          <ReactTable
            data={searchResults}
            columns={table_columns}
          />
        </TabPanel>
        <TabPanel>
          <MapWrapper
            data={searchResults}
            style={{ height: "800px"}}
            zoom={4}
            center={[-25.73, 134.48]}
          />
        </TabPanel>
        <TabPanel>
          <GraphWrapper data={searchResults} />
        </TabPanel>
      </Tabs>
    </div>
  );
}

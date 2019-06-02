import React, { useState } from "react";
import MapWrapper from "./Map.js";
import GraphWrapper from "./Graph";
import Search from "./Search.js";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

/**
 * Renders the Main page of the application.
 * 
 * @param {} props - token prop (JWT for user authentication in <Search>)
 */
export default function Main(props) {
  // Search results passed up from <Search>
  const [searchResults, setSearchResults] = useState([]);

  // Table columns for <ReactTable>
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
      <h1 id="title" className="font center-text">
        Queensland Crime Statistics Database
      </h1>

      <button onClick={props.onLogout} className="pure-button logout-btn">
        Logout
      </button>

      <Search _token={props.token} getResults={setSearchResults} />

      {/** Render <ReactTable>, <MapWrapper>, <GraphWrapper> in Tabs */}
      <Tabs style={{ margin: "auto", width: "90%" }}>
        <TabList>
          <Tab>Table View</Tab>
          <Tab>Map View</Tab>
          <Tab>Graph View</Tab>
        </TabList>
        <TabPanel>
          <ReactTable data={searchResults} columns={table_columns} />
        </TabPanel>
        <TabPanel>
          <MapWrapper
            data={searchResults}
            style={{ height: "800px" }}
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

import React, { useState } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {
  OffenceSelect,
  AreaSelect,
  AgeSelect,
  GenderSelect,
  YearSelect,
  MonthSelect
} from "./Select.js";

export default function Search(props) {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [selectedOffence, setSelectedOffence] = useState("");
  const [selectedAreas, setSelectedAreas] = useState("");
  const [selectedAges, setSelectedAges] = useState("");
  const [selectedGenders, setSelectedGenders] = useState("");
  const [selectedYears, setSelectedYears] = useState("");
  const [selectedMonths, setSelectedMonths] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    const params = {
      method: "GET",
      headers: { Authorization: `Bearer ${props._token}` }
    };

    const url = `https://localhost:443/search?offence=${selectedOffence}&area=${selectedAreas}&age=${selectedAges}&gender=${selectedGenders}&year=${selectedYears}&month=${selectedMonths}`;

    fetch(encodeURI(url), params)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        res.json().then(res => setError(res.error)).catch(err => console.log(err.message));
        throw new Error(`Network response was not OK:  ${res.status}`);
      })
      .then(res => {
        setError(null);
        console.log(res);
        props.getResults(res.result);
        setResults(res.result);
      })
      .catch(err => {
        console.log(
          `There has been a problem with your fetch operation - ${err.message}`
        );
      });
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
      <form
        onSubmit={handleSubmit}
        style={{ "text-align": "center", "margin-bottom": "20px" }}
      >
        <div>
          <OffenceSelect getSelected={setSelectedOffence} />
          <AreaSelect getSelected={setSelectedAreas} />
        </div>
        <div>
          <AgeSelect getSelected={setSelectedAges} />
          <GenderSelect getSelected={setSelectedGenders} />
        </div>
        <div>
          <YearSelect getSelected={setSelectedYears} />
          <MonthSelect getSelected={setSelectedMonths} />
        </div>
        <input
          type="submit"
          value="Search"
          style={{ width: "80%" }}
          class="pure-button pure-button-primary"
        />
      </form>

      {error !== null && <div class="form-error center-text">{error}</div>}

      <ReactTable
        data={results}
        columns={table_columns}
        style={{ width: "80%", margin: "auto" }}
      />
    </div>
  );
}

import React, { useState } from "react";
import { Table } from "./Table.js";
import { BarGraph } from "./Graphs.js";
import {
  OffenceSelect,
  AreaSelect,
  AgeSelect,
  GenderSelect,
  YearSelect,
  MonthSelect
} from "./Select.js";

export function Search(props) {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [selectedOffence, setSelectedOffence] = useState('');
  const [selectedAreas, setSelectedAreas] = useState('');
  const [selectedAges, setSelectedAges] = useState('');
  const [selectedGenders, setSelectedGenders] = useState('');
  const [selectedYears, setSelectedYears] = useState('');
  const [selectedMonths, setSelectedMonths] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (selectedOffence === '') {
      alert('Please select an offence.')
      return;
    }
    const params = {
      method: "GET",
      headers: { Authorization: `Bearer ${props._token}` }
    };
    const url = `https://cab230.hackhouse.sh/search?offence=${selectedOffence}&area=${selectedAreas}&age=${selectedAges}&gender=${selectedGenders}&year=${selectedYears}&month=${selectedMonths}`;
    fetch(encodeURI(url), params)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        res.json().then(res => setError(res.error));
        throw new Error(`Network response was not OK:  ${res.status}`);
      })
      .then(res => {
        setError(null);
        console.log(res);
        setResults(res.result);
      })
      .catch(err => {
        console.log(
          `There has been a problem with your fetch operation: ${err.message}`
        );
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <OffenceSelect getSelected={setSelectedOffence} />
        <AreaSelect getSelected={setSelectedAreas} />
        <AgeSelect getSelected={setSelectedAges} />
        <GenderSelect getSelected={setSelectedGenders} />
        <YearSelect getSelected={setSelectedYears} />
        <MonthSelect getSelected={setSelectedMonths} />
        <input type="submit" value="Search" />
      </form>
      {results.length === 0 ? <div>Make a query to get started.</div> : <Table data={results}/>}
    </div>
  );
}

import React, { useState } from "react";
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

    const query_params = `offence=${selectedOffence}&area=${selectedAreas}&age=${selectedAges}&gender=${selectedGenders}&year=${selectedYears}&month=${selectedMonths}`;
    const url = "https://cab230.hackhouse.sh/search?" + query_params;

    fetch(encodeURI(url), params)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 400 || res.status === 401) {
          res
            .json()
            .then(res => setError(res.message))
            .catch(err => console.log(err.message));
        }
        throw new Error(`Network response was not OK:  ${res.status}`);
      })
      .then(res => {
        setError(null);
        console.log(res);
        const results = res.result.filter(e => e.total > 0);
        props.getResults(results);
      })
      .catch(err => {
        console.log(
          `There has been a problem with your fetch operation - ${err.message}`
        );
      });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ textAlign: "center", marginBottom: "20px" }}
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
          className="pure-button pure-button-primary"
        />
      </form>

      {error !== null && <div className="form-error center-text">{error}</div>}
    </div>
  );
}

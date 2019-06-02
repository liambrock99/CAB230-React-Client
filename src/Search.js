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

/**
 * Renders a form that accepts search parameters through dropdowns
 * Fetches the /search endpoint with JWT authentication
 * Search results are passed to the parent component through props
 */
export default function Search(props) {
  /**
   * Store user selection in state
   * from <Select> wrappers
   */
  const [selectedOffence, setSelectedOffence] = useState("");
  const [selectedAreas, setSelectedAreas] = useState("");
  const [selectedAges, setSelectedAges] = useState("");
  const [selectedGenders, setSelectedGenders] = useState("");
  const [selectedYears, setSelectedYears] = useState("");
  const [selectedMonths, setSelectedMonths] = useState("");
  const [error, setError] = useState(null);


  const handleSubmit = e => {
    e.preventDefault();
    
    // Include Authorization header for authentication
    const params = {
      method: "GET",
      headers: { Authorization: `Bearer ${props._token}` }
    };

    // Construct the query
    const query_params = `offence=${selectedOffence}&area=${selectedAreas}&age=${selectedAges}&gender=${selectedGenders}&year=${selectedYears}&month=${selectedMonths}`;
    const url = "https://localhost:443/search?" + query_params;

    fetch(encodeURI(url), params)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 400 || res.status === 401) { //  Check for HTTP code 400/401 which contain useful messages
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
        const results = res.result.filter(e => e.total > 0); // Filter out search results where total offences = 0
        props.getResults(results); // Pass search results up to <Main>
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

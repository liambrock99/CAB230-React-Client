import React, { useState } from "react";

export function ApiButtons() {
  return (
    <div>
      <Offences />
      <Areas />
      <Ages />
      <Genders />
      <Years />
    </div>
  );
}

function getEndpoint(endpoint) {
  return fetch(`https://cab230.hackhouse.sh/${endpoint}`)
    .then(res => res.json())
    .then(res => res[`${endpoint}`]);
}

function Offences() {
  const [offences, setOffences] = useState([]);
  const [error, setError] = useState(null);

  const handleClick = () => {
    getEndpoint("offences")
      .then(res => setOffences(res.join(", ")))
      .catch(e => {
        setError(e);
        console.log(e);
      });
  };

  return (
    <div>
      <button onClick={handleClick}>Offences</button>
      {error == null ? <div>{offences}</div> : <div>{error}</div>}
    </div>
  );
}

function Areas() {
  const [areas, setAreas] = useState([]);
  const [error, setError] = useState(null);

  const handleClick = () => {
    getEndpoint("areas")
      .then(res => setAreas(res.join(", ")))
      .catch(e => {
        setError(e);
        console.log(e);
      });
  };

  return (
    <div>
      <button onClick={handleClick}>Areas</button>
      {error == null ? <div>{areas}</div> : <div>{error}</div>}
    </div>
  );
}

function Ages() {
  const [ages, setAges] = useState([]);
  const [error, setError] = useState(null);

  const handleClick = () => {
    getEndpoint("ages")
      .then(res => setAges(res.join(", ")))
      .catch(e => {
        setError(e);
        console.log(e);
      });
  };

  return (
    <div>
      <button onClick={handleClick}>Ages</button>
      {error == null ? <div>{ages}</div> : <div>{error}</div>}
    </div>
  );
}

function Genders() {
  const [genders, setGenders] = useState([]);
  const [error, setError] = useState(null);

  const handleClick = () => {
    getEndpoint("genders")
      .then(res => setGenders(res.join(", ")))
      .catch(e => {
        setError(e);
        console.log(e);
      });
  };

  return (
    <div>
      <button onClick={handleClick}>Genders</button>
      {error == null ? <div>{genders}</div> : <div>{error}</div>}
    </div>
  );
}

function Years() {
  const [years, setYears] = useState([]);
  const [error, setError] = useState(null);

  const handleClick = () => {
    getEndpoint("years")
      .then(res => setYears(res.join(", ")))
      .catch(e => {
        setError(e);
        console.log(e);
      });
  };

  return (
    <div>
      <button onClick={handleClick}>Years</button>
      {error == null ? <div>{years}</div> : <div>{error}</div>}
    </div>
  );
}

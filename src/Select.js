import React, { useState, useEffect } from "react";
import Select from "react-select";

function getEndpoint(endpoint) {
  return fetch(`https://cab230.hackhouse.sh/${endpoint}`)
    .then(res => res.json())
    .then(res => res[`${endpoint}`]);
}

export function OffenceSelect(props) {
  const [offencesOptions, setOffencesOptions] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    getEndpoint("offences")
      .then(res => {
        setOffencesOptions(
          res.map(element => ({ value: element, label: element }))
        );
        setIsDisabled(false);
      })
      .catch(err => console.log(err.message));
  }, []);

  return (
    <Select
      options={offencesOptions}
      onChange={val => props.getSelected(val.value)}
      isDisabled={isDisabled}
      placeholder="Offence"
      className="select-custom"
      classNamePrefix="select-custom"
    />
  );
}

export function AreaSelect(props) {
  const [areasOptions, setAreasOptions] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    getEndpoint("areas")
      .then(res => {
        setAreasOptions(
          res.map(element => ({ value: element, label: element }))
        );
        setIsDisabled(false);
      })
      .catch(err => console.log(err.message));
  }, []);

  return (
    <Select
      options={areasOptions}
      isMulti={true}
      onChange={val => props.getSelected(val.map(e => e.value).join(","))}
      isDisabled={isDisabled}
      placeholder="Area"
      className="select-custom"
      classNamePrefix="select-custom"
    />
  );
}

export function AgeSelect(props) {
  const [agesOptions, setAgesOptions] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    getEndpoint("ages")
      .then(res => {
        setAgesOptions(
          res.map(element => ({ value: element, label: element }))
        );
        setIsDisabled(false);
      })
      .catch(err => console.log(err.message));
  }, []);

  return (
    <Select
      options={agesOptions}
      isMulti={true}
      onChange={val => props.getSelected(val.map(e => e.value).join(","))}
      isDisabled={isDisabled}
      placeholder="Age"
      className="select-custom"
      classNamePrefix="select-custom"
    />
  );
}

export function GenderSelect(props) {
  const [gendersOptions, setGendersOptions] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    getEndpoint("genders")
      .then(res => {
        setGendersOptions(
          res.map(element => ({ value: element, label: element }))
        );
        setIsDisabled(false);
      })
      .catch(err => console.log(err.message));
  }, []);

  return (
    <Select
      options={gendersOptions}
      isMulti={true}
      onChange={val => props.getSelected(val.map(e => e.value).join(","))}
      isDisabled={isDisabled}
      placeholder="Gender"
      className="select-custom"
      classNamePrefix="select-custom"
    />
  );
}

export function YearSelect(props) {
  const [yearsOptions, setYearsOptions] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    getEndpoint("years")
      .then(res => {
        setYearsOptions(
          res.map(element => ({ value: element, label: element }))
        );
        setIsDisabled(false);
      })
      .catch(err => console.log(err.message));
  }, []);

  return (
    <Select
      options={yearsOptions}
      isMulti={true}
      onChange={val => props.getSelected(val.map(e => e.value).join(","))}
      isDisabled={isDisabled}
      placeholder="Year"
      className="select-custom"
      classNamePrefix="select-custom"
    />
  );
}

export function MonthSelect(props) {
  const months = [
    {
      value: 1,
      label: "January"
    },
    {
      value: 2,
      label: "February"
    },
    {
      value: 3,
      label: "March"
    },
    {
      value: 4,
      label: "April"
    },
    {
      value: 5,
      label: "May"
    },
    {
      value: 6,
      label: "June"
    },
    {
      value: 7,
      label: "July"
    },
    {
      value: 8,
      label: "August"
    },
    {
      value: 9,
      label: "September"
    },
    {
      value: 10,
      label: "October"
    },
    {
      value: 11,
      label: "November"
    },
    {
      value: 12,
      label: "Decemeber"
    }
  ];

  return (
    <Select
      options={months}
      isMulti={true}
      onChange={val => props.getSelected(val.map(e => e.value).join(","))}
      placeholder="Month"
      className="select-custom"
      classNamePrefix="select-custom"
    />
  );
}

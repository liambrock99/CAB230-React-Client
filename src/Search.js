import React, { useState, useEffect } from "react";
import Select from "react-select";
import ReactTable from "react-table";
import "react-table/react-table.css";

function getEndpoint(endpoint) {
    return fetch(`https://cab230.hackhouse.sh/${endpoint}`)
    .then(res => res.json())
    .then(res => res[`${endpoint}`]);
}

export function Search(props) {
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    /** Offence <Select/>  */
    const [offencesOptions, setOffencesOptions] = useState([{ value: "", label: ""}]);
    const [selectedOffence, setSelectedOffence] = useState([]);

    /** Filters <Select /> */
    const [areasOptions, setAreasOptions] = useState([{value: "", label: ""}]);
    const [selectedAreas, setSelectedAreas] = useState('');
    const [agesOptions, setAgesOptions] = useState([{value: "", label: ""}]);
    const [selectedAges, setSelectedAges] = useState('');
    const [gendersOptions, setGendersOptions] = useState([{value: "", label: ""}]);
    const [selectedGenders, setSelectedGenders] = useState('');
    const [yearsOptions, setYearsOptions] = useState([{ value: "", label: ""}]);
    const [selectedYears, setSelectedYears] = useState('');

    const logState = () => {
        console.log(selectedAreas);
    }

    useEffect(() => {
        getEndpoint("offences")
        .then(res => {setOffencesOptions(res.map((element) => ({value: element,label: element})))});
        getEndpoint("areas")
        .then(res => {setAreasOptions(res.map((element) => ({value: element, label: element})))});
        getEndpoint("ages")
        .then(res => {setAgesOptions(res.map((element) => ({value: element, label: element})))});
        getEndpoint("genders")
        .then(res => {setGendersOptions(res.map((element) => ({value: element, label: element})))});
        getEndpoint("years")
        .then(res => {setYearsOptions(res.map((element) => ({value: element, label: element})))});
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const params = { "method": "GET", "headers": {"Authorization": `Bearer ${props._token}`}};
        const url = `https://cab230.hackhouse.sh/search?offence=${selectedOffence}&area=${selectedAreas}&age=${selectedAges}&gender=${selectedGenders}&year=${selectedYears}`;
        console.log(url);
        fetch(encodeURI(url), params)
        .then((res) => {
            if (res.ok) {
                setError(null);
                return res.json();
            }
            res.json().then((res) => setError(res.error));
            throw new Error(`Network response was not OK:  ${res.status}`);
        })
        .then((res) => {
            setError(null);
            setResults(res.result);
        })
        .catch((err) => {
            console.log("There has been a problem with your fetch operation: " + err.message);
        });
    }

    const columns = [{
        Header: "Area",
        accessor: "LGA",
    }, {
        Header: "Total",
        accessor: "total"
    }];

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Select options={offencesOptions} onChange={val => setSelectedOffence(val.value)}/>
                <Select options={areasOptions} isMulti={true} onChange={val => setSelectedAreas(val.map(e => e.value).join(","))}/>
                <Select options={agesOptions} isMulti={true} onChange={val => setSelectedAges(val.map(e => e.value).join(","))}/>
                <Select options={gendersOptions} isMulti={true} onChange={val => setSelectedGenders(val.map(e => e.value).join(","))}/>
                <Select options={yearsOptions} isMulti={true} onChange={val => setSelectedYears(val.map(e => e.value).join(","))}/>
                <input type="submit" value="Submit"></input>
            </form>
            <button onClick={logState}>LOG STATE</button>
            {error == null ? <ReactTable data={results} columns={columns}/> : <div>{error}</div>}
        </div>
    )
}
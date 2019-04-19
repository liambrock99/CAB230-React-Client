import React, { useState } from "react";

export function Api(props) {
    return (
        <div>
            <Offences/>
            <Areas/>
            <Ages/>
            <Genders/>
            <Years/>
            <Search token={props._token}/>
        </div>
    )
}


function Search(props) {
    const [query, setQuery] = useState('');
    const [filters, setFilters] =useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    const formatFilters = () => {
        return "&" + filters.replace(/,/g, "&");
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const params = { "method": "GET", "headers": {"Authorization": `Bearer ${props.token}`}};
        let url = `https://cab230.hackhouse.sh/search?offence=${query}`;

        if (filters !==  '') {
            url += formatFilters(); 
        }
        console.log(url);
        fetch(encodeURI(url), params)
        .then((res) => {
            if (res.ok) {
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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={query} onChange={e => setQuery(e.target.value)}></input>
                <input type="text" value={filters} onChange={e => setFilters(e.target.value)}></input>
                <input type="submit" value="Submit"></input>
            </form>
            {error == null ? results.map(r => <SearchResult key={r.LGA} LGA={r.LGA} total={r.total}/>) : <div>{error}</div>}
        </div>
    )
}

function SearchResult(props) {
    return (
        <div>{props.LGA} {props.total}</div>
    )
}

function getEndpoint(endpoint) {
    return fetch(`https://cab230.hackhouse.sh/${endpoint}`)
    .then(res => res.json())
    .then(res => res[`${endpoint}`])
}



function Offences() {
    const [offences, setOffences] = useState([]);
    const [error, setError] =  useState(null);

    const handleClick = () => {
        getEndpoint("offences")
        .then(res => setOffences(res.join(", ")))
        .catch(e => console.log(e))
    }

    return (
        <div>
            <button onClick={handleClick}>Offences</button>
            {error == null ? <div>{offences}</div> : <div>{error}</div>}
        </div>
    )
}


function Areas() {
    const [areas, setAreas] = useState([]);
    const [error, setError] =  useState(null);

    const handleClick = () => {
        getEndpoint("areas")
        .then(res => setAreas(res.join(", ")))
        .catch(e => console.log(e))
    }

    return (
        <div>
            <button onClick={handleClick}>Areas</button>
            {error == null ? <div>{areas}</div> : <div>{error}</div>}
        </div>
    )
}


function Ages() {
    const [ages, setAges] = useState([]);
    const [error, setError] =  useState(null);

    const handleClick = () => {
        getEndpoint("ages")
        .then(res => setAges(res.join(", ")))
        .catch(e => console.log(e))
    }

    return (
        <div>
            <button onClick={handleClick}>Ages</button>
            {error == null ? <div>{ages}</div> : <div>{error}</div>}
        </div>
    )
}


function Genders() {
    const [genders, setGenders] = useState([]);
    const [error, setError] =  useState(null);

    const handleClick = () => {
        getEndpoint("genders")
        .then(res => setGenders(res.join(", ")))
        .catch(e => console.log(e))
    }

    return (
        <div>
            <button onClick={handleClick}>Genders</button>
            {error == null ? <div>{genders}</div> : <div>{error}</div>}
        </div>
    )
}


function Years() {
    const [years, setYears] = useState([]);
    const [error, setError] =  useState(null);

    const handleClick = () => {
        getEndpoint("years")
        .then(res => setYears(res.join(", ")))
        .catch(e => console.log(e))
    }

    return (
        <div>
            <button onClick={handleClick}>Years</button>
            {error == null ? <div>{years}</div> : <div>{error}</div>}
        </div>
    )
}
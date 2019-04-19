import React from "react"
import { Api } from "./Api.js"

export function Main(props) {
    return (
        <div>
            <h1>Welcome!</h1>
            <h2>Your API token is: {props.token}</h2>
            <Api _token={props.token}/>
        </div>
    )
}
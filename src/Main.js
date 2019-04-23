import React from "react";
import { ApiButtons } from "./Buttons.js";
import { Search } from "./Search.js";

export function Main(props) {
  return (
    <div>
      <h1>Welcome!</h1>
      <h2>Your API token is: {props.token}</h2>
      <button onClick={props.onLogout}>Logout</button>
      <Search _token={props.token} />
      <ApiButtons />
    </div>
  );
}

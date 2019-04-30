import React from "react";
import Search from "./Search.js";

export function Main(props) {
  return (
    <div>
      <h1>Welcome!</h1>
      <button onClick={props.onLogout}>Logout</button>
      <Search _token={props.token} />
    </div>
  );
}

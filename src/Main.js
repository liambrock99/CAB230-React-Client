import React from "react";
import Search from "./Search.js";

export function Main(props) {
  return (
    <div>
      <h1 id="title" class="font center-text">
        Queensland Crime Statistics Database
      </h1>
      <button
        onClick={props.onLogout}
        class="pure-button pure-button-primary logout-btn"
      >
        Logout
      </button>
      <Search _token={props.token} />
    </div>
  );
}

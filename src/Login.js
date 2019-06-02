import React, { useState } from "react";

/**
 * Renders a Login form
 * Fetches the /login endpoint upon submit
 */
export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    fetch("https://localhost:443/login", {
      method: "POST",
      body: `email=${email}&password=${password}`,
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // HTTP 401 response contains a useful message for the user
        if (res.status === 401) {
          res.json().then(res => {
            setError(res.message);
          });
        }

        throw new Error(`Network response was not OK: ${res.status}`);
      })
      .then(res => {
        props.onLogin(res.access_token);
      })
      .catch(err => {
        console.log(`Problem with fetch operation - ${err.message}`);
      });
  };

  return (
    <div>
      <div className="form-title font center-text">Login</div>
      <form
        onSubmit={handleSubmit}
        className="pure-form center-text"
        method="POST"
      >
        <input
          type="text"
          placeholder="Email"
          value={email}
          autoComplete="email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
        />
        <input
          type="submit"
          value="Login"
          className="pure-button pure-button-primary"
        />
      </form>
      {error !== "" && <div className="form-error center-text">{error}</div>}
    </div>
  );
}

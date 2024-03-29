import React, { useState } from "react";

/**
 * Renders a Register form
 * Fetches /register endpoint upon submit
 */
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    fetch("https://localhost:443/register", {
      method: "POST",
      body: `email=${email}&password=${password}`,
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      }
    })
      // HTTP 201/400 responses contain a useful message for the user
      .then(res => {
        if (res.status === 201 || res.status === 400) {
          return res.json();
        }
        throw new Error(`Network response was was not OK: ${res.status}`);
      })
      .then(res => setStatus(res.message))
      .catch(err =>
        console.log(`Problem with fetch operation - ${err.message}`)
      );
  };

  return (
    <div>
      <div className="form-title font center-text">Register</div>
      <form
        onSubmit={handleSubmit}
        className="pure-form center-text"
        type="POST"
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
          value="Register"
          className="pure-button pure-button-primary"
        />
      </form>
      {status !== "" && <div className="form-error center-text">{status}</div>}
    </div>
  );
}

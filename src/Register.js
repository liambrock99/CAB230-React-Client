import React, { useState } from "react";

export function Register() {
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
      <div class="form-title font center-text">Register</div>
      <form onSubmit={handleSubmit} class="pure-form center-text" type="POST">
        <input
          type="text"
          placeholder="Email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
        />
        <input
          type="submit"
          value="Register"
          class="pure-button pure-button-primary"
        />
      </form>
      {status !== "" && <div class="form-error center-text">{status}</div>}
    </div>
  );
}

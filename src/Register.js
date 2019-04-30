import React, { useState } from "react";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    fetch("https://cab230.hackhouse.sh/register", {
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
      <h1>Register</h1>
      <form onSubmit={handleSubmit} type="POST">
        <input
          type="text"
          name="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input type="submit" value="Register" />
      </form>
      <p>{status}</p>
    </div>
  );
}

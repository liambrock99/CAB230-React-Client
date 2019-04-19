import React, { useState } from "react";

export function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("https://cab230.hackhouse.sh/login", {
            method: "POST",
            body: `email=${email}&password=${password}`,
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          response.json().then((text) => {
            setError(text.message);
          })
          throw new Error("Network response was not ok.");
        })
        .then((result) => {
          props.onLogin(result.token);
        })
        .catch((error) => {
          console.log("Problem with fetch operation: ", error.message);
        })
      } 

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} method="POST">
                <input type="text" name="Email" value={email} onChange={e => setEmail(e.target.value)}></input>
                <input type="password" name="Password" value={password} onChange={e => setPassword(e.target.value)}></input>
                <input type="submit" value="Login"></input>
            </form> 
            <p>{error}</p>
        </div>
    )
}
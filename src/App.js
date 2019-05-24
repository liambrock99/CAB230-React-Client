import React, { useState } from "react";
import Login from "./Login.js";
import Register from "./Register.js";
import Main from "./Main.js";
import "./App.css";

function App() {
  const [JWT, setJWT] = useState(null);
  const onLogin = t => setJWT(t);
  const onLogout = () => setJWT(null);

  return (
    <div>
      {JWT == null ? (
        <div>
          <h1 id="title" class="font center-text">
            Queensland Crime Statistics Database
          </h1>
          <Login onLogin={onLogin} />
          <Register />
        </div>
      ) : (
        <Main token={JWT} onLogout={onLogout} />
      )}
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { Login } from "./Login.js";
import { Register } from "./Register.js";
import { Main } from "./Main.js";

function App() {
  const [JWT, setJWT] = useState(null);
  const onLogin = (t) => setJWT(t);
  const onLogout = () => setJWT(null);
		return (
				<div>
          {JWT == null ? <div> <Login onLogin={onLogin}/> <Register /> </div>: <Main token={JWT} onLogout={onLogout}/> }
				</div>
		)
}

export default App;

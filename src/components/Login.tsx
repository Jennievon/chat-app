import React, { useState } from "react";
import { useChat } from "../contexts/ChatContext";
import { USER_ID, setToLocalStorage } from "../utils";

function Login() {
  const { setUser } = useChat();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = {
      id: USER_ID,
      username,
    };
    setUser(user);
    setToLocalStorage("user", user);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;

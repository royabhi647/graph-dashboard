import React, { useState } from "react";

function LoginScreen({ onLoginSuccess }) {
  const [username, setUsername] = useState("DJ@4");
  const [password, setPassword] = useState("Dhunjam@2023");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://stg.dhunjam.in/account/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();
      if (data.status === 200 && data.response === "Success") {
        onLoginSuccess(data.data.token, data.data.id);
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("Login failed");
    }
  };

  return (
    <div>
      <h2>Venue Admin Login</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          className="loginInput"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="loginInput"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
    </div>
  );
}

export default LoginScreen;

import React, { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import AdminDashboard from "./components/AdminDashboard";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(null);

  return (
    <div className="App">
      {!loggedIn ? (
        <LoginScreen
          onLoginSuccess={(token, id) => {
            setLoggedIn(true);
            setToken(token);
            setUserId(id);
          }}
        />
      ) : (
        <AdminDashboard token={token} userId={userId} />
      )}
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../api";
import { useUser } from "./Users"; // Adjust the import path as necessary
import "../style/Login.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser(); // Get the setUser function from context

  const handleLogin = (event) => {
    event.preventDefault();

    getUsers()
      .then((users) => {
        const user = users.find((user) => user.username === username);

        if (user) {
          setUser(user); // Set the user in context
          localStorage.setItem("user", JSON.stringify(user)); // Store user in localStorage
          navigate("/");
        } else {
          setError("User not found. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError("An error occurred. Please try again later.");
      });
  };

  return (
    <main>
      <div className="login-container">
        <h2>User Login</h2>
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;

import React, { createContext, useState, useContext, useEffect } from "react";
import { getUsers } from "../api";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to fetch user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      // Fetch users from API if no user is stored
      getUsers()
        .then((data) => {
          // Set a default user if users exist
          if (data.length > 0) {
            const currentUser = data[0]; // Replace with actual login logic
            setUser(currentUser);
          } else {
            console.warn("No users found");
          }
        })
        .catch((error) => {
          console.error("Failed to fetch users:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  // Provide a method to update user from other components
  const loginUser = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    setUser: loginUser,
    logoutUser,
  };

  if (loading) {
    return <div>Loading user information...</div>;
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

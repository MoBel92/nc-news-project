import React, { createContext, useState, useContext, useEffect } from "react";
import { getUsers } from "../api";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then((data) => {
        const currentUser = data[0];
        setUser(currentUser);
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const value = {
    username: user ? user.username : null,
  };

  if (loading) {
    return <div>Loading user information...</div>;
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

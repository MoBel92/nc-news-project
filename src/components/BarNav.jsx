import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTopics, getUsers } from "../api";
import "../style/BarNav.css";

export default function NavigationBar() {
  const [topics, setTopics] = useState([]);
  const [users, setUsers] = useState([]); // State for users
  const [selectedTopic, setSelectedTopic] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  useEffect(() => {
    getTopics()
      .then((data) => {
        setTopics(data);
      })
      .catch((error) => {
        console.error("Failed to fetch topics:", error);
      });
  }, []);

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data);

        if (data.length > 0) {
          setSelectedUser(data[0]);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTopicsChange = (topic) => {
    setSelectedTopic(topic);
    setIsDropdownOpen(false);
    navigate(`/articles/topics/${topic}`);
  };

  const handleUserChange = (user) => {
    setSelectedUser(user);
    setIsUserDropdownOpen(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("light-mode", !isDarkMode);
  };

  return (
    <nav className="navigation-bar">
      <Link to="/" className="nav-item">
        Home
      </Link>

      <div
        ref={dropdownRef}
        className={`nav-item category-dropdown ${isDropdownOpen ? "open" : ""}`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <button className="dropdown-toggle">Topics</button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            {topics.map((topic) => (
              <button
                key={topic.slug}
                onClick={() => handleTopicsChange(topic.slug)}
              >
                {topic.slug}
              </button>
            ))}
          </div>
        )}
      </div>

      <Link to="/post-items" className="nav-item">
        Add article
      </Link>

      <div
        ref={userDropdownRef}
        className={`user-login ${isUserDropdownOpen ? "open" : ""}`}
        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
      >
        {selectedUser && (
          <>
            <div className="user-avatar">
              <img src={selectedUser.avatar_url} alt={selectedUser.name} />
            </div>
            <Link to="/login" className="nav-item">
              User Login
            </Link>
          </>
        )}
        {isUserDropdownOpen && (
          <div className="user-dropdown-menu">
            {users.map((user) => (
              <button
                key={user.username}
                onClick={() => [handleUserChange(user), setSelectedUser(user)]}
              >
                {user.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <button className="toggle-button" onClick={toggleDarkMode}>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
}

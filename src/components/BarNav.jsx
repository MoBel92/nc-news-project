import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTopics } from "../api";
import { useUser } from "./Users"; // Import the useUser hook
import "../style/BarNav.css";

export default function NavigationBar() {
  const [topics, setTopics] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode state
  const { user, setUser } = useUser(); // Get user and logoutUser from context
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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("light-mode", !isDarkMode);
  };

  const handleLogout = () => {
    setUser(null); // Use the logoutUser function from context
    navigate("/login");
  };

  return (
    <nav className="navigation-bar">
      <Link to="/" className="nav-item">
        Home
      </Link>

      <div
        ref={dropdownRef}
        className={`category-dropdown ${isDropdownOpen ? "open" : ""}`}
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
        {user ? (
          <>
            <div className="user-avatar">
              <img
                src={user.avatar_url}
                alt={user.name}
                className="user-circle"
              />
            </div>
            <span className="user-name">{user.name}</span>
            {isUserDropdownOpen && (
              <div className="user-dropdown-menu">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </>
        ) : (
          <Link to="/login" className="nav-item">
            User Login
          </Link>
        )}
      </div>

      <button className="toggle-button" onClick={toggleDarkMode}>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
}

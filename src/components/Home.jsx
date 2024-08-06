import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to NC News</h1>
      <div className="navigation">
        <Link to="/articles">View Articles</Link>
      </div>
    </div>
  );
};

export default Home;

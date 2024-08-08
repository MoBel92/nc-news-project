import React from "react";
import ArticlesList from "./Articles";
import "../style/Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to the Article Viewer</h1>
      <ArticlesList />
    </div>
  );
};

export default Home;

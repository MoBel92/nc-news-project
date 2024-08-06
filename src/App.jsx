import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Articles from "./components/Articles";
import SingleArticle from "./components/Single_article";
import Home from "./components/Home";
import Footer from "./components/Footer";
import "./style/app.css";
import "./style/footer.css";

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/article/:article_id" element={<SingleArticle />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

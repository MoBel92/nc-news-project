import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Articles from "./components/Articles";
import SingleArticle from "./components/Single_article";
import Home from "./components/Home";
import Footer from "./components/Footer";
import "./style/app.css";
import CommentsPage from "./components/Comments_page";
import PageNotFound from "./components/PageNotFound";
import { UserProvider } from "./components/Users";

function App() {
  return (
    <UserProvider>
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/topics/:topic" element={<Articles />} />
            <Route path="/article/:article_id" element={<SingleArticle />} />
            <Route
              path="/article/:article_id/comments"
              element={<CommentsPage />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;

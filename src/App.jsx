import React from "react";
import { Routes, Route } from "react-router-dom";
import BarNav from "./components/BarNav";
import ArticlesList from "./components/Articles";
import SingleArticle from "./components/Single_article";
import Home from "./components/Home";
import Footer from "./components/Footer";
import CommentsPage from "./components/Comments_page";
import PageNotFound from "./components/PageNotFound";
import { UserProvider } from "./components/Users";
import Header from "./components/Header";
import LoginPage from "./components/Login";
import "./style/app.css";

function App() {
  return (
    <UserProvider>
      <div className="app-container">
        <Header />
        <BarNav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />{" "}
            <Route path="/articles" element={<ArticlesList />} />
            <Route path="/articles/topics/:topic" element={<ArticlesList />} />
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

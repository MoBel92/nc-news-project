import React, { useEffect, useState } from "react";
import { getArticles } from "../api";
import ArticleCard from "./Article_card";
import "../style/Article.css";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticles()
      .then((data) => {
        setArticles(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!articles.length) return <p>Loading articles...</p>;

  return (
    <div className="articles-list">
      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </div>
  );
};

export default ArticlesList;

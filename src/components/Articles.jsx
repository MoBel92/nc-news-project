import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles, getArticlesByTopic } from "../api";
import ArticleCard from "./Article_card";
import "../style/Article.css";

const ArticlesList = () => {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    const fetchArticles = () => {
      const fetchFunction = topic
        ? getArticlesByTopic(topic, sortBy, order)
        : getArticles(sortBy, order);
      fetchFunction
        .then((data) => {
          setArticles(data);
        })
        .catch((err) => {
          if (err.response?.status === 400) {
            setError("Invalid topic.");
          } else {
            setError("An error occurred.");
          }
        });
    };

    fetchArticles();
  }, [topic, sortBy, order]);

  if (error) return <p>Error: {error}</p>;
  if (!articles.length) return <p>Loading articles...</p>;

  return (
    <div className="articles-container">
      <div className="sort-controls">
        <label htmlFor="sort-by" className="query">
          Sort by:
        </label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="created_at">Date</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select>

        <label htmlFor="order" className="query">
          Order:
        </label>
        <select
          id="order"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      <div className="articles-list">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticlesList;

import React, { useState, useEffect } from "react";
import { getArticlesById } from "../api";
import { useParams } from "react-router-dom";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticlesById(article_id)
      .then((data) => {
        setArticle(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [article_id]);

  if (error) return <p>Error: {error}</p>;
  if (!article) return <p>Loading article...</p>;

  return (
    <div className="single-article">
      <h1>{article.title}</h1>
      <p>By {article.author}</p>
      <img src={article.image_url || "default_image.jpg"} alt={article.title} />
      <p>{article.body}</p>
    </div>
  );
};

export default SingleArticle;

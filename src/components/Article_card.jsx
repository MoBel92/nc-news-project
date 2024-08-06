import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <Link to={`/article/${article.article_id}`}>
        <img src={article.article_img_url} alt={article.title} />
        <h3>{article.title}</h3>
        <p>
          By {article.author} |{" "}
          {new Date(article.created_at).toLocaleDateString()}
        </p>
        <p>Topic: {article.topic}</p>
        <p>Comments: {article.comment_count}</p>
        <p>Votes: {article.votes}</p>
      </Link>
    </div>
  );
};

export default ArticleCard;

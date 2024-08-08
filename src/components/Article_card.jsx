import React from "react";
import "../style/articleCard.css";
import { Link } from "react-router-dom";

const ArticleCard = ({ article, onToggleComments }) => {
  return (
    <div className="article-card">
      <Link to={`/article/${article.article_id}`}>
        <img
          src={article.article_img_url}
          alt={article.title}
          className="article-image"
        />

        <h3>{article.title}</h3>
        <p>
          By {article.author} |{" "}
          {new Date(article.created_at).toLocaleDateString()}
        </p>
        <p>Topic: {article.topic}</p>
        <p>Votes: {article.votes}</p>
      </Link>
      <p>
        <Link
          to={`/article/${article.article_id}/comments`}
          className="comments-link"
        >
          Comments: {article.comment_count}
        </Link>
      </p>
    </div>
  );
};

export default ArticleCard;

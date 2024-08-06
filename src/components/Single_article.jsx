import React, { useState, useEffect } from "react";
import { getArticlesById, voteOnArticle, getCommentsByArticleId } from "../api";
import { useParams } from "react-router-dom";
import "../style/singleArticle.css";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    getArticlesById(article_id)
      .then((data) => {
        setArticle(data);
        setVotes(data.votes);
      })
      .catch((err) => {
        setError(err.message || "Failed to load article");
      });
  }, [article_id]);

  useEffect(() => {
    if (isCommentsVisible) {
      getCommentsByArticleId(article_id)
        .then((data) => {
          console.log(data);
          setComments(data);
        })
        .catch((err) => {
          setError(err.message || "Failed to load comments");
        });
    }
  }, [article_id, isCommentsVisible]);

  const toggleComments = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };

  const handleVote = (type) => {
    voteOnArticle(article_id, type)
      .then((updatedVotes) => {
        console.log("Updated Votes:", updatedVotes);
        setVotes(updatedVotes);
      })
      .catch((err) => {
        setError(err.message || "Failed to vote");
      });
  };

  if (error) return <p className="error">Error: {error}</p>;
  if (!article) return <p className="loading">Loading article...</p>;

  return (
    <div className="single-article">
      <h1>{article.title}</h1>
      <p className="author">By {article.author}</p>
      <img src={article.image_url} alt={article.title} />
      <p>{article.body}</p>

      <div className="voting">
        <button onClick={() => handleVote("upvote")}>Upvote</button>
        <button onClick={() => handleVote("downvote")}>Downvote</button>
        <p>Votes: {votes}</p>
      </div>

      <div className="comments">
        <button onClick={toggleComments}>
          {isCommentsVisible ? "Hide Comments" : "Show Comments"}
        </button>
        {isCommentsVisible && (
          <>
            <h2>Comments ({article.comment_count})</h2>
            <ul>
              {article.comment_count === 0 ? (
                <p>No comments yet</p>
              ) : (
                comments.map((c) => (
                  <li key={c.id} className="comment-card">
                    <p className="comment-author">{c.author}</p>
                    <p className="comment-date">
                      {new Date(c.created_at).toLocaleDateString()}
                    </p>
                    <p className="comment-text">{c.text}</p>
                  </li>
                ))
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleArticle;

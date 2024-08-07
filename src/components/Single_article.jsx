import React, { useState, useEffect } from "react";
import { getArticlesById, voteOnArticle, getCommentsByArticleId } from "../api";
import { useParams } from "react-router-dom";
import "../style/singleArticle.css";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [votes, setVotes] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [votingInProgress, setVotingInProgress] = useState(false);

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
    getCommentsByArticleId(article_id)
      .then((data) => {
        setComments(data.comments);
      })
      .catch((err) => {
        setError(err.message || "Failed to load comments");
      });
  }, [article_id]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") {
      setCommentError("Comment cannot be empty");
      return;
    }
    postComment(article_id, { text: newComment })
      .then((newComment) => {
        setComments((prevComments) => [newComment, ...prevComments]);
        setNewComment("");
        setCommentError("");
      })
      .catch((err) => {
        setCommentError(err.message || "Failed to post comment");
      });
  };

  const handleVote = (e) => {
    const voteValue = Number(e.target.value);
    // Optimistically update UI
    setVotes((prevVotes) => prevVotes + voteValue);
    setVotingInProgress(true);

    voteOnArticle(article_id, voteValue)
      .then((updatedVotes) => {
        setVotes(updatedVotes);
        setVotingInProgress(false);
      })
      .catch((err) => {
        setVotes((prevVotes) => prevVotes - voteValue); // Revert vote
        setError(err.message || "Failed to vote");
        setVotingInProgress(false);
      });
  };

  if (error) return <p className="error">Error: {error}</p>;
  if (!article) return <p className="loading">Loading article...</p>;

  // have to work on the vote handler

  return (
    <div className="single-article">
      <h1>{article.title}</h1>
      <p className="author">By {article.author}</p>
      <img src={article.image_url} alt={article.title} />
      <p>{article.body}</p>

      <div className="voting">
        <button value={1} onClick={handleVote} disabled={votingInProgress}>
          Upvote
        </button>
        <button value={-1} onClick={handleVote} disabled={votingInProgress}>
          Downvote
        </button>
        <p>Votes: {votes}</p>
      </div>

      <div className="add-comment">
        <h3>Add a Comment</h3>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Write your comment here..."
            rows="4"
            cols="50"
          />
          <br />
          <button type="submit">Post Comment</button>
          {commentError && <p className="error">{commentError}</p>}
        </form>
      </div>

      <div className="comments">
        <h2>Comments ({article.comment_count})</h2>
        <ul className="comment-list">
          {comments.length === 0 ? (
            <p>No comments yet</p>
          ) : (
            comments.map((comment) => (
              <li key={comment.comment_id} className="comment-card">
                <div className="comment-header">
                  <p className="comment-author">{comment.author}</p>
                  <p className="comment-date">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </p>
                </div>
                <p className="comment-body">{comment.body}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default SingleArticle;

import React, { useState, useEffect } from "react";
import {
  getArticlesById,
  voteOnArticle,
  getCommentsByArticleId,
  postComment,
  deleteCommentById,
} from "../api";
import { useParams } from "react-router-dom";
import "../style/singleArticle.css";
import { Modal, Button, Header, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useUser } from "./Users";

const SingleArticle = () => {
  const { article_id } = useParams();
  const { username } = useUser();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [votes, setVotes] = useState(0);
  const [voted, setVoted] = useState(false);
  const [open, setOpen] = useState(false);
  const [voteValue, setVoteValue] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
        setComments(data);
      })
      .catch((err) => {
        setError(err.message || "Failed to load comments");
      });
  }, [article_id]);

  const handleVoteClick = (value) => {
    setVoteValue(value);
    setOpen(true);
  };

  const confirmVote = () => {
    setVotes((prevVotes) => prevVotes + voteValue);
    setVoted(true);

    voteOnArticle(article_id, voteValue)
      .then(() => {
        setOpen(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to vote");

        setVotes((prevVotes) => prevVotes - voteValue);
        setVoted(false);
      });
  };
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") {
      setCommentError("Comment cannot be empty");
      return;
    }

    setIsSubmitting(true);
    postComment(article_id, username, newComment)
      .then((newComment) => {
        setComments((prevComments) => [newComment, ...prevComments]);
        setNewComment("");
        setCommentError("");
      })
      .catch((err) => {
        setCommentError(err.message || "Failed to post comment");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleDelete = (commentId) => {
    setIsDeleting(true);
    deleteCommentById(commentId)
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== commentId)
        );
      })
      .catch((err) => {
        console.error("Failed to delete comment:", err);
        alert("There was an issue deleting your comment. Please try again.");
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  if (error) return <p className="error">Error: {error}</p>;
  if (!article) return <p className="loading">Loading article...</p>;

  return (
    <div className="single-article">
      <h1 className="title">{article.title}</h1>
      <p className="author">By {article.author}</p>
      <img src={article.article_img_url} alt={article.title} />
      <p>{article.body}</p>

      <div className="voting">
        <button onClick={() => handleVoteClick(1)} disabled={voted}>
          Upvote
        </button>
        <button
          onClick={() => handleVoteClick(-1)}
          disabled={voted || votes <= 0}
        >
          Downvote
        </button>
        <br></br>
        <p>Votes: {votes}</p>
      </div>

      <Modal basic onClose={() => setOpen(false)} open={open} size="small">
        <Header icon>
          <Icon name="archive" />
          You are about to vote for this article
        </Header>
        <Modal.Content>
          <p>Are you sure you want to vote for this article?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={() => setOpen(false)}>
            <Icon name="remove" /> No
          </Button>
          <Button color="green" inverted onClick={confirmVote}>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>

      <div className="comments">
        <h2>Comments ({article.comment_count})</h2>
        <div className="add-comment">
          <h3>Add a Comment</h3>
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Write your comment here..."
              rows="4"
              cols="50"
              disabled={isSubmitting}
            />
            <br />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Post Comment"}
            </button>
            {commentError && <p className="error">{commentError}</p>}
          </form>
        </div>
        <ul>
          {comments.length === 0 ? (
            <p>No comments yet</p>
          ) : (
            comments.map((comment) => (
              <li key={comment.comment_id} className="comment-card">
                <p className="comment-author">{comment.author}</p>
                <p className="comment-date">
                  {new Date(comment.created_at).toLocaleDateString()}
                </p>
                <p className="comment-text">{comment.body}</p>
                {comment.author === username && (
                  <button
                    onClick={() => handleDelete(comment.comment_id)}
                    className="delete-button"
                    disabled={isDeleting}
                  >
                    Delete
                  </button>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default SingleArticle;

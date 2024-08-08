import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCommentsByArticleId } from "../api";
import "../style/Comments_page.css";

const CommentsPage = () => {
  const { article_id } = useParams();

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (article_id) {
      getCommentsByArticleId(article_id)
        .then((data) => {
          setComments(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
          setLoading(false);
        });
    } else {
      console.error("Article ID is not defined");
      setLoading(false);
    }
  }, [article_id]);

  if (loading) {
    return <p className="loading">Loading comments...</p>;
  }

  return (
    <div className="comments-container">
      <h2>Comments for this Article </h2>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.comment_id}>
              <p className="body">{comment.body}</p>
              <p className="author">By {comment.author}</p>
              <p className="date">
                {new Date(comment.created_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-comments">No comments yet.</p>
      )}
    </div>
  );
};

export default CommentsPage;

import React from "react";
import "../style/CommentCard.css";

const CommentCard = ({ author, date, text }) => {
  return (
    <div className="comment-card">
      <p className="comment-author">
        <strong>{author}</strong>
      </p>
      <p className="comment-date">{new Date(date).toLocaleDateString()}</p>
      <p className="comment-text">{text}</p>
    </div>
  );
};

export default CommentCard;

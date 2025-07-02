// src/components/Comment.js
import React from 'react';
import './Comment.css'; // Estilos específicos para los comentarios

const Comment = ({ username, comment, date }) => {
  return (
    <div className="co-comment">
      <div className="co-comment-header">
        <span className="co-comment-username">{username}</span>
        <span className="co-comment-date">{date}</span>
      </div>
      <p className="co-comment-body">{comment}</p>
    </div>
  );
};

export default Comment;

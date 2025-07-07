// src/components/Comment.js
import React, { useEffect, useState } from 'react';
import './Comment.css';
import userService from '../../services/userService';

const Comment = ({ userId, comment, date, rating, additional_photos }) => {
  const [userData, setUserData] = useState({ username: 'Anónimo' });

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      
      try {
        const userData = await userService.getUserById(userId);
        if (userData) {
          setUserData(userData);
        }
      } catch (error) {
        console.error("Error al cargar usuario:", error);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="co-comment">
      <div className="co-comment-header">
        <span className="co-comment-username">{userData.username || 'Anónimo'}</span>
        <span className="co-comment-date">{new Date(date).toLocaleDateString()}</span>
      </div>
      <div className="co-comment-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={`co-star ${star <= rating ? 'filled' : 'empty'}`}>
            ★
          </span>
        ))}
      </div>
      <p className="co-comment-body">{comment}</p>
      {additional_photos && additional_photos.length > 0 && (
        <div className="co-comment-photos">
          {additional_photos.map((photo, index) => (
            <img key={index} src={photo} alt={`Foto ${index + 1}`} className="co-comment-photo" />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;

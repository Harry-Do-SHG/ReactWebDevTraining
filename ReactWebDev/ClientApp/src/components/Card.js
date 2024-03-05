import React from 'react';
import './Card.css';

const Card = ({ post }) => {
  const usernameInitial = post.username.charAt(0).toUpperCase();
  return (
    <div className="cardContainer">
      <div className="userContainer">{usernameInitial}</div>
      <div className="contentContainer">
        <h4 className="cardTitle">{post.title}</h4>
        <p className="cardContent">{post.content}</p>
      </div>
    </div>
  );
}

export default Card;

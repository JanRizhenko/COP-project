import React from 'react';
import './Card.css';

const Card = ({ children, className = '', title }) => {
  return (
    <div className={`card ${className}`}>
      {title && <div className="card__title">{title}</div>}
      <div className="card__content">
        {children}
      </div>
    </div>
  );
};

export default Card;

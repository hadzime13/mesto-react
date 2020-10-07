import React from 'react';

function Card({ onCardClick, cardElement }) {
  const handleCLick = () => {
    onCardClick(cardElement);
  }
  return (
    (<li className="photo-elements__list-item">
      <button type="button" className="photo-elements__delete-btn"></button>
      <img className="photo-elements__image" src={cardElement.link} alt={cardElement.name} onClick={handleCLick} />
      <h2 className="photo-elements__name">{cardElement.name}</h2>
      <div className="photo-elements__like-wrapper">
        <button type="button" className="photo-elements__like"></button>
        <span className="photo-elements__like-span">{cardElement.likes.length}</span>
      </div>
    </li>)
  );
};

export default Card;
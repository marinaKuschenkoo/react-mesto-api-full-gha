import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like-container ${
    isLiked ? "element__like-active" : ""
  }`;

  const handleClick = () => props.onCardClick(props.card);
  const handleLikeClick = () => props.onCardLike(props.card);
  const handleDeleteClick = () => props.onCardDelete(props.card);
  return (
    <div className="element">
      {isOwn ? (
        <button
          className="element__trash"
          type="button"
          onClick={handleDeleteClick}
        ></button>
      ) : (
        <></>
      )}
      <img
        className="element__img"
        src={props.link}
        alt={props.name}
        onClick={handleClick}
      />
      <div className="element__container">
        <h2 className="element__descr">{props.name}</h2>
        <div className="element__likes">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="element__likes-number">{props.likes}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;

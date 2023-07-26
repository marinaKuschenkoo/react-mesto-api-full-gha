import editButton from "../images/Edit_Button.svg";
import addButton from "../images/plus.svg";
import { useEffect, useState, useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar">
          <img
            src={currentUser.avatar}
            alt="Фото профиля"
            className="profile__avatar-img"
          />
          <button
            onClick={props.onEditAvatar}
            className="profile__avatar-edit"
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={props.onEditProfile}
          >
            <img
              className="profile__edit-button-img"
              src={editButton}
              alt="Редактировать"
            />
          </button>
          <p className="profile__work">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        >
          <img src={addButton} alt="Кнопка Добавить" />
        </button>
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            link={card.link}
            name={card.name}
            likes={card.likes.length}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;

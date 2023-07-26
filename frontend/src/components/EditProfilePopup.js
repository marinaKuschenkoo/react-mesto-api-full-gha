import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.js";
import { useState, useContext, useEffect } from "react";
import React from "react";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleAboutChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      name={"edit-profile"}
      title={"Редактировать профиль"}
      textButton={props.onLoading ? `Сохранение` : `Создать`}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form">
        <label className="form__input-label">
          <input
            className={"popup__input popup__input_type_name"}
            type={"text"}
            placeholder={"Ваше имя"}
            name={"name"}
            minLength={"2"}
            maxLength={"40"}
            onChange={handleNameChange}
            value={name || ''}
            required
          />
          <span
            id={"name-error"}
            className={"popup__input-error popup__input-error_active"}
          ></span>
          <input
            className={"popup__input popup__input_type_work"}
            type={"text"}
            placeholder={"Расскажите о себе"}
            name={"about"}
            minLength={"2"}
            maxLength={"200"}
            onChange={handleAboutChange}
            value={description || ''}
            required
          />
          <span
            id={"about-error"}
            className={"popup__input-error popup__input-error_active"}
          ></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

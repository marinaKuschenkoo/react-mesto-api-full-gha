import PopupWithForm from "./PopupWithForm.js";
import { useState, useContext, useEffect, useRef } from "react";
import React from "react";
function EditAvatarPopup(props) {
  const avatarInput = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarInput.current.value);
  }
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      textButton={props.onLoading ? `Сохранение...` : `Создать`}
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <fieldset className="form">
        <label className="form__input-label">
          <input
            ref={avatarInput}
            type="url"
            className={"popup__input popup__input_type_placeImage"}
            placeholder="Ссылка на картинку"
            name="link"
            required
          />
          <span
            className="popup__input-error popup__input-error_active"
            id="url-error-avatar"
          ></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;

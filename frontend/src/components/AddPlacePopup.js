import PopupWithForm from "./PopupWithForm.js";
import { useState, useContext, useEffect } from "react";
import React from "react";
function AddPlacePopup(props) {
  const [placeName, setPlaceName] = useState("");
  const [placeLink, setPlaceLink] = useState("");

  useEffect(() => {
    setPlaceName("");
    setPlaceLink("");
  }, [props.isOpen]);

  const handlePlaceNameChange = (e) => {
    setPlaceName(e.target.value);
  };
  const handlePlaceLinkChange = (e) => {
    setPlaceLink(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onAddPlace({
      name: placeName,
      link: placeLink,
    });
  };
  return (
    <PopupWithForm
      title="Новое место"
      name="add-items"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      textButton={props.onLoading ? `Сохранение...` : `Создать`}
    >
      <fieldset className="form">
        <label className="form__input-label">
          <input
            type="text"
            className="popup__input popup__input_type_placeName"
            placeholder="Название"
            name="name"
            minLength="2"
            maxLength="30"
            onChange={handlePlaceNameChange}
            value={placeName || ""}
            required
          />
          <span
            className="popup__input-error popup__input-error_active"
            id="place-error"
          ></span>
        </label>
        <label className="form__input-label">
          <input
            type="url"
            className="popup__input popup__input_type_placeImage"
            placeholder="Ссылка на картинку"
            name="link"
            onChange={handlePlaceLinkChange}
            required
            value={placeLink || ""}
          />
          <span
            className="popup__input-error popup__input-error_active"
            id="url-error"
          ></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}
export default AddPlacePopup;

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
export const options = {
  formSelector: ".popup__form",
  submitSelector: ".popup__save-button",
  inputSelector: ".popup__input",
  inputSectionSelector: ".form__input-label",
  errorSelector: ".popup__input-error",
  disableButtonClass: "popup__save-button_inactive",
  errorActiveSelector: "popup__input-error_active",
};

export const editButton = document.querySelector(".profile__edit-button");
export const closeButton = document.querySelector(".popup__exit-button");
export const addButton = document.querySelector(".profile__add-button");
export const popup = document.querySelector(".popup");
export const elements = document.querySelector(".elements");
export const element = document.querySelector(".element");
export const popupEditProfile = document.querySelector(".popup_edit-profile");
export const popupAddItems = document.querySelector(".popup_add-items");
export const elementTemplate = document.querySelector("#element");
export const fullImgPopup = document.querySelector(".popup_full-image");
export const imgClose = document.querySelector(".popup__image-close");
export const fullImage = document.querySelector(".popup__image");
export const imgText = document.querySelector(".popup__image-text");
export const closeButtons = document.querySelectorAll(".popup__exit-button");
export const popups = document.querySelectorAll(".popup");
export const popupAddClose = document.querySelector(".popup__add-close");
export const popupEditClose = document.querySelector(".popup__edit-close");
export const formElement = popup.querySelector(".popup__form");
export const nameInput = formElement.querySelector('[name="name"]');
export const jobInput = formElement.querySelector('[name="workplace"]');
export const profileName = document.querySelector(".profile__name");
export const profileWork = document.querySelector(".profile__work");
export const saveButton = document.querySelector(".popup__save-button");
export const editProfileForm = document.querySelector(
  ".popup__form_editProfile"
);
export const addCardForm = document.querySelector(".popup__form_saveCard");
export const inputName = document.querySelector(".popup__input_type_name");
export const inputWork = document.querySelector(".popup__input_type_work");
export const inputPlaceName = document.querySelector(
  ".popup__input_type_placeName"
);
export const inputPlaceImg = document.querySelector(
  ".popup__input_type_placeImage"
);
export const formEditProfile = document.forms["profile_form"];
export const formCard = document.forms["add_form"];
export const profileAvatar = document.querySelector(".profile__avatar");
export const popupDelete = document.querySelector(".popup_delete");
export const deleteCard = document.querySelector(".element__trash");
export const editProfileButton = document.querySelector(
  ".profile__avatar_edit"
);
export const popupAvatar = document.querySelector(".popup_edit-avatar");
export const avatarForm = document.forms["avatar_form"];

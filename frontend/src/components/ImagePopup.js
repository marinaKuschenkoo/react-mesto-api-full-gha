function ImagePopup(props) {
  return (
    <div
      className={`popup popup_full-image ${props.card ? "popup_active" : ""}`}
    >
      <div className="popup__form-container popup__container">
        <div className="popup__image-container">
          <button
            className="popup__exit-button popup__image-close"
            type="button"
            onClick={props.onClose}
          ></button>
          <img
            alt={props.card ? props.card.name : ""}
            className="popup__image"
            src={props.card ? props.card.link : ""}
          />
          <figcaption className="popup__image-text">
            {props.card ? props.card.name : ""}
          </figcaption>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;

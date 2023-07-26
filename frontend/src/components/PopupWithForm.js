function PopupWithForm(props) {
  const className = `popup popup_${props.name} ${
    props.isOpen ? "popup_active" : ""
  }`;
  return (
    <section className={className}>
      <div className={"popup__form-container"}>
        <button
          className={"popup__exit-button popup__close"}
          type={"button"}
          onClick={props.onClose}
        ></button>
        <form
          className={"popup__form"}
          name={props.name}
          onSubmit={props.onSubmit}
        >
          <h2 className={"popup__form-title"}>{props.title}</h2>

          {props.children}
          <button className={"popup__save-button"} type={"submit"}>
            {props.textButton}
          </button>
        </form>
      </div>
    </section>
  );
}
export default PopupWithForm;

import successImage from '../images/success.svg'
import unsuccessImage from '../images/unSuccess.svg'
function InfoTooltip(props){
    const className = `popup popup_${props.name} ${
        props.isOpen ? "popup_active" : ""
      }`;
 return(
    <div className={className}>
      <div className="popup__form-container">
      <button
          className={"popup__exit-button popup__close"}
          type={"button"}
          onClick={props.onClose}
        ></button>
        <div className='popup__signup-container'>
            <img className="popup__signup-image" src={`${props.isSucceeded ? successImage : unsuccessImage}`} alt="" />
            <h2 className="popup__signup-title">{`${props.isSucceeded ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}`}</h2>
        </div>
      </div>
    </div>
 )
}
export default InfoTooltip
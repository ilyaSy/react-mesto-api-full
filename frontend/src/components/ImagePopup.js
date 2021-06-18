export default function ImagePopup(props){
  return (
    <div className={`popup popup_type_show ${props.card && 'popup_opened'}`}>
      <figure className="popup__card">
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        <img src={props.card?.link} alt={props.card?.name} className="popup__picture" />
        <figcaption className="popup__caption">{props.card?.name}</figcaption>
      </figure>
    </div>
  )
}
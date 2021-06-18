import React from 'react';

export default function PopupWithForm(props){
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit();
  }

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <form action="/" name={props.name} className="popup__container" noValidate onSubmit={handleSubmit}>
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        <fieldset className="popup__fieldset">
          {props.title && (<h2 className="popup__title">{props.title}</h2>)}
          {props.children}
          {props.btnName && (<button type="submit" className="popup__save-button">{props.btnName}</button>)}
        </fieldset>
      </form>
    </div>
  )
}
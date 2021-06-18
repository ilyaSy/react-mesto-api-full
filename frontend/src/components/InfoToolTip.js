import React from 'react';
import PopupWithForm from './PopupWithForm';
import registerSuccess from '../images/register_success.svg';
import registerFail from '../images/register_fail.svg';

export default function InfoToolTip(props){
  return (
    <PopupWithForm isOpen={props.isOpen} onClose={props.onClose}>
      {
        props.success ?
          (<figure className="popup__tooltip">
            <img src={registerSuccess} alt="Регистрация: успех"/>
            <figcaption className="popup__title">Вы успешно зарегистрировались</figcaption>
          </figure>) :
          (<figure className="popup__tooltip">
            <img src={registerFail} alt="Регистрация: ошибка"/>
            <figcaption className="popup__title">Что-то пошло не так! Попробуйте ещё раз.</figcaption>
          </figure>)
      }
    </PopupWithForm>
  )
}
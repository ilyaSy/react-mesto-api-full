import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function ConfirmDeletePopup(props) {
  const handleSubmit = event => { props.onDeletePlace(props.card) }

  return (
    <PopupWithForm title='Вы уверены?' name='confirm' btnName="Да" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} />
  );
}
import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup(props) {
  const inputRef = React.createRef();

  React.useEffect(() => {
    inputRef.current.value = '';
  }, [inputRef]);

  const handleSubmit = event => { props.onUpdateAvatar( {avatar: inputRef.current.value} ) } 

  return (
    <PopupWithForm title='Обновить аватар' name='ava' btnName="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input ref={inputRef} 
        type="url"
        name="profileAvatarLink"
        placeholder="Ссылка на аватар"
        className="popup__input popup__input_value_src"
        required />
      <p className="popup__error profileAvatarLink-error"></p>
    </PopupWithForm>
  );
}
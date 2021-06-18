import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]); 

  const handleSubmit = event => { props.onUpdateUser({ name, about: description }) }
  const handleChangeName = event => { setName(event.target.value) }
  const handleChangeDescription = event => { setDescription(event.target.value) }

  return (
    <PopupWithForm title='Редактировать профиль' name='edit' btnName="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input type="text"
        name="profileName"
        placeholder="Имя"
        className="popup__input popup__input_value_name"
        minLength="2"
        maxLength="40"
        required
        value={name}
        onChange={handleChangeName}/>
      <p className="popup__error profileName-error"></p>
      <input type="text"
        name="profileJob"
        placeholder="Профессия"
        className="popup__input popup__input_value_job" 
        minLength="2"
        maxLength="200"
        required
        value={description}
        onChange={handleChangeDescription}/>
      <p className="popup__error profileJob-error"></p>
    </PopupWithForm>
  );
}
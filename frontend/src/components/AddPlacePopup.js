import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]); 

  const handleSubmit = event => { props.onAddPlace({ name, link }) }
  const handleChangeName = event => { setName(event.target.value) }
  const handleChangeLink = event => { setLink(event.target.value) }

  return (
    <PopupWithForm title='Новое место' name='add' btnName="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input 
        type="text"
        name="name"
        placeholder="Название"
        className="popup__input popup__input_value_text"
        minLength="2"
        maxLength="30"
        required
        value={name}
        onChange={handleChangeName}/>
      <p className="popup__error name-error"></p>
      <input
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_value_src"
        required
        value={link}
        onChange={handleChangeLink}/>
      <p className="popup__error link-error"></p>
    </PopupWithForm>
  );
}
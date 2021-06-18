import React from 'react';
import Card from './Card';
import Loader from './Loader';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [textLoading, setTextLoading] = React.useState("Данные загружаются...");

  React.useEffect(() => {
    if (!currentUser || !props.cards) {
      setTextLoading("Данные загружаются...");
    }
  }, [currentUser, props.cards]);

  //у меня Shift + Alt + F правит только отступы!
  return (
    currentUser && props.cards ?
      (<main className="content">
        <section className="profile" aria-label="content">
          <div className="profile__avatar-container">
            <img src={currentUser.avatar} alt={`Аватар: ${currentUser.name}`} className="profile__avatar" />
            <button className="profile__edit-ava-button" onClick={props.onEditAvatar}></button>
          </div>
          <div className="profile__info">
            <div className="profile__name-block">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button type="button" className="button profile__edit-button" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
          <button type="button" className="button profile__add-button" onClick={props.onAddPlace}></button>
        </section>

        <section className="elements" aria-label="elements">
          {props.cards.map((card) => (
            <Card card={card} key={card._id}
              onCardClick={props.onCardClick}
              onDeleteClick={props.onDeleteClick}
              onCardLike={props.onCardLike} />
          )
          )}
        </section>
      </main>) :
      (<Loader text={textLoading} />)
  )
}
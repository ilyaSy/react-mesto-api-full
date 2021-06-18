import './index.css';
// import initialCards from '../js/utils/config';
import Api from '../js/components/Api';
import FormValidator from '../js/components/FormValidator';
import Card from '../js/components/Card';
import PopupWithForm from '../js/components/PopupWithForm';
import PopupWithImage from '../js/components/PopupWithImage';
import Section from '../js/components/Section';
import UserInfo from '../js/components/UserInfo';
import {
  cardPopupTmplSelector,
  cardElementSelector,
  cardElement,
  cardPopupSelector,
  profileNameSelector,
  profileJobSelector,
  profileAvatarSelector,
  confirmPopupSelector,
  likeButtonSelector,
  likeButtonActiveSelector,
  deleteButtonSelector,
  deleteButtonDisactiveSelector,
  validationObjects,
  popupInputName,
  popupInputJob,
  profileEditBtn,
  profileEditAvaBtn,
  profileAddBtn,
  popupEditForm,
  popupAddForm,
  popupAvaForm,
  tokenAuth,
  tokenGroup,
  apiURL
} from '../js/utils/constants';

const api = new Api({
  tokenAuth: tokenAuth,
  tokenGroup: tokenGroup,
  apiURL: apiURL
});

//card popup
const popupCard = new PopupWithImage(cardPopupSelector)
popupCard.setEventListeners();

//popup: confirm
const popupConfirm = new PopupWithForm({popupSelector: confirmPopupSelector});

//main section object, will set after get initial cards
const section = new Section({ renderer: (card) => {section.addItem(createCard(card))} }, cardElementSelector);

//main user Object
const user = new UserInfo(profileNameSelector, profileJobSelector, profileAvatarSelector);

function createCard(card) {
  const cardObj = new Card({ card: card, cardSelector: cardPopupTmplSelector }, popupCard.openPopup, 
    { //api actions
      likeCard: api.likeCard.bind(api), 
      deleteCard: api.deleteCard.bind(api)
    },
    { //confirm actions
      openConfirm: popupConfirm.openPopup.bind(popupConfirm),
      closeConfirm: popupConfirm.closePopup.bind(popupConfirm),
      setConfirmSubmit: popupConfirm.setEventListeners.bind(popupConfirm)
    },
  );

  const cardEl = cardObj.generate();

  //we can delete only OUR data
  if (card.owner._id !== user.id) {
    cardObj.setBtnStatus(deleteButtonSelector, deleteButtonDisactiveSelector);
  }
  
  //set active if we like it
  if (card.likes.some(c => c._id === user.id)) {
    cardObj.setBtnStatus(likeButtonSelector, likeButtonActiveSelector);
  }

  return cardEl;
}

//initialize Cards
const initializeCards = (initialCards) => { section.renderItems(initialCards.reverse()) };

//------------------           initialization        ---------------------
Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
  .then(data => {
    const userData = data[0]
    user.id = userData._id;
    user.setUserInfo({
      profileName: userData.name,
      profileJob: userData.about,
      avatar: userData.avatar
    });

    const initialCards = data[1]
    initializeCards(initialCards);
  })
  .catch(err => console.log('Ошибка: ' + err))

//------------------       popup - user profile      ---------------------
const popupProfile = new PopupWithForm({popupSelector: '.popup_type_edit',
  handleFormSubmit: (event, userData) => {
    event.preventDefault();
    
    popupProfile.setStartLoadingText();
    api.editUserInfo({
      name: userData.profileName,
      about: userData.profileJob
    })
      .then(data => {
        user.setUserInfo({
          profileName: data.name,
          profileJob: data.about,
          avatar: data.avatar
        });
        popupProfile.closePopup();
      })
      .catch(err => console.log('Ошибка: ' + err))
      .finally(popupProfile.setStopLoadingText())
  },
  handleInitialize: () => {
    const {profileName: name, profileJob: job} = user.getUserInfo();
    popupInputName.value = name;
    popupInputJob.value = job;

    validatePopupEditForm.initializeValidation();
  }
});

popupProfile.setEventListeners();

//------------------       popup - add new card      ---------------------
const popupAddCard = new PopupWithForm({popupSelector: '.popup_type_add',
  handleFormSubmit: (event, card) => {
    event.preventDefault();

    popupAddCard.setStartLoadingText();
    api.addCard(card)
      .then(data => {
        section.addItem(createCard(data));
        popupAddCard.closePopup()
      })
      .catch(err => console.log('Ошибка: ' + err))
      .finally(popupAddCard.setStopLoadingText());
  },
  handleInitialize: () => {
    validatePopupAddForm.initializeValidation();
  }
});

popupAddCard.setEventListeners();

//------------------       popup - user avatar       ---------------------
const popupProfileAva = new PopupWithForm({popupSelector: '.popup_type_ava',
  handleFormSubmit: (event, userData) => {
    event.preventDefault();

    popupProfileAva.setStartLoadingText();
    api.setUserAvatar({
      avatar: userData.profileAvatarLink
    })
      .then(data => {
        user.setUserInfo({
          profileName: data.name,
          profileJob: data.about,
          avatar: data.avatar
        });
        popupProfileAva.closePopup();
      })
      .catch(err => console.log('Ошибка: ' + err))
      .finally(popupProfileAva.setStopLoadingText())
  },
  handleInitialize: () => {
    validatePopupAvaForm.initializeValidation();
  }
});

popupProfileAva.setEventListeners();

//enable form fields validation
const validatePopupEditForm = new FormValidator(validationObjects, popupEditForm);
validatePopupEditForm.initializeValidation();
validatePopupEditForm.enableValidation();

const validatePopupAddForm = new FormValidator(validationObjects, popupAddForm);
validatePopupAddForm.initializeValidation();
validatePopupAddForm.enableValidation();

const validatePopupAvaForm = new FormValidator(validationObjects, popupAvaForm);
validatePopupAvaForm.initializeValidation();
validatePopupAvaForm.enableValidation();

//add listeners
profileEditBtn.addEventListener('click', popupProfile.openPopup);
profileAddBtn.addEventListener('click', popupAddCard.openPopup);
profileEditAvaBtn.addEventListener('click', popupProfileAva.openPopup);
import { apiURL } from '../utils/constants';

export class Api {
  constructor({ apiURL }) {
    this._apiURL = apiURL;
    this._headers = {
      // authorization: tokenAuth,
      'Content-Type': 'application/json',
    };
  }

  getInitialCards() {
    return fetch(`${this._apiURL}/cards`, { headers: this._headers, credentials: 'include' }).then(
      this._handleApiResult.bind(null, 'getInitialCards')
    );
  }

  addCard(cardData) {
    return fetch(`${this._apiURL}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(cardData),
    }).then(this._handleApiResult.bind(null, 'addCard'));
  }

  toggleLikeCard(cardId, isLiked) {
    return fetch(`${this._apiURL}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers,
      credentials: 'include'
    }).then(this._handleApiResult.bind(null, 'likeCard'));
  }

  deleteCard(cardId) {
    return fetch(`${this._apiURL}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include'
    }).then(this._handleApiResult.bind(null, 'deleteCard'));
  }

  editUserInfo(userData) {
    return fetch(`${this._apiURL}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(userData),
    }).then(this._handleApiResult.bind(null, 'editUserInfo'));
  }

  getUserInfo() {
    return fetch(`${this._apiURL}/users/me`, { headers: this._headers, credentials: 'include' }).then(
      this._handleApiResult.bind(null, 'getUserInfo')
    );
  }

  setUserAvatar(avatar) {
    return fetch(`${this._apiURL}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(avatar),
    }).then(this._handleApiResult.bind(null, 'setUserAvatar'));
  }

  _handleApiResult(fnName, res) {
    return res.ok
      ? res.json()
      : Promise.reject(`Ошибка получения результата в ${fnName}: ${res.status} ${res.statusText}`);
  }
}

const api = new Api({ apiURL: apiURL });

export default api;

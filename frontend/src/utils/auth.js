import {authURL} from './constants';

export class Auth{
  constructor(){
    this._headers = {
      'Content-Type': 'application/json'
    };
  }

  registerUser(userData){
    return fetch(`${authURL}/signup`, {method: 'POST', headers: this._headers, body: JSON.stringify(userData)})
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        else {
          return res.status === 400 ?
            Promise.reject(`Ошибка в {registerUser}: не передано одно из полей`) :
            Promise.reject(`Ошибка получения результата в {registerUser}: ${res.status} ${res.statusText}`);
        }
      })
  }

  loginUser(userData){
    return fetch(`${authURL}/signin`, {method: 'POST', headers: this._headers, body: JSON.stringify(userData)})
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        else {
          if (res.status === 400) {
            return Promise.reject(`Ошибка в {loginUser}: не передано одно из полей`)
          }
          else if (res.status === 401) {
            return Promise.reject(`Ошибка в {loginUser}: пользователь с ${userData.email} не найден`)
          }
          else {
            return Promise.reject(`Ошибка получения результата в {loginUser}: ${res.status} ${res.statusText}`);
          }
        }
      })
  }

  validateUser(jwt){
    return fetch(`${authURL}/users/me`, {method: 'GET', headers: {...this._headers, "Authorization": `Bearer ${jwt}`}})
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      else {
        if (res.status === 400) {
          return Promise.reject(`Ошибка в {validateUser}: Токен не передан или передан не в том формате`)
        }
        else if (res.status === 401) {
          return Promise.reject(`Ошибка в {validateUser}: Переданный токен некорректен`)
        }
        else {
          return Promise.reject(`Ошибка получения результата в {validateUser}: ${res.status} ${res.statusText}`);
        }
      }
    })
  }
}

const auth = new Auth();
export default auth;
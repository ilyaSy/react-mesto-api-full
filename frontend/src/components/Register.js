import React from 'react';
import {Link} from 'react-router-dom';
import { signinURL } from '../utils/constants';

export default function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleChange = event => {
    if (event.target.name === 'email') setEmail(event.target.value);
    if (event.target.name === 'password') setPassword(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault();
    props.onRegister({ email, password });
    setEmail('');
    setPassword('');
  }

  return (
    <section className="login-register">
      <h2 className="login-register__title">Регистрация</h2>
      <form action="/" name={props.type} className="login-register__form" noValidate onSubmit={handleSubmit}>
        <input type="text"
          name="email"
          placeholder="Email"
          className="login-register__input"
          minLength="5"
          maxLength="40"
          required
          value={email}
          onChange={handleChange}/>
        <input type="password"
          name="password"
          placeholder="Пароль"
          className="login-register__input" 
          minLength="5"
          maxLength="200"
          required
          value={password}
          onChange={handleChange}/>
        <button type="submit" className="login-register__submit-btn">Зарегистрироваться</button>
        <p className="login-register__already-title">
          Уже зарегистрированы ? <Link to={signinURL} className="login-register__already-login">Войти</Link>
        </p>
      </form>
    </section>
  )
}
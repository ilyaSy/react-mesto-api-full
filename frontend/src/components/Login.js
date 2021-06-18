import React from 'react';

export default function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleChange = event => {
    if (event.target.name === 'email') setEmail(event.target.value);
    if (event.target.name === 'password') setPassword(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault();
    props.onLogin({ email, password });
  }

  return (
    <section className="login-register">
      <h2 className="login-register__title">Вход</h2>
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
        <button type="submit" className="login-register__submit-btn">Войти</button>
      </form>
    </section>
  )
}
import { useEffect, useState, useContext } from "react";
function Login(props) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin(formValue.email, formValue.password);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }
  return (
    <div className="login">
      <p className="login__header">Вход</p>
      <form className="login__form" onSubmit={handleSubmit} name="login">
        <input
          className="login__input"
          name="email"
          type="email"
          value={formValue.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="login__input"
          name="password"
          type="password"
          value={formValue.password}
          placeholder="Пароль"
          onChange={handleChange}
        />
        <button type="submit" className="login__btn">
          Войти
        </button>
      </form>
    </div>
  );
}
export default Login;

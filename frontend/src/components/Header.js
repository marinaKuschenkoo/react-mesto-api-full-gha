import logo from "../images/logo.svg";
import { Link, Route, Routes } from "react-router-dom";
function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место" />
      <Routes>
        <Route
          exact
          path="/sign-in"
          element={
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          }
        />
        <Route
          exact
          path="/sign-up"
          element={
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          }
        />
        <Route
          exact
          path="/"
          element={
            <div className="header__links">
              <p className="header__email">{props.email}</p>
              <Link
                className="header__link header__link_logout"
                to="/sign-in"
                onClick={props.onLogOut}
              >
                Выйти
              </Link>
            </div>
          }
        />
      </Routes>
    </header>
  );
}
export default Header;

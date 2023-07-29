/* eslint-disable react-hooks/exhaustive-deps */
/*import logo from './logo.svg';*/
import { useEffect, useState, useContext } from "react";
import {
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "../App.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import avatar from "../images/Avatar.png";
import api from "../utils/Api.js";
import Login from "../components/Login.js";
import Register from "../components/Register.js";
import InfoTooltip from "../components/InfoTooltip.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import ProtectedRoute from "./ProtectedRoute";
import auth from "../utils/Auth.js";

function App() {
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    /*name: "Имя пользователя",
    about: "О пользователе",
    avatar: avatar,*/
    name: "",
    about: "",
    avatar: "",
    _id: "",
    email: "",
  });
 // const [emailUserHeader, setEmailUserHeader] = useState('');
  const [isSucceeded, setIsSucceeded] = useState(false);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  


  //регистрация
  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        setIsInfoTooltipOpen(true);
        setIsSucceeded(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setIsSucceeded(false);
        console.log(`Ошибка: ${err}`);
      });
  }

  //авторизация
  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((res) => {
          console.log('qqqqqqqq')
          localStorage.setItem("jwt", res.token);
          console.log('wwwwwwwww')
          setIsLoggedIn(true);
          console.log('eeeeee')
          navigate("/", { replace: true });
          console.log('rrrrrrr')
          setUserEmail(res.user.email);
          console.log('ttttttttt')
          
        
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setIsSucceeded(false);
        console.log(`Ошибка: ${err}`);
      });
  }

  //сверим токен и авторизацию
  function handleToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          console.log('yyyyyyyy')
          if (res) {
            console.log('uuuuuuuuuu')
            setIsLoggedIn(true);
            console.log('iiiiiiiiii')
            setUserEmail(res.user.email);
            console.log('oooooooo')
            navigate('/');
          }

        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  useEffect(() => {
    handleToken();
  }, [isLoggedIn]); //  loggedIn
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }


  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData.user);
          setCards(cardsData.cards);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  const handleDeleteCardClick = (card) => {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((item) =>
          item._id === card._id ? null : item
        );
        setCards(newCards);
      })
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard.data : c))
        );
      })
      .catch((err) => console.log(`Error: ${err}`));
  };

  const handleUpdateUser = (data) => {
    setIsLoading(true);
    api
      .changeUserInfo(data)
      .then((res) => {
        setCurrentUser(res.user);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = (data) => {
    setIsLoading(true);
    api
      .editAvatar(data)
      .then((res) => {
        setCurrentUser(res.user);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddPlaceSubmit = (card) => {
    setIsLoading(true);
    api
      .createNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header onLogOut={handleLogout} email={userEmail} />
          <Routes>
            <Route
              path="/sign-up"
              element={<Register onRegister={handleRegister} />}
            />
            <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={Main}
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardDelete={handleDeleteCardClick}
                  onCardLike={handleCardLike}
                />
              }
            />
          </Routes>
          {isLoggedIn ? <Footer /> : ""}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onLoading={isLoading}
            onAddPlace={handleAddPlaceSubmit}
            onClose={closeAllPopups}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            name={"info"}
            isSucceeded={isSucceeded}
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

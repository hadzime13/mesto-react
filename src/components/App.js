import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup';
import api from './utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {
  // Переменные состояния
  // Массив карточек 
  const [cards, setCards] = React.useState([]);
  //открыт попап профиля или нет 
  const [isEditProfilePopupOpen, setPopupProfileState] = React.useState(false);
  //открыт попап добавления карточки или нет 
  const [isAddPlacePopupOpen, setPopupPlaceState] = React.useState(false);
  // открыт попап редактирования аватара или нет 
  const [isEditAvatarPopupOpen, setPopupAvatarState] = React.useState(false);
  // Активна ли кнопка редактирования аватара
  const [isAvatarEditButtonActive, setAvatarEditButton] = React.useState(false);
  // выбор карточки
  const [selectedCard, setSelectedCard] = React.useState({});
  // Пользователь
  const [currentUser, setCurrentUser] = React.useState({});
  // Функция добавления карточки
  const handleAddPlaceSubmit = (cardData) => {
    api.uploadCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((res) => {
        api.handleResponseError(res);
      })
  }

  // Функция поддержки лайков
  const handleCardLike = (card) => {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    api.changeLikeStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((res) => {
        api.handleResponseError(res);
      })
  };
  // Функция удаления карточки
  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((res) => {
        api.handleResponseError(res);
      })
  }

  // Обработчики открытия попапов
  const handleEditAvatarClick = () => {
    setPopupAvatarState(true);
  };
  const handleEditProfileClick = () => {
    setPopupProfileState(true);
  };
  const handleAddPlaceClick = () => {
    setPopupPlaceState(true);
  };
  // Функция закрытия попапов
  const closeAllPopups = () => {
    setPopupAvatarState(false);
    setPopupProfileState(false);
    setPopupPlaceState(false);
    setSelectedCard({});
  };
  const handleCardClick = (cardElement) => {
    setSelectedCard(cardElement);
  };
  // Обработчик кнопки редактирования аватара
  const handleEditAvatarOn = () => {
    setAvatarEditButton(true);
  }
  const handleEditAvatarOff = () => {
    setAvatarEditButton(false);
  }
  // Функция обновления инфо о юзере при сабмите
  const handleUpdateUser = (userData) => {
    api.updateUser(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((res) => {
        api.handleResponseError(res);
      })
  }
  // Функция обновления аватара при сабмите
  const handleUpdateAvatar = (newAvatar) => {
    api.updateUserAvatar(newAvatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((res) => {
        api.handleResponseError(res);
      })
  }

  // Получение инфо о юзере при загрузке страницы
  React.useEffect(() => {
    api.getUser()
      .then((res) => {
        setCurrentUser(res)
      }
      )
  }, []);

  // Загрузка карточек страницы 
  React.useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((res) => {
        api.handleResponseError(res);
      })
  }, []);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <div className="page__container">
          <Header />
          <Main
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onMouseOnAvatar={handleEditAvatarOn}
            onMouseOffAvatar={handleEditAvatarOff}
            isAvatarButtonActive={isAvatarEditButtonActive}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete} />
          <Footer />
        </div>
        {/* Попап редактирования профиля */}
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        {/* Попап добавления карточки */}
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        {/* Попап редактирования аватара */}
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        {/* Попап полноразмерного фото карточки */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </>
    </CurrentUserContext.Provider>
  );
}


export default App;

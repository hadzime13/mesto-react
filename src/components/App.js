import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {
  const [isEditProfilePopupOpen, setPopupProfileState] = React.useState(false);
  const [isAddPlacePopupOpen, setPopupPlaceState] = React.useState(false);
  const [isEditAvatarPopupOpen, setPopupAvatarState] = React.useState(false);
  const [isAvatarEditButtonActive, setAvatarEditButton] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

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

  return (
    <>
      <div className="page__container">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onMouseOnAvatar={handleEditAvatarOn}
          onMouseOffAvatar={handleEditAvatarOff}
          isAvatarButtonActive={isAvatarEditButtonActive}
          onCardClick={handleCardClick} />
        <Footer />
      </div>
      {/* Попап редактирования профиля */}
      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        title="Редактировать профиль"
        name="profile"
        buttonText="Сохранить">
        <>
          <input type="text" placeholder="Имя" name="input-name" id="input-name" defaultValue=""
            className="popup__text popup__text_el_name" required minLength="2" maxLength="40" />
          <span className="popup__error" id="input-name-error"></span>

          <input type="text" placeholder="Профессия" name="input-job" id="input-job" defaultValue=""
            className="popup__text popup__text_el_job" required minLength="2" maxLength="200" />
          <span className="popup__error" id="input-job-error"></span>
        </>
      </PopupWithForm>
      {/* Попап добавления карточки */}
      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        title="Новое место"
        name="cards"
        buttonText="Создать">
        <>
          <input type="text" placeholder="Название" name="input-place" id="input-place" defaultValue=""
            className="popup__text popup__text_el_place" required minLength="1" maxLength="40" />
          <span className="popup__error" id="input-place-error"></span>

          <input type="url" placeholder="Ссылка на картинку" name="input-link" id="input-link" defaultValue=""
            className="popup__text popup__text_el_image-link" required />
          <span className="popup__error" id="input-link-error"></span>
        </>
      </PopupWithForm>
      {/* Попап подтверждения удаления карточки */}
      <PopupWithForm
        onClose={closeAllPopups}
        title="Вы уверены?"
        name="confirm"
        buttonText="Да"
      />
      {/* Попап редактирования аватара */}
      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        title="Обновить аватар"
        name="avatar"
        buttonText="Сохранить">
        <>
          <input type="url" placeholder="Ссылка на avatar" name="input-avatarLink" id="input-avatarLink" defaultValue=""
            className="popup__text popup__text_el_image-link" required />
          <span className="popup__error" id="input-avatarLink-error"></span>
        </>
      </PopupWithForm>
      {/* Попап полноразмерного фото карточки */}
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </>
  );
}


export default App;

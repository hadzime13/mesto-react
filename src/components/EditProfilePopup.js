import React from 'react';
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

//Попап редактирования профиля
const EditProfilePopup = React.memo(({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState();
  const [description, setDescription] = React.useState();
  const handleChange = (e) => {
    e.target.name === 'input-name' ? setName(e.target.value) : setDescription(e.target.value);
  }
  // Функция сброса полей при закрытии попапа 
  const onClosePopup = () => {
    onClose();
    setDescription(currentUser.about);
    setName(currentUser.name);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return <PopupWithForm
    isOpen={isOpen}
    onClose={onClosePopup}
    title="Редактировать профиль"
    name="profile"
    buttonText="Сохранить"
    onSubmit={handleSubmit}>
    <>
      <input type="text" placeholder="Имя" name="input-name" id="input-name" value={name ? name : ''}
        className="popup__text popup__text_el_name" required minLength="2" maxLength="40" onChange={handleChange} />
      <span className="popup__error" id="input-name-error"></span>

      <input type="text" placeholder="Профессия" name="input-job" id="input-job" value={description ? description : ''}
        className="popup__text popup__text_el_job" required minLength="2" maxLength="200" onChange={handleChange} />
      <span className="popup__error" id="input-job-error"></span>
    </>
  </PopupWithForm>
});

export default EditProfilePopup;
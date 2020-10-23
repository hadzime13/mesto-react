import React from 'react';
import PopupWithForm from './PopupWithForm'

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  
  const handleChange = (e) => {
    e.target.name === 'input-place' ? setName(e.target.value) : setLink(e.target.value);
  }
  // Функция сброса полей при закрытии попапа со сбросом полей
  const onClosePopup = () => {
    onClose ();
    setLink('');
    setName('');
  } 
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({ name, link });
    setLink('');
    setName('');
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClosePopup}
      title="Новое место"
      name="cards"
      buttonText="Создать"
      onSubmit={handleSubmit}>
      <>
        <input type="text" placeholder="Название" name="input-place" id="input-place" value={name}
          className="popup__text popup__text_el_place" required minLength="1" maxLength="40" onChange={handleChange} />
        <span className="popup__error" id="input-place-error"></span>

        <input type="url" placeholder="Ссылка на картинку" name="input-link" id="input-link" value={link}
          className="popup__text popup__text_el_image-link" required onChange={handleChange} />
        <span className="popup__error" id="input-link-error"></span>
      </>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
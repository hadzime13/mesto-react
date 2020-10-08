import React from 'react';

function PopupWithForm({ isOpen, onClose, title, name, buttonText, children }) {
  return (
    <section className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <form action="#" method="POST" className="popup__container" noValidate>
        <button type="reset" aria-label="Закрыть" className="popup__close-btn" onClick={onClose}></button>
        <h2 className="popup__name">
          {title}
        </h2>
        <fieldset className="popup__input-form">
          {children}
          <button type="submit" className="popup__save-btn">
            {buttonText}
          </button>
        </fieldset>
      </form>
    </section>
  );
}
export default PopupWithForm;
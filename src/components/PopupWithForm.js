import React from 'react';


const PopupWithForm = React.memo(({ isOpen, onClose, title, name, buttonText, children, onSubmit }) => {
  // Реф для ссылки на валидируемую форму
  const formRef = React.useRef();


  // React.useEffect(() => {
  //   const test = new FormValidator(formClassNames, formRef.current);
  //   test.enableValidation();
  // }, [])


  return (
    <section className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <form action="#" method="POST" className="popup__container" noValidate onSubmit={onSubmit} ref={formRef}>
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
});
export default PopupWithForm;
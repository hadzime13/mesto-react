import React from 'react';
import avatarEdit from '../images/Vector.svg'
import Card from './Card'
import api from './utils/Api'

function Main({ onEditProfile, onAddPlace, onEditAvatar, onMouseOnAvatar, onMouseOffAvatar, isAvatarButtonActive, onCardClick }) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('#');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUser()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      });
  }, []);

  React.useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      });
  }, []);

  return (
    <main className="content">

      <section className="profile section section_standard">
        <div className="profile__overlay">
          <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }}
            onMouseEnter={onMouseOnAvatar}
            onMouseLeave={onMouseOffAvatar}
            onClick={onEditAvatar} >
            <img src={avatarEdit} alt="Изменить аватар" className={`profile__avatar-edit-btn ${isAvatarButtonActive && 'profile__avatar-edit-btn_active'}`}
            />
          </div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button type="button" aria-label="Редактировать" className="profile__edit-btn" onClick={onEditProfile}>
          </button>
          <p className="profile__job">{userDescription}</p>
        </div>
        <button type="button" aria-label="Добавить" className="profile__add-btn" onClick={onAddPlace}>
        </button>
      </section>

      <section className="photo-elements section section_standard" aria-label="Места">
        <ul className="photo-elements__list">
          {cards.map((card) =>
            <Card key={card._id} cardElement={card} onCardClick={onCardClick} />)}
        </ul>
      </section>
    </main>
  );
};

export default Main;


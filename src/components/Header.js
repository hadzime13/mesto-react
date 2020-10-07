import React from 'react';
import logo from '../images/logo.svg';
function Header () {
  return (
      <header className="header section section_standard">
        <img src={logo} alt="Логотип Место" className="logo" />
      </header>
  );
}

export default Header;

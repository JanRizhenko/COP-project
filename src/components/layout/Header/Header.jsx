import React from 'react';
import './Header.css';

const Header = ({ title = "Tower of Hanoi" }) => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="header__title">{title}</h1>
        <p className="header__subtitle">Classic Mathematical Puzzle</p>
      </div>
    </header>
  );
};

export default Header;

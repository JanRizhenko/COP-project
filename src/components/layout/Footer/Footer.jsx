import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__text">
          2026 Tower of Hanoi | Educational Project | Made By Rizhenko Jan
        </p>
        <p className="footer__legal">
          <Link to="/privacy">Політика конфіденційності</Link>
          <span aria-hidden="true"> · </span>
          <Link to="/guide">Інструкція користувача</Link>
          <span aria-hidden="true"> · </span>
          <a href={`${process.env.PUBLIC_URL || ''}/LICENSE`} target="_blank" rel="noreferrer">
            Ліцензія MIT
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

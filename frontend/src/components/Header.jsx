import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

function Header({ onLoginClick }) {
  return (
    <header className="header">
      <div className="header-container">
        <NavLink to="/" className="logo">
          <img src="src/images/biyahero-logo.png" alt="Biyahero Logo" />
          <span>Biyahero</span>
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/" end activeclassname="active">Book Ticket</NavLink>
          <NavLink to="/manage-booking" activeclassname="active">Manage Booking</NavLink>
          <NavLink to="/travel-info" activeclassname="active">Travel Info</NavLink>
          <NavLink to="/about" activeclassname="active">About Us</NavLink>
        </nav>
        <button className="login-button" onClick={onLoginClick}>Log In</button>
      </div>
    </header>
  );
}

export default Header;

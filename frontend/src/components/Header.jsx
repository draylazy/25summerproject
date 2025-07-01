import React, { useState } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

function Header({ onLoginClick, username, role, onLogout, darkMode, toggleDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <NavLink to="/" className="logo">
          <img src="src/images/biyahero-logo.png" alt="Biyahero Logo" />
          <span>Biyahero</span>
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" end activeclassname="active">
            Book Ticket
          </NavLink>

          {role === "ADMIN" ? (
            <NavLink to="/manage-booking" activeclassname="active">
              Admin Dashboard
            </NavLink>
          ) : (
            <NavLink to="/usermanage-booking" activeclassname="active">
              Manage Booking
            </NavLink>
          )}

          <NavLink to="/travel-info" activeclassname="active">
            Travel Info
          </NavLink>
          <NavLink to="/about" activeclassname="active">
            About Us
          </NavLink>
        </nav>

        <div className="header-actions">
          {/* 🌙 Dark Mode Toggle */}
          <button
            className="darkmode-toggle"
            onClick={toggleDarkMode}
            title="Toggle Dark Mode"
          >
            {darkMode ? "🌙 Dark" : "☀️ Light"}
          </button>

          {username ? (
            <div
              className="user-menu"
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button className="username-button">
                {username}
              </button>
              {menuOpen && (
                <div className="dropdown">
                  <button
                    className="logout-button"
                    onClick={onLogout}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="login-button" onClick={onLoginClick}>
              Log In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

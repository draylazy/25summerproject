import React, { useState } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import MaterialUISwitch from './MaterialUISwitch';
import ProfileModal from './ProfileModal'; // ✅ New import
import ChangePasswordModal from "./ChangePasswordModal";


function Header({ onLoginClick, username, role, onLogout, darkMode, toggleDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false); // ✅ Modal state
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);


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
          {role === "ADMIN" ? (
          <NavLink to="/refund-requests" activeclassname="active">
            Manage Refunds
          </NavLink>
          ) :(<NavLink to="/travel-info" activeclassname="active">
            Travel Info
          </NavLink>)}
          <NavLink to="/about" activeclassname="active">
            About Us
          </NavLink>
        </nav>

        <div className="header-actions">
          <MaterialUISwitch
            checked={darkMode}
            onChange={toggleDarkMode}
          />

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
                    className="dropdown-button"
                    onClick={() => setShowProfileModal(true)}
                  >
                    View Profile
                  </button>
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

      <ProfileModal
  open={showProfileModal}
  username={username}
  role={role}
  email={"user@example.com"}       
  firstName={"Juan"}
  lastName={"Dela Cruz"}
  onClose={() => setShowProfileModal(false)}
  onChangePassword={() => {
    setShowProfileModal(false);
    setShowChangePasswordModal(true);
  }}
/>
    <ChangePasswordModal
  open={showChangePasswordModal}
  username={username}
  onClose={() => setShowChangePasswordModal(false)}
    />


    </header>
  );
}

export default Header;

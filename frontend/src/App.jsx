import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import BookingForm from './components/BookingForm';
import TravelHistory from './components/TravelHistory';
import About from './components/Aboutus';
import Contact from './components/Contact';
import LoginModal from './components/LoginModal';
import PaymentPage from './components/PaymentPage';
import PromoSection from './components/Promos';
import ManageBookings from './components/ManageBookings';
import LogoutPopup from './components/LogoutPopup';
import UserManageBookings from './components/UserManageBookings';

function AppContent() {
  const [loginOpen, setLoginOpen] = useState(false);

  const [loggedInUsername, setLoggedInUsername] = useState(() =>
    localStorage.getItem("biyaheroUsername")
  );
  const [loggedInRole, setLoggedInRole] = useState(() =>
    localStorage.getItem("biyaheroRole")
  );

  const [darkMode, setDarkMode] = useState(() =>
  localStorage.getItem("biyaheroDarkMode") === "true"
  );

  useEffect(() => {
  const body = document.body;
  if (darkMode) {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }
  localStorage.setItem("biyaheroDarkMode", darkMode);
  }, [darkMode]);

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowLogoutPopup(true);
    setTimeout(() => {
      setLoggedInUsername(null);
      setLoggedInRole(null);
      localStorage.removeItem("biyaheroUsername");
      localStorage.removeItem("biyaheroRole");
      setShowLogoutPopup(false);
      navigate("/");
    }, 2000);
  };

  const isAuthenticated = !!loggedInUsername;

  return (
    <>
      <Header
  onLoginClick={() => setLoginOpen(true)}
  username={loggedInUsername}
  role={loggedInRole}
  onLogout={handleLogout}
  darkMode={darkMode}
  toggleDarkMode={() => setDarkMode(!darkMode)}
  />


      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <BookingForm
                isAuthenticated={isAuthenticated}
                requireLogin={() => setLoginOpen(true)}
              />
              <PromoSection />
            </>
          }
        />
        <Route
          path="/manage-booking"
          element={
            isAuthenticated ? <ManageBookings /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/usermanage-booking"
          element={
            isAuthenticated ? <UserManageBookings /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/travel-info"
          element={
            isAuthenticated ? <TravelHistory /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/payment"
          element={
            isAuthenticated ? <PaymentPage /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/about"
          element={
            <>
              <About />
              <Contact />
            </>
          }
        />
      </Routes>

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={(username, role) => {
          setLoggedInUsername(username);
          setLoggedInRole(role);
          localStorage.setItem("biyaheroUsername", username);
          localStorage.setItem("biyaheroRole", role);
        }}
      />

      {showLogoutPopup && <LogoutPopup />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

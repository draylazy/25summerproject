import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

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

// Move app logic here so we can use useNavigate
function AppContent() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState(() => {
    return localStorage.getItem("biyaheroUsername");
  });
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowLogoutPopup(true);
    setTimeout(() => {
      setLoggedInUsername(null);
      localStorage.removeItem("biyaheroUsername");
      setShowLogoutPopup(false);
      navigate("/"); // Redirect to Booking Form
    }, 2000);
  };

  return (
    <>
      <Header
        onLoginClick={() => setLoginOpen(true)}
        username={loggedInUsername}
        onLogout={handleLogout}
      />

      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <BookingForm />
            <PromoSection />
          </>
        } />
        <Route path="/manage-booking" element={<ManageBookings />} />
        <Route path="/travel-info" element={<TravelHistory />} />
        <Route path="/about" element={
          <>
            <About />
            <Contact />
          </>
        } />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={(username) => {
          setLoggedInUsername(username);
          localStorage.setItem("biyaheroUsername", username);
        }}
      />

      {showLogoutPopup && <LogoutPopup />}
    </>
  );
}

// This stays simple
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

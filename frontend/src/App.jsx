import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import BookingForm from './components/BookingForm';
import TravelHistory from './components/TravelHistory';
import About from './components/Aboutus';
import Contact from './components/Contact';
import LoginModal from './components/LoginModal';
import Trips from './components/Trips';
import PaymentPage from './components/PaymentPage';
import PromoSection from './components/Promos';
import ManageBookings from './components/ManageBookings'; 

function App() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <Router>
      <Header onLoginClick={() => setLoginOpen(true)} />
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

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </Router>
  );
}

export default App;

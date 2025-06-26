import React from 'react';
import './Features.css';

function Features() {
  return (
    <section className="features-section" id="features">
      <div className="features-container">
        <h2>Why Choose Biyahero?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <img src="secure-icon.jpg" alt="Secure Payments" />
            <h3>Secure Payments</h3>
            <p>Your transactions are protected with industry-leading security protocols.</p>
          </div>
          <div className="feature-card">
            <img src="support-icon.jpg" alt="Customer Support" />
            <h3>24/7 Customer Support</h3>
            <p>Our friendly support team is always ready to help you with your bookings.</p>
          </div>
          <div className="feature-card">
            <img src="easy-icon.jpg" alt="Easy Booking" />
            <h3>Easy Booking</h3>
            <p>Intuitive interface that makes booking your bus ticket fast and hassle-free.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features
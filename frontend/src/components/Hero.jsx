import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Book Your Bus Tickets Quickly & Easily</h1>
          <p>Find the best routes, compare prices, and reserve your seat in just a few clicks. Travel smart with Biyahero.</p>
          <a href="#booking" className="hero-button">Book Now</a>
        </div>
        <div className="hero-image">
          <img src="src/images/terminalhero.avif" alt="Bus traveling" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
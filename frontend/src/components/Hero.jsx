import React, { useState, useEffect } from 'react';
import './Hero.css';

const images = [
  'src/images/terminalhero.avif',
  'src/images/busterminal1.webp',
  'src/images/busterminal2.webp',
  'src/images/busterminal3.webp'
];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]); // include currentIndex so it restarts timer on change

  const handlePrev = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === 0 ? images.length - 1 : prev - 1
      );
      setIsFading(false);
    }, 300); // matches fade duration
  };

  const handleNext = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setIsFading(false);
    }, 300);
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Book Your Bus Tickets Quickly & Easily</h1>
          <p>
            Find the best routes, compare prices, and reserve your seat in just
            a few clicks. Travel smart with Biyahero.
          </p>
          <a href="#booking" className="hero-button">
            Book Now
          </a>
        </div>
        <div className="hero-image">
          <button className="arrow left" onClick={handlePrev}>
            &#10094;
          </button>
          <img
            src={images[currentIndex]}
            alt="Bus terminal"
            className={`slider-image ${isFading ? 'fade' : ''}`}
          />
          <button className="arrow right" onClick={handleNext}>
            &#10095;
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;

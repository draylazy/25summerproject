import React from 'react';
import './Promos.css';

const promoData = [
  {
    terminal: 'Cebu North Bus Terminal',
    discount: '13% Off',
    description: 'Enjoy a 13% discount when you book from Cebu North Bus Terminal this June!',
  },
  {
    terminal: 'Carcar Bus Terminal',
    discount: '5% Off',
    description: 'Ride from Carcar Bus Terminal and get 5% off your ticket price.',
  },
  {
    terminal: 'Daanbantayan Bus Terminal',
    discount: '20% Off',
    description: 'Book from Daanbantayan Bus Terminal and save more on your next trip!',
  },
];

function PromoSection() {
  return (
    <section className="promo-section">
      <div className="promo-container">
        <h2>Terminal Promos</h2>
        <div className="promo-cards">
          {promoData.map((promo, index) => (
            <div className="promo-card" key={index}>
              <h3>Book From: <span className="terminal">{promo.terminal}</span></h3>
              <p className="discount">{promo.discount}</p>
              <p className="desc">{promo.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PromoSection;

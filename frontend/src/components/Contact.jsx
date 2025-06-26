import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <h2 className="contact-title">Get in Touch</h2>
        <form className="contact-form">
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Your full name" required />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="you@example.com" required />
          </div>
          <div className="full-width">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Write your message here..." required rows="4"></textarea>
          </div>
          <div className="full-width">
            <button type="submit">Send Message</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;

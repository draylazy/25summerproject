import React, { useEffect } from 'react';
import './Aboutus.css';
 import { Helmet } from 'react-helmet';

function AboutUs() {
  useEffect(() => {
  document.title = "Biyahero | About Us";
    }, []);
  return (
     <>
      <Helmet>
        <title>Biyahero | About Us</title>
      </Helmet>
    <div className="aboutus-container">
 
       <section className="motto-section">
          <h1>Alagang Biyahero — Travel Smarter, Ride Better.</h1>
        </section>

        <section className="objectives-section">
  <h2>Our Objectives</h2>
  <div className="objectives-grid">
    <div className="objective">
      <div className="image-container">
        <img src="src/images/booking.png" alt="Digitize Terminal Bookings" />
        <div className="tooltip">
          Streamline the ticketing and reservation process by offering a fast, user-friendly online booking system accessible via web or mobile.
        </div>
      </div>
      <p className="objective-title">Digitize Terminal Bookings</p>
    </div>

    <div className="objective">
      <div className="image-container">
        <img src="src/images/travel.png" alt="Enhance Travel Convenience" />
        <div className="tooltip">
          Provide real-time schedules, trip management, and support features to reduce wait times and increase traveler confidence.
        </div>
      </div>
      <p className="objective-title">Enhance Travel Convenience</p>
    </div>

    <div className="objective">
      <div className="image-container">
        <img src="src/images/admin.png" alt="Empower Commuters & Admins" />
        <div className="tooltip">
          Offer tools for both passengers and terminal staff/admins to manage bookings, monitor trips, and ensure smooth operations.
        </div>
      </div>
      <p className="objective-title">Empower Commuters & Admins</p>
    </div>

    <div className="objective">
      <div className="image-container">
        <img src="src/images/safe.png" alt="Promote Safe & Smart Travel" />
        <div className="tooltip">
          Encourage digital adoption in public transport while integrating safety, reliability, and alaga into every step of the journey.
        </div>
      </div>
      <p className="objective-title">Promote Safe & Smart Travel</p>
    </div>
  </div>
</section>

 
      <section className="testimonials-section" id="team">
        <div className="testimonials-container">
          <h2>Meet the Team</h2>
          <div className="testimonials-grid">
            <div className="testimonial">
              <img src="src/images/cropped_circle_bajamunde.png" alt="Louie Bajamunde" />
              <h4>Louie Bajamunde</h4>
              <p>Founder & Developer</p>
            </div>
            <div className="testimonial">
              <img src="src/images/zydney.jpg" alt="Jhon Zydney Belia" />
              <h4>Jhon Zydney Belia</h4>
              <p>Founder & Developer</p>
            </div>
            <div className="testimonial">
              <img src="src/images/james.jpg" alt="James Adriane Queddeng" />
              <h4>James Adriane Queddeng</h4>
              <p>Founder & Developer</p>
            </div>
          </div>
        </div>
      </section>
 
 
      <section className="about-grid-section">
  <div className="about-grid">
    <div className="desc-text">
      <h3>Who We Are</h3>
      <p>
        Biyahero is transforming terminal travel through smart, people-centered technology.
        With speed, safety, and <em>alaga</em> at its core, our platform empowers users to
        book with confidence — no lines, no stress. We're not just moving passengers, we're
        moving the future of Filipino mobility.
      </p>
    </div>
    <div className="desc-image">
      <img src="src/images/busterminal3.webp" alt="Biyahero Terminal" />
    </div>
    <div className="desc-image">
      <img src="src/images/busterminal1.webp" alt="Biyahero Mission" />
    </div>
    <div className="desc-text">
      <p>
        Biyahero was founded with a vision to modernize terminal-based travel in the Philippines.
        Recognizing the gaps in convenience, digital access, and efficiency, we set out to design
        a system that meets the growing demand for smarter, faster, and more reliable booking
        experiences. Biyahero brings together technology and care to move Filipinos forward one
        trip at a time.
      </p>
    </div>
  </div>
</section>
 
 
    </div>
    </>
  );
}
 
export default AboutUs;
 
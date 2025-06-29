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
 
      {/* Motto Section */}
<section className="motto-section">
  <h1>Alagang Biyahero — Travel Smarter, Ride Better.</h1>
</section>
 
{/* Objectives Section */}
<section className="objectives-section">
  <h2>Our Objectives</h2>
  <div className="objectives-grid">
    <div className="objective">Digitize Terminal Bookings</div>
    <div className="objective">Enhance Travel Convenience</div>
    <div className="objective">Empower Commuters & Admins</div>
    <div className="objective">Promote Safe & Smart Travel</div>
  </div>
</section>
 
 
      {/* Meet the Team Section (formerly Testimonials) */}
      <section className="testimonials-section" id="team">
        <div className="testimonials-container">
          <h2>Meet the Team</h2>
          <div className="testimonials-grid">
            <div className="testimonial">
              <img src="/team/louie.jpg" alt="Louie Bajamunde" />
              <h4>Louie Bajamunde</h4>
              <p>Founder & Developer</p>
            </div>
            <div className="testimonial">
              <img src="/team/jhon.jpg" alt="Jhon Zydney Belia" />
              <h4>Jhon Zydney Belia</h4>
              <p>Founder & Developer</p>
            </div>
            <div className="testimonial">
              <img src="/team/james.jpg" alt="James Adriane Queddeng" />
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
      <img src="/images/busterminal3.webp" alt="Biyahero Terminal" />
    </div>
    <div className="desc-image">
      <img src="/images/busterminal1.webp" alt="Biyahero Mission" />
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
 
import React, { useRef, useEffect, useState } from 'react';
import './LoginModal.css';

function LoginModal({ open, onClose }) {
  const modalRef = useRef(null);
  const [showSuccess, setShowSuccess] = useState(false); // <-- new state

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onClose]);

  const handleLogin = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose(); // close modal after showing success
    }, 2000);
  };

  if (!open) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="login-modal-title">
      <div className="modal-content" ref={modalRef}>
        <button onClick={onClose} className="close-button" aria-label="Close login modal">
          <i className="fas fa-times fa-lg"></i>
        </button>
        <img src="src/images/biyahero-logo.png" alt="Biyahero Logo" className="login-logo" />
        <h3 id="login-modal-title">Log In to BIYAHERO</h3>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email-login">Email</label>
            <input type="email" id="email-login" name="email-login" required placeholder="you@example.com" />
          </div>

          <div className="form-group">
            <label htmlFor="password-login">Password</label>
            <input type="password" id="password-login" name="password-login" required placeholder="Enter your password" />
          </div>

          <button type="submit">Log In</button>

          <div className="divider"><span>or log in with</span></div>

          <div className="social-login">
            <button type="button" className="social-button google">
              <img src="src/images/google1.png" alt="Google logo" className="social-icon" />
              Google
            </button>

            <button type="button" className="social-button facebook">
              <img src="src/images/facebook.png" alt="Facebook logo" className="social-icon" />
              Facebook
            </button>
          </div>

          <div className="bottom-text">
            <hr />
            <p>Don’t have an account? <a href="#">Sign up</a></p>
          </div>
        </form>
      </div>

      {showSuccess && (
        <div className="login-success-popup">
          <div className="popup-content">
            <h3>✅ Login Successful!</h3>
            <p>Welcome back, Biyahero!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginModal;

import React, { useRef, useEffect, useState } from 'react';
import './LoginModal.css';

function LoginModal({ open, onClose, onLoginSuccess }) {
  const modalRef = useRef(null);
  const [isSignup, setIsSignup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [localAlert, setLocalAlert] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target["email"].value;
    const password = e.target["password"].value;
    const firstName = e.target["firstName"]?.value;
    const lastName = e.target["lastName"]?.value;
    const username = e.target["username"]?.value;

    if (password.length < 6) {
      setLocalAlert("⚠️ Password must be at least 6 characters.");
      return;
    }

    const body = isSignup
      ? { email, password, firstName, lastName, username }
      : { email, password };

    try {
      const endpoint = isSignup ? "signup" : "login";
      const response = await fetch(`http://localhost:8080/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        if (isSignup) {
          setLocalAlert("✅ Account created! You can now log in.");
          setIsSignup(false);
        } else {
          const data = await response.json();

          if (onLoginSuccess && data.username && data.role) {
            onLoginSuccess(data.username, data.role);
          }

          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
            onClose();
          }, 2000);
        }
      } else {
        const errorText = await response.text();
        setLocalAlert(errorText || "⚠️ An error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
      setLocalAlert("⚠️ A network error occurred.");
    }
  };

  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div className="modal-content" ref={modalRef}>
        <i className="fas fa-times fa-lg"></i>
        <img
          src="src/images/biyahero-logo.png"
          alt="Biyahero Logo"
          className="login-logo"
        />
        <h3 id="login-modal-title">
          {isSignup ? "Sign Up for BIYAHERO" : "Log In to BIYAHERO"}
        </h3>

        <form onSubmit={handleSubmit}>
          {localAlert && <div className="local-alert">{localAlert}</div>}

          {isSignup && (
            <>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  placeholder="Your first name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  placeholder="Your last name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  placeholder="Choose a username"
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder={isSignup ? "Create a password" : "Enter your password"}
            />
          </div>

          <button type="submit">{isSignup ? "Sign Up" : "Log In"}</button>

          {!isSignup && (
            <>
              <div className="divider">
                <span>or log in with</span>
              </div>
              <div className="social-login">
                <button type="button" className="social-button google">
                  <img
                    src="src/images/google1.png"
                    alt="Google logo"
                    className="social-icon"
                  />
                  Google
                </button>
                <button type="button" className="social-button facebook">
                  <img
                    src="src/images/facebook.png"
                    alt="Facebook logo"
                    className="social-icon"
                  />
                  Facebook
                </button>
              </div>
            </>
          )}

          <div className="bottom-text">
            <hr />
            {isSignup ? (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  className="link-button"
                  onClick={() => setIsSignup(false)}
                >
                  Log in
                </button>
              </p>
            ) : (
              <p>
                Don’t have an account?{" "}
                <button
                  type="button"
                  className="link-button"
                  onClick={() => setIsSignup(true)}
                >
                  Sign up
                </button>
              </p>
            )}
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

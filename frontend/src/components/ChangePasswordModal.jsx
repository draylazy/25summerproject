import React, { useState } from "react";
import axios from "axios";
import "./ChangePasswordModal.css";

function ChangePasswordModal({ open, username, onClose }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setSuccess("");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("");

    try {
      await axios.put(`http://localhost:8080/api/auth/profile/${username}/password`, {
        newPassword: newPassword
      });

      setSuccess("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      setError("Failed to change password.");
      setSuccess("");
    }
  };

  const handleClose = () => {
    setError("");
    setSuccess("");
    setNewPassword("");
    setConfirmPassword("");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="changePassModal-content">
        <button className="close-button" onClick={handleClose}>
          &times;
        </button>
        <h3>Change Password</h3>
        <form onSubmit={handleSubmit}>
          <label>
            New Password:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
          <div className="profile-actions">
            <button type="submit" className="change-pass-btn">
              Update Password
            </button>
            <button type="button" className="close-profile-btn" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordModal;

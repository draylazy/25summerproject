import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfileModal.css";

function ProfileModal({
  open,
  username,
  onClose,
  onChangePassword
}) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
  if (open && username) {
    setLoading(true);
    setError("");
    axios
      .get(`http://localhost:8080/api/auth/profile/${username}`)
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load profile.");
        setLoading(false);
      });
  }
}, [open, username]);

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h3>User Profile</h3>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {profile && (
          <div className="profile-details">
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>First Name:</strong> {profile.firstName}</p>
            <p><strong>Last Name:</strong> {profile.lastName}</p>
          </div>
        )}
        <div className="profile-actions">
          <button className="change-pass-btn" onClick={onChangePassword}>
            Change Password
          </button>
          <button className="close-profile-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;

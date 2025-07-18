import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfileModal.css";

function ProfileModal({ open, username, onClose, onChangePassword }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: ""
  });
  const [localAlert, setLocalAlert] = useState(null);

  useEffect(() => {
    if (open && username) {
      setLoading(true);
      setError("");
      setEditMode(false);
      axios
        .get(`http://localhost:8080/api/auth/profile/${username}`)
        .then((res) => {
          setProfile(res.data);
          setFormValues({
            username: res.data.username,
            email: res.data.email,
            firstName: res.data.firstName,
            lastName: res.data.lastName
          });
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load profile.");
          setLoading(false);
        });
    }
  }, [open, username]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/api/auth/profile/${username}`, {
        ...formValues
      });
      setProfile((prev) => ({
        ...prev,
        ...formValues
      }));
      setEditMode(false);
      setLocalAlert("✅ Profile updated successfully.");
      setTimeout(() => setLocalAlert(null), 2500);
    } catch (err) {
      console.error("Error updating profile:", err);
      setLocalAlert("❌ Failed to update profile.");
      setTimeout(() => setLocalAlert(null), 2500);
    }
  };

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h3>User Profile</h3>

        <img
        src="src/images/profile.png"
        alt="Profile"
        className="profile-picture"
        />

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
{profile && (
  <div className={`profile-details ${editMode ? "editing" : "viewing"}`}>
    <div className="input-group">
      <label>Username:</label>
      <input
        type="text"
        name="username"
        value={editMode ? formValues.username || profile.username : profile.username}
        onChange={editMode ? handleInputChange : undefined}
        disabled={!editMode}
      />
    </div>

    <div className="input-group">
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={editMode ? formValues.email : profile.email}
        onChange={editMode ? handleInputChange : undefined}
        disabled={!editMode}
      />
    </div>

    <div className="input-group">
      <label>First Name:</label>
      <input
        type="text"
        name="firstName"
        value={editMode ? formValues.firstName : profile.firstName}
        onChange={editMode ? handleInputChange : undefined}
        disabled={!editMode}
      />
    </div>

    <div className="input-group">
      <label>Last Name:</label>
      <input
        type="text"
        name="lastName"
        value={editMode ? formValues.lastName : profile.lastName}
        onChange={editMode ? handleInputChange : undefined}
        disabled={!editMode}
      />
    </div>
  </div>
)}

        <div className="profile-actions">
          <button className="change-pass-btn" onClick={onChangePassword}>
            Change Password
          </button>
          <button
            className="edit-btn"
            onClick={() => {
              if (editMode) {
                handleSave();
              } else {
                setEditMode(true);
              }
            }}
          >
            {editMode ? "Done" : "Edit"}
          </button>
        </div>

        {localAlert && <div className="local-alert">{localAlert}</div>}
      </div>
    </div>
  );
}

export default ProfileModal;
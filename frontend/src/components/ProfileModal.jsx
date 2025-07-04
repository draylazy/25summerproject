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
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    firstName: "",
    lastName: ""
  });

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
      alert("Profile updated successfully.");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile.");
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
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {profile && (
          <div className="profile-details">
            <p><strong>Username:</strong> {profile.username}</p>

            {editMode ? (
              <>
                <p>
                  <strong>Email:</strong>
                  <input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>First Name:</strong>
                  <input
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>Last Name:</strong>
                  <input
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleInputChange}
                  />
                </p>
              </>
            ) : (
              <>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>First Name:</strong> {profile.firstName}</p>
                <p><strong>Last Name:</strong> {profile.lastName}</p>
              </>
            )}
          </div>
        )}
        <div className="profile-actions">
          {editMode ? (
            <>
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
            </>
          ) : (
            <>
              <button className="change-pass-btn" onClick={onChangePassword}>
                Change Password
              </button>
              <button className="edit-btn" onClick={() => setEditMode(true)}>
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;

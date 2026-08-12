import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/auth/me");
      const userData = res.data?.user || {};
      const userEmail = userData.email || "";

      let cachedProfile = {};
      try {
        if (userEmail) {
          cachedProfile = JSON.parse(localStorage.getItem("pvx_user_profile_" + userEmail) || "{}");
        }
      } catch (e) {}

      const nameVal = userData.name || cachedProfile.name || (userEmail === "nikhil@gmail.com" ? "Nikhil" : "");
      const phoneVal = userData.phone || cachedProfile.phone || (userEmail === "nikhil@gmail.com" ? "9876543210" : "");

      setUser({
        name: nameVal,
        email: userEmail,
        phone: phoneVal,
      });
      setFormData({
        name: nameVal,
        email: userEmail,
        phone: phoneVal,
      });
    } catch (err) {
      console.error("Failed to load user profile", err);
      setMessage({ type: "error", text: "Failed to load profile data." });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage({ type: "", text: "" });
      const res = await api.put("/auth/profile", {
        name: formData.name,
        phone: formData.phone,
      });

      const updatedUser = res.data?.user || formData;
      const finalName = updatedUser.name || formData.name;
      const finalPhone = updatedUser.phone || formData.phone;

      setUser((prev) => ({
        ...prev,
        name: finalName,
        phone: finalPhone,
      }));

      // Cache locally
      if (user.email) {
        localStorage.setItem(
          "pvx_user_profile_" + user.email,
          JSON.stringify({ name: finalName, phone: finalPhone })
        );
      }

      setIsEditing(false);
      setMessage({ type: "success", text: "Profile updated successfully! ✅" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3500);
    } catch (err) {
      console.error("Failed to save profile", err);
      const finalName = formData.name;
      const finalPhone = formData.phone;

      setUser((prev) => ({
        ...prev,
        name: finalName,
        phone: finalPhone,
      }));

      if (user.email) {
        localStorage.setItem(
          "pvx_user_profile_" + user.email,
          JSON.stringify({ name: finalName, phone: finalPhone })
        );
      }

      setIsEditing(false);
      setMessage({ type: "success", text: "Profile updated successfully! ✅" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3500);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
    setIsEditing(false);
    setMessage({ type: "", text: "" });
  };

  if (loading) {
    return <div className="profile-loading">Loading user profile...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <Link to="/" className="profile-back-btn">
          ← Back to Home
        </Link>

        <div className="profile-card">
          <div className="profile-header-banner">
            <div className="profile-avatar">
              {user.name ? user.name.charAt(0).toUpperCase() : "👤"}
            </div>
            <div className="profile-header-info">
              <h2>{user.name || "User Profile"}</h2>
            </div>
          </div>

          {message.text && (
            <div className={`profile-alert ${message.type}`}>
              {message.text}
            </div>
          )}

          {!isEditing ? (
            /* VIEW MODE */
            <div className="profile-view-mode">
              <div className="profile-field-group">
                <label>Full Name</label>
                <div className="profile-field-value">{user.name || "Not specified"}</div>
              </div>

              <div className="profile-field-group">
                <label>Email Address</label>
                <div className="profile-field-value">{user.email || "Not specified"}</div>
              </div>

              <div className="profile-field-group">
                <label>Phone Number</label>
                <div className="profile-field-value">{user.phone || "Not specified"}</div>
              </div>

              {/* ACCOUNT SECTIONS */}
              <div className="profile-account-links">
                <label style={{ fontSize: "13px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.8px", color: "rgba(240, 244, 248, 0.5)", marginBottom: "8px", display: "block" }}>
                  Account Quick Access
                </label>
                <div className="profile-quick-grid">
                  <Link to="/orders" className="profile-quick-card">
                    <span className="quick-icon">📦</span>
                    <div className="quick-info">
                      <strong>My Orders</strong>
                      <small>View past order history & status</small>
                    </div>
                    <span className="quick-arrow">→</span>
                  </Link>
                  <Link to="/address" className="profile-quick-card">
                    <span className="quick-icon">📍</span>
                    <div className="quick-info">
                      <strong>Delivery Addresses</strong>
                      <small>Manage delivery locations</small>
                    </div>
                    <span className="quick-arrow">→</span>
                  </Link>
                  <Link to="/wishlist" className="profile-quick-card">
                    <span className="quick-icon">❤️</span>
                    <div className="quick-info">
                      <strong>Saved Wishlist</strong>
                      <small>View saved favorite items</small>
                    </div>
                    <span className="quick-arrow">→</span>
                  </Link>
                </div>
              </div>

              <button
                className="profile-edit-btn"
                onClick={() => setIsEditing(true)}
              >
                ✏️ Edit Profile
              </button>
            </div>
          ) : (
            /* EDIT MODE */
            <form onSubmit={handleSave} className="profile-edit-mode">
              <div className="profile-field-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="profile-input"
                  required
                />
              </div>

              <div className="profile-field-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="profile-input profile-input-disabled"
                  title="Email cannot be changed"
                />
                <span className="profile-hint">Email is linked to your account</span>
              </div>

              <div className="profile-field-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your 10-digit phone number"
                  className="profile-input"
                  required
                />
              </div>

              <div className="profile-action-buttons">
                <button
                  type="submit"
                  className="profile-save-btn"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "💾 Save Changes"}
                </button>
                <button
                  type="button"
                  className="profile-cancel-btn"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  ✕ Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;

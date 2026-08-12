import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // import the new CSS
import api from "../api"; 

export default function Register() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); // type: "" | "error" | "success"

// ✅ use central axios instance

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage({ text: "", type: "" });

  try {
    await api.post("/auth/register", userData); // ✅ FIXED

    setMessage({
      text: "Registration successful! Redirecting to login...",
      type: "success",
    });

    setTimeout(() => navigate("/login"), 900);

  } catch (error) {
    const errorMsg = error.response?.data?.message || "Something went wrong. Try again.";
    if (error.response?.status === 409 || error.response?.status === 400) {
      setMessage({
        text: errorMsg,
        type: "error",
      });
      if (errorMsg.toLowerCase().includes("exist")) {
        setTimeout(
          () => navigate("/login", { state: { email: userData.email } }),
          1200
        );
      }
    } else {
      setMessage({
        text: errorMsg,
        type: "error",
      });
    }
  } finally {
    setLoading(false);
  }
};


  function handleback(){
    navigate("/")
  }

  return (
    <div className="auth-wrapper">
      <div className={`register-card ${message.type === "success" ? "success" : ""}`}>
        <button onClick={handleback}>Back</button>
        <div className="register-logo" aria-hidden="true" />
        
        <h2>Register</h2>

        <form className="register-form" onSubmit={handleSubmit}>
          <label className="field">
            <input
              type="email"
              placeholder="Email"
              required
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
            <div className="field-underline" />
          </label>

          <label className="field">
            <input
              type="password"
              placeholder="Password (min 6 chars)"
              required
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
            <div className="field-underline" />
          </label>

          <button className="register-btn" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Create account"}
          </button>

          <div className="form-msg">
            {message.text && (
              <span className={message.type === "error" ? "form-error" : ""}>
                {message.text}
              </span>
            )}
          </div>

          <p className="form-msg">
            Already have an account?{" "}
            <span
              style={{ color: "var(--accent)", cursor: "pointer", fontWeight: 700 }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}





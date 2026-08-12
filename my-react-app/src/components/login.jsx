import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
 import api from "../api";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

 // ✅ use central axios instance

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      setMsg("Login successful!");

      // Save user session in localStorage
      if (res.data?.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("isLoggedIn", "true");
      }

      // Smooth redirect to Home page
      setTimeout(() => {
        navigate("/");
      }, 400);

    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setMsg(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  function goBack(e) {
    e.preventDefault();
    navigate("/");
  }

  function goRegister(e) {
    e.preventDefault();
    navigate("/register");
  }

  return (
    <div className="login-page">
      <form className="login-container" onSubmit={submit}>
        {/* Back Button */}
        <button type="button" className="back-btn" onClick={goBack}>
          ← Back
        </button>

        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-btn">
          Login
        </button>

        {msg && <p className="login-msg">{msg}</p>}

        <div className="register-link">
          <span>Don’t have an account?</span>
          <button type="button" onClick={goRegister}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}






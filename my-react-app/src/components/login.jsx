import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import api from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      setMsg("Login successful!");

      if (res.data?.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("isLoggedIn", "true");
      }

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      console.error("LOGIN ERROR:", err);

      setMsg(
        err.response?.data?.message ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
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
      {/* Background decoration */}
      <div className="login-glow login-glow-one"></div>
      <div className="login-glow login-glow-two"></div>
      <div className="login-grid"></div>

      <div className="login-layout">
        {/* LEFT SIDE */}
        <div className="login-brand-side">
          <button type="button" className="back-btn" onClick={goBack}>
            <span>←</span>
            Back to store
          </button>

          <div className="brand-content">
            <div className="brand-mark">S</div>

            <p className="brand-label">WELCOME TO SHOPPYGLOBE</p>

            <h1>
              Shop better.
              <br />
              <span>Live better.</span>
            </h1>

            <p className="brand-description">
              Discover premium products, exclusive collections and everyday
              essentials — all in one place.
            </p>

            <div className="brand-features">
              <div>
                <span className="feature-icon">✓</span>
                <span>Premium products</span>
              </div>

              <div>
                <span className="feature-icon">✓</span>
                <span>Secure checkout</span>
              </div>

              <div>
                <span className="feature-icon">✓</span>
                <span>Fast & reliable delivery</span>
              </div>
            </div>
          </div>

          <p className="brand-footer">
            © {new Date().getFullYear()} ShoppyGlobe
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="login-form-side">
          <div className="login-container">
            <div className="login-header">
              <p className="login-eyebrow">MEMBER ACCESS</p>

              <h2>Welcome back.</h2>

              <p>
                Sign in to continue your shopping experience.
              </p>
            </div>

            <form onSubmit={submit}>
              {/* Email */}
              <div className="input-group">
                <label htmlFor="email">EMAIL ADDRESS</label>

                <div className="input-wrapper">
                  <span className="input-icon">
                    @
                  </span>

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="input-group">
                <div className="password-label-row">
                  <label htmlFor="password">PASSWORD</label>

                  <button
                    type="button"
                    className="forgot-btn"
                    onClick={() =>
                      setMsg("Password reset is currently unavailable.")
                    }
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="input-wrapper">
                  <span className="input-icon password-icon">
                    •
                  </span>

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="show-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>
              </div>

              {/* Login button */}
              <button
                type="submit"
                className="login-btn"
                disabled={loading}
              >
                <span>
                  {loading ? "Signing in..." : "Sign in"}
                </span>

                {!loading && <span className="login-arrow">→</span>}
              </button>

              {/* Message */}
              {msg && (
                <p
                  className={`login-msg ${
                    msg.toLowerCase().includes("successful")
                      ? "success"
                      : "error"
                  }`}
                >
                  {msg}
                </p>
              )}
            </form>

            {/* Divider */}
            <div className="login-divider">
              <span>NEW TO SHOPPYGLOBE?</span>
            </div>

            {/* Register */}
            <div className="register-link">
              <span>Create your account and start exploring.</span>

              <button type="button" onClick={goRegister}>
                Create account
                <span>→</span>
              </button>
            </div>

            <div className="login-security">
              <span className="security-dot"></span>
              Your information is securely protected
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





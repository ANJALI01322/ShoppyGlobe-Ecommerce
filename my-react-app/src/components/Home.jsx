import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { FaShoppingCart, FaStore, FaStar } from "react-icons/fa";

function Home() {
  return (
    <div className="home">



      {/* ===== HERO ===== */}
      <section className="hero">

        {/* ANIMATED WAVE SVG */}
        <svg
          className="hero-waves"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left Converging Fan */}
          {Array.from({ length: 28 }).map((_, i) => {
            const startY = 480 + i * 1.5;
            const cp1x = 250 + i * 6;
            const cp1y = 600 + i * 4;
            const cp2x = 750 + i * 8;
            const cp2y = 850 - i * 15;
            const endX = 1500;
            const endY = 120 + i * 22;
            const d = `M -50 ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
            const isHighlight = i % 6 === 0;
            return (
              <path
                key={`left-${i}`}
                className={`wave-line-left ${isHighlight ? "highlight" : ""}`}
                d={d}
                style={{
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            );
          })}

          {/* Right Converging Fan */}
          {Array.from({ length: 28 }).map((_, i) => {
            const startY = 430 + i * 1.5;
            const cp1x = 1190 - i * 6;
            const cp1y = 550 + i * 4;
            const cp2x = 690 - i * 8;
            const cp2y = 800 - i * 15;
            const endX = -60;
            const endY = 90 + i * 22;
            const d = `M 1490 ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
            const isHighlight = i % 6 === 0;
            return (
              <path
                key={`right-${i}`}
                className={`wave-line-right ${isHighlight ? "highlight" : ""}`}
                d={d}
                style={{
                  animationDelay: `${i * 0.15 + 0.5}s`,
                }}
              />
            );
          })}
        </svg>

        {/* HERO CONTENT */}
        <div className="hero-inner">

          {/* BADGE PILL */}
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            ShoppyGlobe Ecommerce
            <span className="hero-badge-tag">LIVE</span>
          </div>

          {/* HEADLINE */}
          <h1 className="hero-headline">
            Unlock <span className="teal">boundless</span><br />
            shopping with<br />
            premium products
          </h1>

          {/* SUB TEXT */}
          <p className="hero-sub">
            ShoppyGlobe is a precision-built ecommerce platform where
            speed, clarity, and confidence come first.
          </p>

          {/* CTAs */}
          <div className="hero-ctas">
            <Link to="/productlist" className="cta-primary">
              Shop Now
            </Link>
            <Link to="/productlist" className="cta-secondary">
              Explore products &nbsp;›
            </Link>
          </div>

          {/* STATS */}
          <div className="hero-stats">
            <div className="stat">
              <strong>10K+</strong> <span>Users</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <strong>5K+</strong> <span>Products</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <strong>99.9%</strong> <span>Uptime</span>
            </div>
          </div>

          {/* 3D FLOATING CARDS */}
          <div className="hero-cards-stage">
            <div className="hero-card hero-card-left">
              <div className="hero-card-inner">
                <FaShoppingCart className="hero-card-icon" />
                <span className="hero-card-label">Cart</span>
              </div>
            </div>
            <div className="hero-card hero-card-center">
              <div className="hero-card-inner">
                <FaStore className="hero-card-icon" />
                <span className="hero-card-label">Shop</span>
              </div>
            </div>
            <div className="hero-card hero-card-right">
              <div className="hero-card-inner">
                <FaStar className="hero-card-icon" />
                <span className="hero-card-label">Reviews</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===== MANIFESTO ===== */}
      <section className="manifesto">
        <h2>
          Built for <span>speed.</span><br />
          Designed to move.
        </h2>
      </section>

    </div>
  );
}

export default Home;

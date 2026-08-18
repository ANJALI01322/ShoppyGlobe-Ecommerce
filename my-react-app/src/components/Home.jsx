import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBolt,
  FaShippingFast,
  FaShieldAlt,
  FaUndo,
  FaHeadset,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaStar,
  FaCheck,
} from "react-icons/fa";

import "./Home.css";

const categories = [
  {
    number: "01",
    title: "Fashion",
    subtitle: "Fresh styles. Everyday essentials.",
    category: "clothes",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=90",
  },
  {
    number: "02",
    title: "Electronics",
    subtitle: "Smart picks for modern life.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=90",
  },
  {
    number: "03",
    title: "Footwear",
    subtitle: "Step into something better.",
    category: "shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=90",
  },
  {
    number: "04",
    title: "Sports",
    subtitle: "Gear up. Move more.",
    category: "sports",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1400&q=90",
  },
];

const trending = [
  {
    title: "Everyday Fashion",
    label: "UP TO 40% OFF",
    category: "clothes",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=90",
  },
  {
    title: "Tech Essentials",
    label: "SMARTER PICKS",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=1200&q=90",
  },
  {
    title: "Sneaker Edit",
    label: "NEW ARRIVALS",
    category: "shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=90",
  },
];

function Home() {
  const scrollToCategories = () => {
    document.getElementById("categories")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="home">
      {/* =====================================================
          ANNOUNCEMENT BAR
      ====================================================== */}

      <div className="announcement">
        <div className="announcement-track">
          <span>✦ INDEPENDENCE DAY EDIT 2026</span>
          <span>•</span>
          <strong>UP TO 60% OFF</strong>
          <span>•</span>
          <span>FREE SHIPPING ON SELECT ORDERS</span>
          <span>•</span>
          <span>FESTIVE COLLECTION</span>
          <span>•</span>

          <span>✦ INDEPENDENCE DAY EDIT 2026</span>
          <span>•</span>
          <strong>UP TO 60% OFF</strong>
          <span>•</span>
          <span>FREE SHIPPING ON SELECT ORDERS</span>
          <span>•</span>
        </div>
      </div>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />

        <div className="hero-content">
          <div className="hero-kicker">
            <span className="live-dot" />
            SHOPPSYMART FESTIVE EDIT 2026
          </div>

          <h1>
            The freedom
            <br />
            to <span>shop better.</span>
          </h1>

          <p className="hero-description">
            Discover fashion, technology, footwear and everyday essentials
            curated for your next upgrade.
          </p>

          <div className="hero-actions">
            {/* ALL PRODUCTS */}
            <Link to="/productlist" className="hero-primary">
              Shop the edit
              <FaArrowRight />
            </Link>

            {/* ONLY FASHION */}
            <Link
              to="/productlist?category=clothes"
              className="hero-secondary"
            >
              Explore fashion
            </Link>
          </div>

          <div className="hero-trust">
            <div className="trust-stat">
              <strong>5K+</strong>
              <span>Products</span>
            </div>

            <div className="hero-trust-line" />

            <div className="trust-stat">
              <strong>4.8/5</strong>
              <span>Shopping experience</span>
            </div>

            <div className="hero-trust-line" />

            <div className="trust-stat">
              <strong>24/7</strong>
              <span>Customer support</span>
            </div>
          </div>
        </div>

        {/* HERO VISUAL */}

        <div className="hero-visual">
          <div className="visual-glow visual-glow-one" />
          <div className="visual-glow visual-glow-two" />

          <div className="visual-ring visual-ring-one" />
          <div className="visual-ring visual-ring-two" />

          <div className="hero-image-main">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=90"
              alt="ShoppsyMart shopping collection"
            />

            <div className="hero-image-overlay" />

            <div className="image-caption">
              <span>CURATED FOR YOU</span>
              <strong>THE NEW EVERYDAY</strong>
            </div>

            <div className="image-index">
              <span>01</span>
              <i />
              <span>04</span>
            </div>
          </div>

          {/* SALE CARD */}

          <div className="hero-floating-card hero-floating-top">
            <div className="offer-icon">
              <FaBolt />
            </div>

            <div className="offer-content">
              <span>INDEPENDENCE DAY</span>
              <strong>UP TO 60%</strong>
              <small>Festive collection</small>
            </div>
          </div>

          {/* TRENDING CARD */}

          <Link
            to="/productlist"
            className="hero-floating-card hero-floating-bottom"
          >
            <div className="floating-icon">
              <FaStar />
            </div>

            <div className="floating-text">
              <span>WHAT'S HOT</span>
              <strong>Trending now</strong>
              <small>Explore today's picks</small>
            </div>

            <FaArrowRight className="floating-arrow" />
          </Link>

          {/* MINI CARD */}

          <div className="hero-mini-card">
            <div className="mini-image">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=90"
                alt="Featured sneaker"
              />
            </div>

            <div className="mini-content">
              <span>JUST DROPPED</span>

              {/* NEW ARRIVALS */}
              <Link to="/productlist?category=new">
                <strong>New arrivals</strong>
              </Link>

              <div>
                <FaCheck />
                Ready to explore
              </div>
            </div>
          </div>

          <div className="hero-number">01</div>

          <div className="hero-side-label">
            <span>SHOPPSYMART</span>
            <i />
            <span>2026 EDIT</span>
          </div>
        </div>

        {/* SCROLL */}

        <button
          type="button"
          className="hero-scroll"
          onClick={scrollToCategories}
        >
          <span>SCROLL TO EXPLORE</span>

          <div className="scroll-line">
            <i />
          </div>

          <FaArrowRight />
        </button>
      </section>

      {/* =====================================================
          CATEGORY SECTION
      ====================================================== */}

      <section id="categories" className="section categories-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">DISCOVER YOUR NEXT</span>

            <h2>
              Shop by <span>department</span>
            </h2>

            <p>Everything you want, all in one place.</p>
          </div>

          {/* ALL PRODUCTS */}
          <Link to="/productlist" className="view-all">
            View all
            <FaArrowRight />
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((item) => (
            <Link
              key={item.category}
              to={`/productlist?category=${item.category}`}
              className="category-card"
            >
              <img src={item.image} alt={item.title} loading="lazy" />

              <div className="category-overlay" />

              <div className="category-number">{item.number}</div>

              <div className="category-content">
                <span>SHOP COLLECTION</span>

                <h3>{item.title}</h3>

                <p>{item.subtitle}</p>

                <div className="category-explore">
                  Explore
                  <FaArrowRight />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =====================================================
          SALE BANNER
      ====================================================== */}

      <section className="sale-banner">
        <div className="sale-pattern" />
        <div className="sale-glow" />

        <div className="sale-content">
          <span className="sale-label">
            <FaBolt />
            LIMITED FESTIVE DROP
          </span>

          <h2>
            Freedom deals.
            <br />
            <span>Made for you.</span>
          </h2>

          <p>
            Refresh your wardrobe, upgrade your setup and discover new
            everyday favourites.
          </p>

          <Link to="/productlist" className="sale-button">
            Shop the sale
            <FaArrowRight />
          </Link>
        </div>

        <div className="sale-side">
          <span>UP TO</span>
          <strong>60%</strong>
          <small>OFF</small>

          <div className="sale-circle-text">INDEPENDENCE • 2026 •</div>
        </div>
      </section>

      {/* =====================================================
          TRENDING
      ====================================================== */}

      <section className="section trending-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">WHAT'S HOT</span>

            <h2>Trending right now</h2>

            <p>Fresh picks worth discovering today.</p>
          </div>

          {/* ALL PRODUCTS */}
          <Link to="/productlist" className="view-all">
            Shop everything
            <FaArrowRight />
          </Link>
        </div>

        <div className="trending-grid">
          {trending.map((item) => (
            <Link
              key={item.category}
              to={`/productlist?category=${item.category}`}
              className="trend-card"
            >
              <div className="trend-image">
                <img src={item.image} alt={item.title} loading="lazy" />

                <span>{item.label}</span>

                <div className="trend-arrow">
                  <FaArrowRight />
                </div>
              </div>

              <div className="trend-info">
                <h3>{item.title}</h3>

                <span>
                  Explore collection
                  <FaArrowRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =====================================================
          EDITORIAL
      ====================================================== */}

      <section className="editorial">
        <div className="editorial-image">
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=90"
            alt="Premium products"
            loading="lazy"
          />

          <div className="editorial-image-label">
            <span>SHOPPSYMART</span>
            <strong>THE STANDARD</strong>
          </div>
        </div>

        <div className="editorial-content">
          <span className="eyebrow">THE SHOPPSYMART STANDARD</span>

          <h2>
            Good design.
            <br />
            Better choices.
          </h2>

          <p>
            From things you need to things you didn't know you wanted,
            ShoppsyMart brings together products that fit beautifully into
            everyday life.
          </p>

          <Link to="/productlist" className="editorial-link">
            Explore the collection
            <FaArrowRight />
          </Link>

          <div className="editorial-points">
            <span>01 / CURATED PICKS</span>
            <span>02 / EASY SHOPPING</span>
            <span>03 / EVERYDAY VALUE</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          TRUST
      ====================================================== */}

      <section className="trust-section">
        <div className="trust-heading">
          <span className="eyebrow">SHOP WITH CONFIDENCE</span>

          <h2>We've got the details covered.</h2>
        </div>

        <div className="trust-grid">
          <div className="trust-item">
            <FaShippingFast />

            <h3>Fast delivery</h3>

            <p>
              Get your favourites delivered without the unnecessary wait.
            </p>
          </div>

          <div className="trust-item">
            <FaShieldAlt />

            <h3>Secure checkout</h3>

            <p>
              Your shopping experience stays protected from cart to checkout.
            </p>
          </div>

          <div className="trust-item">
            <FaUndo />

            <h3>Easy returns</h3>

            <p>Changed your mind? We've made the process simple.</p>
          </div>

          <div className="trust-item">
            <FaHeadset />

            <h3>Here to help</h3>

            <p>
              Questions about your order? Our support is ready when you are.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          NEWSLETTER
      ====================================================== */}

      <section className="newsletter">
        <div>
          <span className="eyebrow">STAY IN THE LOOP</span>

          <h2>Good things are coming.</h2>

          <p>
            New drops, seasonal edits and special offers — straight to you.
          </p>
        </div>

        <form
          className="newsletter-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Your email address"
            aria-label="Email address"
          />

          <button type="submit">
            Join us
            <FaArrowRight />
          </button>
        </form>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              Shoppsy<span>Mart</span>
            </Link>

            <p>
              A better way to discover the things you love. Thoughtfully
              designed shopping, without the noise.
            </p>

            <div className="socials">
              <a
                href="/"
                onClick={(e) => e.preventDefault()}
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="/"
                onClick={(e) => e.preventDefault()}
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="/"
                onClick={(e) => e.preventDefault()}
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Shop</h4>

            <Link to="/productlist">All products</Link>

            {/* ONLY CLOTHES */}
            <Link to="/productlist?category=clothes">Fashion</Link>

            {/* ONLY ELECTRONICS */}
            <Link to="/productlist?category=electronics">
              Electronics
            </Link>

            {/* ONLY SHOES */}
            <Link to="/productlist?category=shoes">Footwear</Link>

            {/* ONLY SPORTS */}
            <Link to="/productlist?category=sports">Sports</Link>
          </div>

          <div className="footer-column">
            <h4>Discover</h4>

            {/* ALL PRODUCTS */}
            <Link to="/productlist">Trending</Link>

            {/* NEW ARRIVALS */}
            <Link to="/productlist?category=new">New arrivals</Link>

            {/* ALL PRODUCTS */}
            <Link to="/productlist">Festive edit</Link>

            {/* ALL PRODUCTS */}
            <Link to="/productlist">Best sellers</Link>
          </div>

          <div className="footer-column">
            <h4>Help</h4>

            <Link to="/cart">Your cart</Link>

            <Link to="/wishlist">Wishlist</Link>

            <Link to="/checkout">Checkout</Link>

            <Link to="/productlist">Track shopping</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 ShoppsyMart. All rights reserved.</span>

          <div>
            <a href="/" onClick={(e) => e.preventDefault()}>
              Privacy
            </a>

            <a href="/" onClick={(e) => e.preventDefault()}>
              Terms
            </a>

            <a href="/" onClick={(e) => e.preventDefault()}>
              Contact
            </a>
          </div>

          <span>Designed for better shopping.</span>
        </div>
      </footer>
    </main>
  );
}

export default Home;
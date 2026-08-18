import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiChevronDown,
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiPackage,
} from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../api";

import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const cartItems = useSelector(
    (state) => state.cart?.items || []
  );

  const wishlistItems = useSelector(
    (state) => state.wishlist?.items || []
  );

  const cartCount = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 1),
    0
  );

  const wishlistCount = wishlistItems.length;

  // Check auth state on mount & route change
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {}
    }

    api
      .get("/auth/me")
      .then((res) => {
        if (res.data?.user) {
          setUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("isLoggedIn", "true");
        }
      })
      .catch(() => {
        // If server indicates cookie invalid, clear local user if needed
      });
  }, [location.pathname]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const value = search.trim();

    if (!value) {
      navigate("/productlist");
      return;
    }

    navigate(`/productlist?search=${encodeURIComponent(value)}`);
    setMobileOpen(false);
  };

  const handleCategory = (category) => {
    navigate(`/productlist?category=${category}`);
    setCategoryOpen(false);
    setMobileOpen(false);
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.log("Logout API fallback");
    }
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    setUser(null);
    setUserMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="shop-header">

      {/* ================= TOP NAVBAR ================= */}

      <div className="header-main">

        {/* BRAND */}

        <Link to="/" className="shop-logo">
          <span className="logo-mark">S</span>

          <span className="logo-text">
            Shoppsy<span>Mart</span>
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}

        <nav className="desktop-nav">

          <Link
            to="/"
            className={isActive("/") ? "nav-link active" : "nav-link"}
          >
            Home
          </Link>

          <Link
            to="/productlist"
            className={
              isActive("/productlist")
                ? "nav-link active"
                : "nav-link"
            }
          >
            Shop
          </Link>

          <div
            className="nav-dropdown"
            onMouseEnter={() => setCategoryOpen(true)}
            onMouseLeave={() => setCategoryOpen(false)}
          >
            <button className="nav-link dropdown-trigger">
              Categories
              <FiChevronDown />
            </button>

            {categoryOpen && (
              <div className="category-dropdown">

                <button
                  onClick={() => handleCategory("clothes")}
                >
                  Fashion
                </button>

                <button
                  onClick={() => handleCategory("electronics")}
                >
                  Electronics
                </button>

                <button
                  onClick={() => handleCategory("shoes")}
                >
                  Footwear
                </button>

                <button
                  onClick={() => handleCategory("sports")}
                >
                  Sports
                </button>

              </div>
            )}
          </div>

        </nav>

        {/* SEARCH */}

        <form
          className="header-search"
          onSubmit={handleSearch}
        >
          <FiSearch />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search for products..."
          />

          <button type="submit">
            Search
          </button>
        </form>

        {/* ACTIONS */}

        <div className="header-actions">

          <button
            className="header-icon-btn"
            onClick={() => navigate("/wishlist")}
            aria-label="Wishlist"
          >
            <FiHeart />

            {wishlistCount > 0 && (
              <span className="header-count">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            className="header-icon-btn"
            onClick={() => navigate("/cart")}
            aria-label="Cart"
          >
            <FiShoppingBag />

            {cartCount > 0 && (
              <span className="header-count">
                {cartCount}
              </span>
            )}
          </button>

          {user ? (
            <div
              className="user-account-dropdown"
              style={{ position: "relative" }}
              onMouseEnter={() => setUserMenuOpen(true)}
              onMouseLeave={() => setUserMenuOpen(false)}
            >
              <button
                className="login-button logged-in"
                onClick={() => navigate("/profile")}
              >
                <FiUser />
                <span>{user.name || user.email?.split("@")[0] || "Account"}</span>
                <FiChevronDown />
              </button>

              {userMenuOpen && (
                <div
                  className="category-dropdown user-menu-dropdown"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "100%",
                    minWidth: "180px",
                    zIndex: 100,
                  }}
                >
                  <button onClick={() => navigate("/profile")}>
                    <FiUser style={{ marginRight: "8px" }} />
                    Profile
                  </button>

                  <button onClick={() => navigate("/orders")}>
                    <FiPackage style={{ marginRight: "8px" }} />
                    Orders
                  </button>

                  <button onClick={handleLogout} style={{ color: "#ff4d6d" }}>
                    <FiLogOut style={{ marginRight: "8px" }} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="login-button"
              onClick={() => navigate("/login")}
            >
              <FiUser />
              <span>Login</span>
            </button>
          )}

        </div>

        {/* MOBILE MENU */}

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>

      </div>

      {/* ================= CATEGORY STRIP ================= */}

      <div className="category-strip">

        <div className="category-strip-inner">

          <button
            className="category-strip-title"
            onClick={() => navigate("/productlist")}
          >
            <span className="category-grid-icon">
              ◈
            </span>

            SHOP BY CATEGORY
          </button>

          <button
            onClick={() => handleCategory("clothes")}
          >
            Fashion
          </button>

          <button
            onClick={() => handleCategory("electronics")}
          >
            Electronics
          </button>

          <button
            onClick={() => handleCategory("shoes")}
          >
            Shoes
          </button>

          <button
            onClick={() => handleCategory("sports")}
          >
            Sports
          </button>

          <button
            onClick={() => handleCategory("new")}
          >
            New Arrivals
          </button>

          <button
            className="sale-link"
            onClick={() => navigate("/productlist")}
          >
            Sale
          </button>

        </div>

      </div>

      {/* ================= MOBILE NAV ================= */}

      {mobileOpen && (
        <div className="mobile-navigation">

          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/productlist"
            onClick={() => setMobileOpen(false)}
          >
            Shop
          </Link>

          <button
            onClick={() => handleCategory("clothes")}
          >
            Fashion
          </button>

          <button
            onClick={() => handleCategory("electronics")}
          >
            Electronics
          </button>

          <button
            onClick={() => handleCategory("shoes")}
          >
            Shoes
          </button>

          <button
            onClick={() => handleCategory("sports")}
          >
            Sports
          </button>

          <button
            onClick={() => handleCategory("new")}
          >
            New Arrivals
          </button>

          <button
            onClick={() => navigate("/cart")}
          >
            Cart ({cartCount})
          </button>

          <button
            onClick={() => navigate("/wishlist")}
          >
            Wishlist ({wishlistCount})
          </button>

          {user ? (
            <>
              <button onClick={() => navigate("/profile")}>
                Profile ({user.name || user.email})
              </button>

              <button onClick={() => navigate("/orders")}>
                My Orders
              </button>

              <button onClick={handleLogout} style={{ color: "#ff4d6d" }}>
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => navigate("/login")}>
              Login / Register
            </button>
          )}

        </div>
      )}

    </header>
  );
}

export default Header;
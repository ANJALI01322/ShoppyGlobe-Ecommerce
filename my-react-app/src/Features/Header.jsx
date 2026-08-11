import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import "./Header.css";
import { FaCartPlus, FaHome } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { BiCategoryAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import api from "../api";

function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    api.get("/auth/me")
      .then(() => setLoggedIn(true))
      .catch(() => setLoggedIn(false));
  }, [location.pathname]);

  // Sync category & search state from URL query parameters
  useEffect(() => {
    const cat = searchParams.get("category") || "all";
    const q = searchParams.get("search") || "";
    setSelectedCategory(cat);
    setSearchQuery(q);
  }, [searchParams]);

  const handleLogout = async () => {
    await api.post("/auth/logout");
    setLoggedIn(false);
    navigate("/login");
  };

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    setSelectedCategory(cat);
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("search", searchQuery.trim());
    if (cat && cat !== "all") params.set("category", cat);
    navigate(`/productlist?${params.toString()}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("search", searchQuery.trim());
    if (selectedCategory && selectedCategory !== "all") params.set("category", selectedCategory);
    navigate(`/productlist?${params.toString()}`);
  };

  return (
    <header className="pill-header">
      <div className="pill-inner">
        {/* LEFT */}
        <Link to="/" className="pill-brand">
          <FaHome />
          <span>Shop</span>
        </Link>

        {/* CENTER */}
        <div className="pill-nav">
          <Link to="/" className="pill-link">Home</Link>
          <Link to="/productlist" className="pill-link">Products</Link>
          
          {/* CATEGORY SELECTOR IN NAVBAR */}
          <div className="pill-category-wrap">
            <BiCategoryAlt className="pill-cat-icon" />
            <select
              className="pill-category-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothes">Clothes</option>
              <option value="sports">Sports</option>
              <option value="shoes">Shoes</option>
            </select>
          </div>

          <form onSubmit={handleSearchSubmit} className="pill-search-form">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pill-search-input"
            />
            <button type="submit" className="pill-search-button" title="Search">
              <GoSearch />
              <span>Search</span>
            </button>
          </form>


        </div>

        {/* RIGHT */}
        {loggedIn && (
          <button className="pill-logout" onClick={handleLogout}>
            Logout
          </button>
        )}
        <Link to="/cart" className="pill-link pill-cart" title="Shopping Cart">
          <FaCartPlus />
          {cartItems.length > 0 && (
            <span className="pill-badge">
              {cartItems.reduce((acc, i) => acc + Number(i.quantity || 1), 0)}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;








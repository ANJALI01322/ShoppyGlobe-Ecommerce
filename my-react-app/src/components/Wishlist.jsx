import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist, clearWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import "./Wishlist.css";

function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = async (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    try {
      await api.post("/cart/add", {
        productId: product._id,
        title: product.title,
        price: product.price,
        images: product.images,
        quantity: 1,
      });
    } catch {}
  };

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <Link to="/" className="wishlist-back-btn">
          ← Back to Home
        </Link>
        <div className="wishlist-header">
          <h1>❤️ My Wishlist</h1>
          {wishlistItems.length > 0 && (
            <button className="wishlist-clear-btn" onClick={() => dispatch(clearWishlist())}>
              Clear All
            </button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="wishlist-empty">
            <div className="empty-icon">💔</div>
            <h2>Your Wishlist is Empty</h2>
            <p>Explore products and save your favorite items here!</p>
            <Link to="/productlist" className="wishlist-shop-btn">
              Discover Products
            </Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map((item) => (
              <div 
                key={item._id} 
                className="wishlist-card"
                onClick={() => navigate(`/productdetail/${item._id}`)}
              >
                <button 
                  className="wishlist-remove-card-btn"
                  title="Remove from Wishlist"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(item._id);
                  }}
                >
                  ✕
                </button>
                <div className="wishlist-media">
                  <img 
                    src={item.images?.[0] || `https://picsum.photos/seed/${item._id}/400/300`} 
                    alt={item.title} 
                  />
                </div>
                <div className="wishlist-details">
                  <h3>{item.title}</h3>
                  <div className="wishlist-price-row">
                    <span className="wishlist-price">₹{item.price}</span>
                  </div>
                  <button 
                    className="wishlist-add-cart-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(item);
                    }}
                  >
                    🛒 Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;

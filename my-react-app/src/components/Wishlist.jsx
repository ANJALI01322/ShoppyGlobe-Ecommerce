import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setWishlist, removeFromWishlist, clearWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import "./Wishlist.css";

function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/wishlist")
      .then((res) => {
        if (res.data?.wishlist) {
          dispatch(setWishlist(res.data.wishlist));
        }
      })
      .catch(() => {});
  }, [dispatch]);

  const handleAddToCart = async (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    try {
      await api.post("/cart/add", {
        productId: product._id || product,
        title: product.title,
        price: product.price,
        images: product.images,
        quantity: 1,
      });
    } catch {}
  };

  const handleRemove = async (productId) => {
    dispatch(removeFromWishlist(productId));
    try {
      await api.delete(`/wishlist/${productId}`);
    } catch {}
  };

  const handleClear = async () => {
    dispatch(clearWishlist());
    try {
      await api.delete("/wishlist/clear");
    } catch {}
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
            <button className="wishlist-clear-btn" onClick={handleClear}>
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
            {wishlistItems.map((item) => {
              const itemId = item._id || item;
              const itemTitle = item.title || "Product";
              const itemPrice = item.price || 0;
              const itemImg = item.images?.[0] || `https://picsum.photos/seed/${itemId}/400/300`;

              return (
                <div 
                  key={itemId} 
                  className="wishlist-card"
                  onClick={() => navigate(`/productdetail/${itemId}`)}
                >
                  <button 
                    className="wishlist-remove-card-btn"
                    title="Remove from Wishlist"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(itemId);
                    }}
                  >
                    ✕
                  </button>
                  <div className="wishlist-media">
                    <img 
                      src={itemImg} 
                      alt={itemTitle} 
                    />
                  </div>
                  <div className="wishlist-details">
                    <h3>{itemTitle}</h3>
                    <div className="wishlist-price-row">
                      <span className="wishlist-price">₹{itemPrice}</span>
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
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;


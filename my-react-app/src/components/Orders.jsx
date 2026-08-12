import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Review Modal state
  const [selectedReviewItem, setSelectedReviewItem] = useState(null); // item object
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [userReviews, setUserReviews] = useState({});

  useEffect(() => {
    fetchOrders();
    try {
      const saved = JSON.parse(localStorage.getItem("pvx_user_reviews") || "{}");
      setUserReviews(saved);
    } catch (e) {}
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/orders");
      if (res.data?.success && Array.isArray(res.data.orders)) {
        setOrders(res.data.orders);
      } else {
        loadLocalOrders();
      }
    } catch (err) {
      console.error("Failed to fetch orders from server", err);
      loadLocalOrders();
    } finally {
      setLoading(false);
    }
  };

  const loadLocalOrders = () => {
    try {
      const saved = localStorage.getItem("pvx_user_orders");
      if (saved) {
        setOrders(JSON.parse(saved));
      }
    } catch (e) {
      setOrders([]);
    }
  };

  const openReviewModal = (item) => {
    const prodId = String(item.productId || item._id);
    const existing = userReviews[prodId]?.[0];
    setSelectedReviewItem(item);
    setReviewRating(existing ? existing.rating : 5);
    setReviewText(existing ? existing.text : "");
  };

  const handleSaveReview = async (e) => {
    e.preventDefault();
    if (!selectedReviewItem) return;

    let userName = "Verified Customer";
    try {
      const res = await api.get("/auth/me");
      userName = res.data?.user?.name || "Verified Customer";
    } catch (e) {}

    const prodId = String(selectedReviewItem.productId || selectedReviewItem._id);
    const newReview = {
      id: "rev_" + Date.now(),
      name: userName,
      avatar: userName.slice(0, 2).toUpperCase(),
      date: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
      rating: Number(reviewRating),
      text: reviewText || "Great product! Very satisfied with the quality.",
    };

    const updated = { ...userReviews, [prodId]: [newReview] };
    setUserReviews(updated);
    localStorage.setItem("pvx_user_reviews", JSON.stringify(updated));
    setSelectedReviewItem(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return <div className="orders-loading">Loading your orders...</div>;
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <div className="orders-top-header">
          <Link to="/" className="orders-back-btn">
            ← Back to Home
          </Link>
          <h1>📦 My Orders</h1>
          <p className="orders-subtext">Manage, track, and review your recent purchases</p>
        </div>

        {orders.length === 0 ? (
          <div className="orders-empty-card">
            <div className="orders-empty-icon">🛍️</div>
            <h2>No Orders Placed Yet</h2>
            <p>Looks like you haven't placed any orders yet. Explore our latest products and start shopping!</p>
            <Link to="/productlist" className="orders-shop-now-btn">
              Explore Products →
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order, idx) => (
              <div className="order-card" key={order.orderId || order._id || idx}>
                {/* CARD HEADER */}
                <div className="order-card-header">
                  <div className="order-header-left">
                    <span className="order-id-label">Order ID</span>
                    <strong className="order-id-val">{order.orderId || `ORD-${idx + 1}`}</strong>
                    <span className="order-date">📅 {formatDate(order.createdAt)}</span>
                  </div>
                  <div className="order-header-right">
                    <span className={`order-status-badge ${order.status?.toLowerCase() || "confirmed"}`}>
                      ✓ {order.status || "Confirmed"}
                    </span>
                  </div>
                </div>

                {/* ITEMS LIST */}
                <div className="order-items-container">
                  {order.items && order.items.map((item, itemIdx) => {
                    const prodId = String(item.productId || item._id);
                    const existingRev = userReviews[prodId]?.[0];
                    return (
                      <div className="order-item-row" key={prodId || itemIdx}>
                        <img
                          src={item.image || `https://picsum.photos/seed/${prodId || itemIdx}/100/100`}
                          alt={item.title}
                          className="order-item-img"
                        />
                        <div className="order-item-details">
                          <h4 className="order-item-title">{item.title}</h4>
                          <div className="order-item-meta">
                            <span className="order-item-qty">Qty: {item.quantity}</span>
                            <span className="order-item-price">Price: ₹{Number(item.price).toFixed(2)}</span>
                          </div>
                        </div>

                        <div className="order-item-right">
                          <strong className="order-item-total">
                            ₹{(Number(item.price) * Number(item.quantity)).toFixed(2)}
                          </strong>
                          <button
                            type="button"
                            className={`order-review-btn ${existingRev ? "reviewed" : ""}`}
                            onClick={() => openReviewModal(item)}
                          >
                            {existingRev ? `⭐ Reviewed (${existingRev.rating}★)` : "⭐ Write a Review"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* CARD FOOTER */}
                <div className="order-card-footer">
                  <div className="order-footer-details">
                    <div className="order-footer-info">
                      <span className="info-label">Payment Method:</span>
                      <span className="info-val">
                        {order.paymentMethod === "cod" ? "💵 Cash on Delivery" : "💳 Online Payment"}
                      </span>
                    </div>

                    {order.shippingAddress && (
                      <div className="order-footer-info">
                        <span className="info-label">Delivering To:</span>
                        <span className="info-val">
                          {typeof order.shippingAddress === "string"
                            ? order.shippingAddress
                            : `${order.shippingAddress.fullName || ""}${
                                order.shippingAddress.phone ? ` (📞 ${order.shippingAddress.phone})` : ""
                              } - ${order.shippingAddress.street || order.shippingAddress.address || ""}, ${
                                order.shippingAddress.city || ""
                              }`}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="order-footer-total">
                    <span>Total Amount Paid</span>
                    <strong>₹{Number(order.totalAmount).toFixed(2)}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ⭐ WRITE A REVIEW MODAL */}
      {selectedReviewItem && (
        <div className="review-modal-overlay">
          <div className="review-modal-card">
            <div className="review-modal-header">
              <h3>⭐ Your Review & Rating</h3>
              <button className="review-modal-close" onClick={() => setSelectedReviewItem(null)}>✕</button>
            </div>

            <div className="review-modal-prod">
              <img
                src={selectedReviewItem.image || `https://picsum.photos/seed/${selectedReviewItem.productId}/100/100`}
                alt=""
              />
              <div>
                <h4>{selectedReviewItem.title}</h4>
                <span className="verified-tag">✓ Verified Purchase</span>
              </div>
            </div>

            <form onSubmit={handleSaveReview}>
              <div className="review-form-group">
                <label>Select Rating</label>
                <div className="star-rating-selector">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star-btn ${star <= reviewRating ? "active" : ""}`}
                      onClick={() => setReviewRating(star)}
                    >
                      ★
                    </button>
                  ))}
                  <span className="rating-num-label">{reviewRating} / 5 Stars</span>
                </div>
              </div>

              <div className="review-form-group">
                <label>Your Feedback & Experience</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Share how this product performed, quality, fit, or overall impression..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
              </div>

              <div className="review-modal-actions">
                <button type="submit" className="save-review-submit-btn">
                  💾 Submit Review
                </button>
                <button
                  type="button"
                  className="cancel-review-btn"
                  onClick={() => setSelectedReviewItem(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;

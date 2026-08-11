import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./Checkout.css";

function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleOrder(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.address) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.delete("/cart/clear");
      dispatch(clearCart());
      setOrderPlaced(true);
    } catch {
      alert("Order failed. Try again.");
    }
  }

  useEffect(() => {
    let timer;
    if (orderPlaced) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            navigate("/");
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [orderPlaced, navigate]);

  const [paymentMethod, setPaymentMethod] = useState("upi");

  return (
    <div className="checkout-page">
      {!orderPlaced ? (
        <form className="checkout-card" onSubmit={handleOrder}>
          <h1>Checkout & Payment</h1>

          {/* CUSTOMER INFO */}
          <div className="form-group">
            <label>Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. rahul@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Delivery Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="House/Flat No., Street, City, Pincode"
              required
            />
          </div>

          {/* PAYMENT METHOD */}
          <div className="form-group">
            <label>Payment Method</label>
            <div className="payment-options">
              <label className={`payment-option ${paymentMethod === "upi" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>⚡ UPI / GPay / PhonePe</span>
              </label>

              <label className={`payment-option ${paymentMethod === "card" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>💳 Credit / Debit Card</span>
              </label>

              <label className={`payment-option ${paymentMethod === "cod" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>💵 Cash on Delivery</span>
              </label>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="summary">
            <h2>Order Summary</h2>

            {cartItems.length === 0 ? (
              <p className="empty">Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div className="summary-row" key={item.productId || item.title}>
                  <span>
                    {item.title} (×{item.quantity})
                  </span>
                  <strong>₹{(item.price * item.quantity).toFixed(2)}</strong>
                </div>
              ))
            )}

            <div className="summary-total">
              <span>Total Amount to Pay</span>
              <strong>₹{total.toFixed(2)}</strong>
            </div>
          </div>

          <button className="pay-btn" type="submit">
            Proceed & Pay ₹{total.toFixed(2)} →
          </button>
        </form>
      ) : (
        <div className="success-card">
          <h1>✅ Order Confirmed</h1>
          <p>Thank you for shopping with us.</p>
          <span>Redirecting in {countdown}s…</span>
        </div>
      )}
    </div>
  );
}

export default Checkout;




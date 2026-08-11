import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart, updateQuantity, removeFromCart } from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import "./Cart.css";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    api.get("/cart")
      .then((res) => {
        if (res.data?.cart?.items?.length) {
          dispatch(setCart(res.data.cart.items));
        }
      })
      .catch(() => {
        // Keep local cart items if guest/offline
      });
  }, [dispatch]);

  const increase = async (item) => {
    const newQty = item.quantity + 1;
    dispatch(updateQuantity({ productId: item.productId, quantity: newQty }));
    try {
      await api.patch(`/cart/${item.productId}`, { quantity: newQty });
    } catch {
      // Local state already updated
    }
  };

  const decrease = async (item) => {
    const newQty = item.quantity - 1;
    if (newQty <= 0) {
      dispatch(removeFromCart(item.productId));
      try {
        await api.delete(`/cart/${item.productId}`);
      } catch {
        // Local state updated
      }
      return;
    }
    dispatch(updateQuantity({ productId: item.productId, quantity: newQty }));
    try {
      await api.patch(`/cart/${item.productId}`, { quantity: newQty });
    } catch {
      // Local state updated
    }
  };

  const remove = async (item) => {
    dispatch(removeFromCart(item.productId));
    try {
      await api.delete(`/cart/${item.productId}`);
    } catch {
      // Local state updated
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  return (
    <section className="cart-page">
      <Link to="/productlist" className="cart-back">
        ← Continue shopping
      </Link>

      <h1 className="cart-title">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty 🛒</p>
      ) : (
        <div className="cart-grid">
          {/* LEFT */}
          <div className="cart-list">
            {cartItems.map((item) => {
              const itemTotal = (item.price * item.quantity).toFixed(2);
              return (
                <div className="cart-card" key={item.productId}>
                  <img
                    src={item.images?.[0] || `https://picsum.photos/seed/${item.productId}/200/200`}
                    alt={item.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://picsum.photos/seed/${item.productId}/200/200`;
                    }}
                  />

                  <div className="cart-info">
                    <h3>{item.title}</h3>
                    <div className="cart-price-details">
                      <span className="unit-price">₹{item.price} each</span>
                      <span className="item-subtotal">Item Total: ₹{itemTotal}</span>
                    </div>
                  </div>

                  <div className="qty">
                    <button onClick={() => decrease(item)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increase(item)}>+</button>
                  </div>

                  <button className="remove" onClick={() => remove(item)}>
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          {/* RIGHT */}
          <aside className="summary">
            <h2>Order Summary</h2>

            <div className="row">
              <span>Subtotal ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
              <span className="amount">₹{total.toFixed(2)}</span>
            </div>

            <div className="divider" />

            <div className="total">
              <span>Total Amount</span>
              <strong>₹{total.toFixed(2)}</strong>
            </div>

            <button
              className="checkout"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Payment 💳
            </button>
          </aside>
        </div>
      )}
    </section>
  );
}

export default Cart;













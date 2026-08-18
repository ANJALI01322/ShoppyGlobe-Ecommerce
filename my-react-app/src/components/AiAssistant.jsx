
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function AiAssistant() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi! 👋 I'm your ShoppsyMart AI Assistant. Tell me what you're looking for — for example, \"I need a good smartphone\" or \"show me shoes under ₹5000\".",
      products: [],
    },
  ]);

  const sendMessage = async (e) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) return;

    const userMessage = {
      role: "user",
      text: trimmedMessage,
      products: [],
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const response = await api.post("/ai/chat", {
        message: trimmedMessage,
      });

      const data = response.data;

      if (!data?.success) {
        throw new Error(data?.message || "AI Assistant failed");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            data.reply ||
            "Here are some products that may be useful for you.",
          products: Array.isArray(data.products) ? data.products : [],
        },
      ]);
    } catch (error) {
      console.error("AI Assistant Error:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to connect to AI Assistant.";

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: `Sorry, I couldn't process that request. ${errorMessage}`,
          products: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewProduct = (product) => {
    if (!product?._id) return;

    navigate(`/product/${product._id}`);
    setIsOpen(false);
  };

  const handleAddToCart = async (product) => {
    if (!product?._id) return;

    try {
      await api.post("/cart", {
        productId: product._id,
        title: product.title,
        price: product.price,
        images: product.images,
        quantity: 1,
      });

      // Keep Redux cart synchronized with the existing frontend flow.
      try {
        dispatch(
          addToCart({
            ...product,
            quantity: 1,
          })
        );
      } catch (reduxError) {
        console.warn("Redux cart sync skipped:", reduxError);
      }

      alert(`${product.title} added to cart.`);
    } catch (error) {
      console.error("Add to cart error:", error);

      const errorMessage =
        error?.response?.data?.message ||
        "Unable to add this product to cart.";

      alert(errorMessage);
    }
  };

  const formatPrice = (price) => {
    if (typeof price !== "number") return "Price unavailable";

    return `₹${price.toLocaleString("en-IN")}`;
  };

  return (
    <div className="ai-assistant-wrapper">
      {!isOpen && (
        <button
          type="button"
          className="ai-toggle-btn"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Shopping Assistant"
        >
          <span className="ai-toggle-icon">✨</span>
          AI Assistant
        </button>
      )}

      {isOpen && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <div className="ai-header-title">
              <span className="ai-sparkle">✨</span>

              <div>
                <h3>ShoppsyMart AI</h3>
                <small>Smart Shopping Assistant</small>
              </div>
            </div>

            <button
              type="button"
              className="ai-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close AI Assistant"
            >
              ✕
            </button>
          </div>

          <div className="ai-messages-container">
            {messages.map((msg, index) => (
              <div
                key={`${msg.role}-${index}`}
                className={`ai-message-row ${msg.role}`}
              >
                <div className="ai-message-bubble">
                  <p>{msg.text}</p>

                  {msg.products?.length > 0 && (
                    <div className="ai-recommendations-grid">
                      {msg.products.map((product) => (
                        <div
                          className="ai-product-card"
                          key={product._id}
                        >
                          <img
                            src={
                              product.images?.[0] ||
                              "https://via.placeholder.com/50"
                            }
                            alt={product.title || "Product"}
                          />

                          <div className="ai-card-info">
                            <h4 title={product.title}>
                              {product.title}
                            </h4>

                            <span className="ai-card-price">
                              {formatPrice(product.price)}
                            </span>

                            <div className="ai-card-actions">
                              <button
                                type="button"
                                className="ai-view-btn"
                                onClick={() =>
                                  handleViewProduct(product)
                                }
                              >
                                View
                              </button>

                              <button
                                type="button"
                                className="ai-cart-btn"
                                onClick={() =>
                                  handleAddToCart(product)
                                }
                                disabled={
                                  Number(product.stock || 0) <= 0
                                }
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="ai-message-row ai">
                <div className="ai-message-bubble loading-bubble">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
            )}
          </div>

          <form className="ai-chat-form" onSubmit={sendMessage}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask me what you're looking for..."
              disabled={loading}
              autoComplete="off"
            />

            <button
              type="submit"
              disabled={loading || !message.trim()}
            >
              {loading ? "..." : "Send"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AiAssistant;


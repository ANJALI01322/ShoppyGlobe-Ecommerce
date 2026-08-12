import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCart, addToCart, updateQuantity, removeFromCart } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import "./Productdetail.css";
import api from "../api";

import { electronicsProducts } from "../data/electronicsData";
import { clothesProducts } from "../data/clothesData";
import { shoesProducts } from "../data/shoesData";
import { sportsProducts } from "../data/sportsData";
import { getProductReviews } from "../data/productReviews";

const staticProducts = [...electronicsProducts, ...clothesProducts, ...shoesProducts, ...sportsProducts];

// Get related products from the same sub-category
const PHONE_IDS   = new Set(["elec-001","elec-002","elec-015","elec-029","elec-030","elec-045"]);
const LAPTOP_IDS  = new Set(["elec-003","elec-007","elec-012","elec-028","elec-034","elec-036"]);
const HEADPH_IDS  = new Set(["elec-004","elec-009","elec-023","elec-037","elec-047"]);
const TABLET_IDS  = new Set(["elec-006","elec-013","elec-022","elec-041"]);
const GAMING_IDS  = new Set(["elec-005","elec-026","elec-043","elec-044","elec-049"]);
const WATCH_IDS   = new Set(["elec-008","elec-035"]);
const CAMERA_IDS  = new Set(["elec-011","elec-018","elec-019","elec-031"]);
const TV_IDS      = new Set(["elec-010","elec-020","elec-025","elec-033","elec-051"]);
const SPEAKER_IDS = new Set(["elec-014","elec-024","elec-032","elec-042","elec-048"]);

const ELEC_SUBCATS = [
  { ids: PHONE_IDS,   label: "Phones" },
  { ids: LAPTOP_IDS,  label: "Laptops" },
  { ids: HEADPH_IDS,  label: "Headphones" },
  { ids: TABLET_IDS,  label: "Tablets" },
  { ids: GAMING_IDS,  label: "Gaming" },
  { ids: WATCH_IDS,   label: "Watches" },
  { ids: CAMERA_IDS,  label: "Cameras" },
  { ids: TV_IDS,      label: "TVs" },
  { ids: SPEAKER_IDS, label: "Speakers" },
];

function getRelatedProducts(currentProduct) {
  if (!currentProduct) return [];
  const id = String(currentProduct._id);
  const cat = (currentProduct.category || "").toLowerCase();

  // Shoes / Clothes / Sports — return same pool
  if (cat.includes("shoe") || id.startsWith("shoe")) {
    return shoesProducts.filter((p) => String(p._id) !== id).slice(0, 8);
  }
  if (cat.includes("cloth") || id.startsWith("clot")) {
    return clothesProducts.filter((p) => String(p._id) !== id).slice(0, 8);
  }
  if (cat.includes("sport") || id.startsWith("spor")) {
    return sportsProducts.filter((p) => String(p._id) !== id).slice(0, 8);
  }

  // Electronics — find matching sub-category by ID whitelist
  for (const subcat of ELEC_SUBCATS) {
    if (subcat.ids.has(id)) {
      return electronicsProducts
        .filter((p) => subcat.ids.has(String(p._id)) && String(p._id) !== id)
        .slice(0, 8);
    }
  }

  // Fallback for uncategorized electronics (mouse, keyboard, etc.)
  return electronicsProducts.filter((p) => String(p._id) !== id).slice(0, 8);
}


// Star rendering helper
function StarRating({ rating, size = "md" }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const filled = i <= Math.floor(rating);
    const half   = !filled && i === Math.ceil(rating) && rating % 1 >= 0.4;
    stars.push(
      <span key={i} className={`star ${filled ? "star-full" : half ? "star-half" : "star-empty"} star-${size}`}>
        {filled ? "★" : half ? "⯨" : "☆"}
      </span>
    );
  }
  return <span className="star-row">{stars}</span>;
}

function getProductSpecs(product) {
  if (!product) return {};
  const title = product.title || "";
  const cat = (product.category || "").toLowerCase();
  const id = String(product._id || "");

  const brandKeywords = [
    "Apple", "Samsung", "Sony", "Google", "OnePlus", "Nothing", "Xiaomi", "Dell", "ASUS",
    "Nike", "Adidas", "Puma", "Reebok", "Levi's", "Tommy Hilfiger", "Decathlon", "Canon", "GoPro", "DJI", "Bose", "JBL", "Marshall"
  ];
  let brand = "Premium Brand";
  for (const b of brandKeywords) {
    if (title.toLowerCase().includes(b.toLowerCase())) {
      brand = b;
      break;
    }
  }

  let model = title.split("(")[0].replace(new RegExp(brand, "gi"), "").trim() || title;

  let formattedCategory = "Electronics";
  if (cat.includes("shoe") || id.startsWith("shoe")) formattedCategory = "Footwear & Shoes";
  else if (cat.includes("cloth") || id.startsWith("clot")) formattedCategory = "Clothing & Fashion";
  else if (cat.includes("sport") || id.startsWith("spor")) formattedCategory = "Sports & Fitness";
  else if (title.toLowerCase().includes("phone") || title.toLowerCase().includes("iphone") || title.toLowerCase().includes("galaxy")) formattedCategory = "Smartphones & Mobiles";
  else if (title.toLowerCase().includes("laptop") || title.toLowerCase().includes("macbook")) formattedCategory = "Laptops & Computers";
  else if (title.toLowerCase().includes("headphone") || title.toLowerCase().includes("earbuds")) formattedCategory = "Audio & Headphones";

  const stockCount = typeof product.stock === "number" ? product.stock : 25;
  const isAvailable = stockCount > 0;
  const availabilityText = isAvailable ? `In Stock (${stockCount} units)` : "Out of Stock";

  let warranty = "1 Year Brand Warranty";
  if (brand === "Apple" || brand === "Dell" || brand === "Sony" || brand === "Samsung") {
    warranty = "1 Year Official Manufacturer Warranty";
  } else if (formattedCategory.includes("Clothing")) {
    warranty = "30 Days Quality Guarantee & Easy Return";
  } else if (formattedCategory.includes("Footwear")) {
    warranty = "6 Months Manufacturer Warranty";
  }

  return { brand, model, category: formattedCategory, availability: availabilityText, isAvailable, warranty };
}

function ProductDetail() {
  const { productId } = useParams();
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reviewsRef = useRef(null);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [toast, setToast] = useState({ show: false, title: "", img: "", type: "cart" });

  const SAMPLE_ADDRESSES = [
    {
      id: "addr-sample-1",
      fullName: "Shivam Sharma",
      phone: "9871234567",
      street: "F-316, Urban Homes, Aditya World City",
      city: "Ghaziabad",
      state: "Uttar Pradesh",
      pincode: "201002",
      isDefault: true,
    },
    {
      id: "addr-sample-2",
      fullName: "Rahul Verma",
      phone: "8800112233",
      street: "Tower B-402, Sector 62",
      city: "Noida",
      state: "Uttar Pradesh",
      pincode: "201301",
      isDefault: false,
    },
    {
      id: "addr-sample-3",
      fullName: "Priya Malhotra",
      phone: "9911445566",
      street: "House No. 84, Ring Road, Model Town",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110009",
      isDefault: false,
    },
  ];

  const [savedAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem("pvx_user_addresses");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return SAMPLE_ADDRESSES;
    } catch {
      return SAMPLE_ADDRESSES;
    }
  });

  const [selectedAddress, setSelectedAddress] = useState(() => {
    return savedAddresses.find((a) => a.isDefault) || savedAddresses[0] || null;
  });

  const currentCartItem = data ? cartItems.find((i) => String(i.productId || i._id) === String(data._id)) : null;
  const isWishlisted = data ? wishlistItems.some((i) => String(i.productId || i._id) === String(data._id)) : false;

  async function handleIncreaseQty(currentQty) {
    if (!data) return;
    const newQty = currentQty + 1;
    dispatch(updateQuantity({ productId: data._id, quantity: newQty }));
    try {
      await api.patch(`/cart/${data._id}`, { quantity: newQty });
    } catch {}
  }

  async function handleDecreaseQty(currentQty) {
    if (!data) return;
    if (currentQty <= 1) {
      dispatch(removeFromCart(data._id));
      try {
        await api.delete(`/cart/${data._id}`);
      } catch {}
      return;
    }
    const newQty = currentQty - 1;
    dispatch(updateQuantity({ productId: data._id, quantity: newQty }));
    try {
      await api.patch(`/cart/${data._id}`, { quantity: newQty });
    } catch {}
  }

  const scrollToReviews = () => {
    if (reviewsRef.current) {
      reviewsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const staticItem = staticProducts.find((p) => String(p._id) === String(productId));
      if (staticItem) {
        setData(staticItem);
        setLoading(false);
        return;
      }
      try {
        const res = await api.get(`/products/${productId}`);
        setData(res.data);
      } catch {
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  async function handleCart() {
    if (!data) return;
    try {
      setAdding(true);
      await api.get("/auth/me");
      dispatch(addToCart({ ...data, quantity: 1 }));
      try {
        await api.post("/cart/add", {
          productId: data._id,
          title: data.title,
          price: data.price,
          images: data.images,
          quantity: 1,
        });
      } catch {}

      // ✨ Show Toast popup banner instead of navigating
      setToast({
        show: true,
        title: data.title,
        img: data.images?.[0] || "",
        type: "cart"
      });

      setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 3500);

    } catch {
      navigate("/login");
    } finally {
      setAdding(false);
    }
  }

  async function handleWishlist() {
    if (!data) return;
    try {
      await api.get("/auth/me");
      if (isWishlisted) {
        dispatch(removeFromWishlist(data._id || data.productId));
        setToast({
          show: true,
          title: data.title,
          img: data.images?.[0] || "",
          type: "wishlist-remove"
        });
      } else {
        dispatch(addToWishlist(data));
        setToast({
          show: true,
          title: data.title,
          img: data.images?.[0] || "",
          type: "wishlist"
        });
      }

      setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 3500);
    } catch {
      navigate("/login");
    }
  }

  if (loading) return <div className="p3d-status">Loading product details…</div>;
  if (error)   return <div className="p3d-status">{error}</div>;
  if (!data)   return <div className="p3d-status">Product not found</div>;

  const { rating, reviewCount, reviews } = getProductReviews(data._id);
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 2);
  const relatedProducts = getRelatedProducts(data);
  const specs = getProductSpecs(data);

  return (
    <section className="p3d-page">
      {/* 🟢 TOAST NOTIFICATION POPUP */}
      {toast.show && (
        <div className="toast-popup-banner">
          <div className="toast-left">
            <span className="toast-check">
              {toast.type === "wishlist-remove" ? "💔" : toast.type === "wishlist" ? "❤️" : "✅"}
            </span>
            {toast.img && <img src={toast.img} alt="" className="toast-img" />}
            <div className="toast-info">
              <strong>
                {toast.type === "wishlist-remove"
                  ? "Removed from Wishlist"
                  : toast.type === "wishlist"
                  ? "Added to Wishlist!"
                  : "Item Added to Cart!"}
              </strong>
              <span className="toast-prod-title">{toast.title}</span>
            </div>
          </div>
          <button 
            className="toast-view-cart-btn" 
            onClick={() => navigate(toast.type.startsWith("wishlist") ? "/wishlist" : "/cart")}
          >
            {toast.type.startsWith("wishlist") ? "❤️ View Wishlist" : "🛒 View Cart"}
          </button>
        </div>
      )}

      <Link to="/productlist" className="p3d-back">← Back to Products</Link>

      <div className="p3d-stage">
        <div className="p3d-card">
          {/* IMAGE */}
          <div className="p3d-image">
            <img
              src={data.images?.[0] || `https://picsum.photos/seed/${data._id}/600/400`}
              alt={data.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://picsum.photos/seed/${data._id}/600/400`;
              }}
            />
          </div>

          {/* CONTENT */}
          <div className="p3d-content">
            <h1>{data.title}</h1>

            {/* ⭐ RATING & REVIEWS LINK */}
            <div className="p3d-rating-row">
              <StarRating rating={rating} size="lg" />
              <span className="p3d-rating-score">{rating}</span>
              <span className="p3d-rating-count">({reviewCount.toLocaleString()} ratings)</span>
              <button className="p3d-reviews-link-btn" onClick={scrollToReviews}>
                💬 Customer Reviews
              </button>
            </div>

            <p className="p3d-desc">{data.description}</p>

            {/* 📍 DELIVERY DETAILS OPTION */}
            <div className="p3d-delivery-box">
              <div className="p3d-delivery-header">
                <div className="p3d-delivery-left">
                  <span className="p3d-delivery-icon">🚚</span>
                  <div>
                    <h4>Delivery Details</h4>
                    <p className="p3d-delivery-address-text">
                      {selectedAddress ? (
                        <>
                          Deliver to: <strong>{selectedAddress.fullName}</strong> ({selectedAddress.city} - {selectedAddress.pincode})
                        </>
                      ) : (
                        "Select delivery address to check availability"
                      )}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="p3d-change-addr-btn"
                  onClick={() => setShowDeliveryModal(true)}
                >
                  📍 Select Address
                </button>
              </div>
              <div className="p3d-delivery-perks">
                <span className="p3d-perk-badge">⚡ Free Express Delivery by Tomorrow, 5:00 PM</span>
                <span className="p3d-perk-badge">💵 Cash on Delivery Available</span>
                <span className="p3d-perk-badge">🔄 7 Days Replacement Guarantee</span>
              </div>
            </div>

            {/* 📋 PRODUCT SPECIFICATIONS COLLAPSIBLE OPTION */}
            <div className="p3d-specs-accordion">
              <button
                type="button"
                className={`p3d-specs-toggle-btn ${showSpecs ? "active" : ""}`}
                onClick={() => setShowSpecs((prev) => !prev)}
              >
                <div className="p3d-specs-toggle-left">
                  <span className="p3d-specs-icon">📋</span>
                  <span>Product Specifications</span>
                </div>
                <span className="p3d-specs-arrow">{showSpecs ? "▲ Hide Specifications" : "▼ View Specifications Table"}</span>
              </button>

              {showSpecs && (
                <div className="p3d-specs-table-wrapper">
                  <table className="p3d-specs-table">
                    <tbody>
                      <tr>
                        <td className="spec-table-label">🏷️ Brand</td>
                        <td className="spec-table-val">{specs.brand}</td>
                      </tr>
                      <tr>
                        <td className="spec-table-label">📱 Model</td>
                        <td className="spec-table-val">{specs.model}</td>
                      </tr>
                      <tr>
                        <td className="spec-table-label">📁 Category</td>
                        <td className="spec-table-val">{specs.category}</td>
                      </tr>
                      <tr>
                        <td className="spec-table-label">📦 Availability</td>
                        <td className="spec-table-val">
                          <span className={`p3d-stock-badge ${specs.isAvailable ? "in-stock" : "out-of-stock"}`}>
                            {specs.isAvailable ? "🟢 " : "🔴 "}{specs.availability}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="spec-table-label">🛡️ Warranty</td>
                        <td className="spec-table-val">{specs.warranty}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* PRICE */}
            <div className="p3d-price">
              <span>Price</span>
              <strong>₹{Number(data.price).toFixed(2)}</strong>
            </div>

            {/* ACTION BUTTONS */}
            <div className="p3d-action-buttons">
              {currentCartItem ? (
                <div className="p3d-qty-control">
                  <button
                    className="p3d-qty-ctrl-btn"
                    onClick={() => handleDecreaseQty(currentCartItem.quantity)}
                    title={currentCartItem.quantity === 1 ? "Remove from cart" : "Decrease quantity"}
                  >
                    −
                  </button>
                  <span className="p3d-qty-ctrl-val">{currentCartItem.quantity}</span>
                  <button
                    className="p3d-qty-ctrl-btn"
                    onClick={() => handleIncreaseQty(currentCartItem.quantity)}
                    title="Increase quantity"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button className="p3d-btn" onClick={handleCart} disabled={adding}>
                  🛒 {adding ? "Adding to Cart…" : "Add to Cart"}
                </button>
              )}
              <button
                className={`p3d-wishlist-btn ${isWishlisted ? "wishlisted" : ""}`}
                onClick={handleWishlist}
                title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <span style={{ fontSize: "18px" }}>{isWishlisted ? "❤️" : "🤍"}</span>
                <span>{isWishlisted ? "Wishlisted" : "Add to Wishlist"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== EXPLORE MORE SECTION ===== */}
      {relatedProducts.length > 0 && (
        <div className="p3d-explore-container">
          <div className="p3d-explore-header" style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#ffffff" }}>✨ Explore More Similar Products</h3>
          </div>
          <div className="p3d-explore-grid-wrap">
            <div className="p3d-explore-grid">
              {relatedProducts.map((p) => (
                <div
                  className="p3d-explore-card"
                  key={p._id}
                  onClick={() => navigate(`/productdetail/${p._id}`)}
                >
                  <div className="p3d-explore-img">
                    <img
                      src={p.images?.[0] || `https://picsum.photos/seed/${p._id}/400/300`}
                      alt={p.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://picsum.photos/seed/${p._id}/400/300`;
                      }}
                    />
                  </div>
                  <div className="p3d-explore-body">
                    <h4>{p.title}</h4>
                    <span className="p3d-explore-price">₹{p.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== REVIEWS SECTION ===== */}
      <div className="p3d-reviews-section" ref={reviewsRef} id="reviews-section">
        <div className="p3d-reviews-header">
          <h2>Customer Reviews</h2>
          <div className="p3d-reviews-summary">
            <div className="p3d-big-rating">
              <span className="p3d-big-score">{rating}</span>
              <div>
                <StarRating rating={rating} size="xl" />
                <p>{reviewCount.toLocaleString()} verified ratings</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p3d-reviews-list">
          {displayedReviews.map((rev) => (
            <div className="p3d-review-card" key={rev.id}>
              <div className="p3d-review-top">
                <div className="p3d-avatar">{rev.avatar}</div>
                <div className="p3d-reviewer-info">
                  <span className="p3d-reviewer-name">{rev.name}</span>
                  <span className="p3d-reviewer-date">{rev.date}</span>
                </div>
                <StarRating rating={rev.rating} size="sm" />
              </div>
              <p className="p3d-review-text">{rev.text}</p>
            </div>
          ))}
        </div>

        {reviews.length > 2 && (
          <button
            className="p3d-show-more"
            onClick={() => setShowAllReviews((prev) => !prev)}
          >
            {showAllReviews ? "▲ Show Less" : `▼ Show All ${reviews.length} Reviews`}
          </button>
        )}
      </div>

      {/* 📍 ADDRESS SELECTION POPUP MODAL */}
      {showDeliveryModal && (
        <div className="address-select-modal-overlay">
          <div className="address-select-modal">
            <div className="modal-header">
              <h3>📍 Select Delivery Address</h3>
              <button className="close-modal-btn" onClick={() => setShowDeliveryModal(false)}>✕</button>
            </div>

            <div className="saved-addresses-modal-list">
              {savedAddresses.map((addr) => (
                <div
                  key={addr.id || addr._id}
                  className={`modal-addr-card ${selectedAddress?.id === addr.id ? "selected" : ""}`}
                  onClick={() => {
                    setSelectedAddress(addr);
                    setShowDeliveryModal(false);
                  }}
                >
                  <div className="modal-addr-top">
                    <strong>{addr.fullName}</strong>
                    {selectedAddress?.id === addr.id && <span className="default-tag">Selected</span>}
                  </div>
                  <p className="modal-addr-phone">📞 {addr.phone}</p>
                  <p className="modal-addr-street">
                    {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductDetail;











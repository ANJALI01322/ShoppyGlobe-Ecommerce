import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  addToCart,
  updateQuantity,
  removeFromCart,
} from "../redux/cartSlice";

import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/wishlistSlice";

import { electronicsProducts } from "../data/electronicsData";
import { clothesProducts } from "../data/clothesData";
import { shoesProducts } from "../data/shoesData";
import { sportsProducts } from "../data/sportsData";
import { getProductReviews } from "../data/productReviews";

import api from "../api";
import "./Productdetail.css";

const allStaticProducts = [
  ...electronicsProducts,
  ...clothesProducts,
  ...shoesProducts,
  ...sportsProducts,
];

function StarRating({ rating }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const filled = i <= Math.floor(rating);
    const half =
      !filled && i === Math.ceil(rating) && rating % 1 >= 0.4;

    stars.push(
      <span
        key={i}
        className={`star-icon ${
          filled ? "full" : half ? "half" : "empty"
        }`}
      >
        {filled ? "★" : half ? "⯨" : "☆"}
      </span>
    );
  }

  return <div className="star-row">{stars}</div>;
}

export default function Productdetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart?.items || []
  );

  const wishlistItems = useSelector(
    (state) => state.wishlist?.items || []
  );

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState(allStaticProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Review Form State
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewSubmittedMsg, setReviewSubmittedMsg] = useState("");

  const [reviewsData, setReviewsData] = useState({
    rating: 0,
    reviewCount: 0,
    reviews: [],
  });

  // Toast
  const [toast, setToast] = useState({
    show: false,
    title: "",
    img: "",
    type: "cart",
  });

  const showToast = (title, img, type = "cart") => {
    setToast({
      show: true,
      title,
      img,
      type,
    });

    setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        show: false,
      }));
    }, 3000);
  };

  // =========================================================
  // 1. Fetch Product Data
  // =========================================================

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    setError(null);
    setQuantity(1);

    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${productId}`);

        if (isMounted) {
          if (res.data && res.data._id) {
            setProduct(res.data);

            const firstImg =
              res.data.images && res.data.images.length > 0
                ? res.data.images[0]
                : `https://picsum.photos/seed/${res.data._id}/600/600`;

            setSelectedImage(firstImg);
            setError(null);
          } else {
            setError("Unable to load product.");
          }
        }
      } catch (err) {
        console.error("Failed to fetch product from API:", err);
        if (isMounted) {
          setError("Unable to load product.");
          setProduct(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    // Fetch all products for recommendations
    api
      .get("/products")
      .then((res) => {
        if (
          Array.isArray(res.data) &&
          res.data.length > 0 &&
          isMounted
        ) {
          setAllProducts(res.data);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [productId]);

  // =========================================================
  // 2. Load Reviews
  // =========================================================

  useEffect(() => {
    if (productId) {
      const data = getProductReviews(productId);
      setReviewsData(data);
    }
  }, [productId, reviewSubmittedMsg]);

  // =========================================================
  // Check if product is in cart
  // =========================================================

  const cartItem = useMemo(() => {
    if (!product) return null;

    return cartItems.find(
      (item) =>
        String(item.productId || item._id) ===
        String(product._id)
    );
  }, [cartItems, product]);

  // =========================================================
  // Check if product is in wishlist
  // =========================================================

  const isWishlisted = useMemo(() => {
    if (!product) return false;

    return wishlistItems.some(
      (item) =>
        String(item._id || item.productId) ===
        String(product._id)
    );
  }, [wishlistItems, product]);

  // =========================================================
  // Recommendations
  // =========================================================

  const relatedProducts = useMemo(() => {
    if (!product) return [];

    const cat = (product.category || "").toLowerCase();

    return allProducts
      .filter(
        (p) =>
          String(p._id) !== String(product._id) &&
          (p.category || "").toLowerCase() === cat
      )
      .slice(0, 4);
  }, [allProducts, product]);

  // =========================================================
  // Add To Cart
  // =========================================================

  const handleAddToCart = async () => {
    if (!product) return;

    dispatch(
      addToCart({
        ...product,
        quantity,
      })
    );

    try {
      await api.post("/cart/add", {
        productId: product._id,
        title: product.title,
        price: product.price,
        images: product.images,
        quantity,
      });
    } catch (e) {
      // Guest/local cart works normally
    }

    showToast(
      product.title,
      selectedImage,
      "cart"
    );
  };

  // =========================================================
  // Buy Now
  // =========================================================

  const handleBuyNow = async () => {
    if (!product) return;

    dispatch(
      addToCart({
        ...product,
        quantity,
      })
    );

    navigate("/checkout", {
      state: {
        singleItem: {
          productId: product._id,
          title: product.title,
          price: product.price,
          images: product.images || [selectedImage],
          quantity,
        },
      },
    });
  };

  // =========================================================
  // Wishlist
  // =========================================================

  const handleToggleWishlist = () => {
    if (!product) return;

    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));

      showToast(
        product.title,
        selectedImage,
        "wishlist-remove"
      );
    } else {
      dispatch(addToWishlist(product));

      showToast(
        product.title,
        selectedImage,
        "wishlist"
      );
    }
  };

  // =========================================================
  // Increase Quantity
  // =========================================================

  const handleIncreaseQty = () => {
    if (cartItem) {
      const newQty = (cartItem.quantity || 1) + 1;

      dispatch(
        updateQuantity({
          productId: product._id,
          quantity: newQty,
        })
      );

      api
        .patch(`/cart/${product._id}`, {
          quantity: newQty,
        })
        .catch(() => {});
    } else {
      setQuantity((q) => q + 1);
    }
  };

  // =========================================================
  // Decrease Quantity
  // =========================================================

  const handleDecreaseQty = () => {
    if (cartItem) {
      const newQty = (cartItem.quantity || 1) - 1;

      if (newQty <= 0) {
        dispatch(removeFromCart(product._id));

        api
          .delete(`/cart/${product._id}`)
          .catch(() => {});
      } else {
        dispatch(
          updateQuantity({
            productId: product._id,
            quantity: newQty,
          })
        );

        api
          .patch(`/cart/${product._id}`, {
            quantity: newQty,
          })
          .catch(() => {});
      }
    } else {
      setQuantity((q) => (q > 1 ? q - 1 : 1));
    }
  };

  // =========================================================
  // Add Review
  // =========================================================

  const handleAddReview = (e) => {
    e.preventDefault();

    if (
      !reviewName.trim() ||
      !reviewText.trim()
    ) {
      return;
    }

    try {
      const existingReviews = JSON.parse(
        localStorage.getItem("pvx_user_reviews") || "{}"
      );

      const itemReviews =
        existingReviews[productId] || [];

      const newEntry = {
        id: Date.now(),
        name: reviewName.trim(),
        avatar: reviewName
          .trim()
          .slice(0, 2)
          .toUpperCase(),
        date: "Just now",
        rating: Number(reviewRating),
        text: reviewText.trim(),
      };

      existingReviews[productId] = [
        newEntry,
        ...itemReviews,
      ];

      localStorage.setItem(
        "pvx_user_reviews",
        JSON.stringify(existingReviews)
      );

      setReviewName("");
      setReviewText("");
      setReviewRating(5);

      setReviewSubmittedMsg(
        "Thank you! Your review has been added."
      );

      setTimeout(() => {
        setReviewSubmittedMsg("");
      }, 4000);
    } catch (err) {
      console.error(err);
    }
  };

  // =========================================================
  // Loading State
  // =========================================================

  if (loading) {
    return (
      <div className="p3d-page">
        <div className="p3d-status">
          Loading product details...
        </div>
      </div>
    );
  }

  // =========================================================
  // Error State
  // =========================================================

  if (error || !product) {
    return (
      <div className="p3d-page">
        <Link
          to="/productlist"
          className="p3d-back"
        >
          ← Back to collection
        </Link>

        <div
          className="p3d-status"
          style={{ marginTop: "60px" }}
        >
          <h2>Product Not Found</h2>

          <p>
            The requested product could not be located.
          </p>

          <Link
            to="/productlist"
            className="p3d-btn"
            style={{
              display: "inline-block",
              marginTop: "20px",
              width: "auto",
              padding: "12px 24px",
            }}
          >
            Explore All Products
          </Link>
        </div>
      </div>
    );
  }

  // =========================================================
  // Gallery Images
  // =========================================================

  const galleryImages =
    product.images &&
    product.images.length > 0
      ? product.images
      : [selectedImage];

  // =========================================================
  // Main JSX
  // =========================================================

  return (
    <div className="p3d-page">

      {/* Toast */}
      {toast.show && (
        <div
          style={{
            position: "fixed",
            top: "90px",
            right: "24px",
            zIndex: 9999,
            background: "#0d1b2a",
            border: "1px solid #00d4aa",
            borderRadius: "12px",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            boxShadow:
              "0 10px 30px rgba(0,212,170,0.3)",
            color: "#fff",
          }}
        >
          {toast.img && (
            <img
              src={toast.img}
              alt=""
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "6px",
                objectFit: "cover",
              }}
            />
          )}

          <div>
            <strong
              style={{
                display: "block",
                fontSize: "14px",
                color: "#00d4aa",
              }}
            >
              {toast.type === "wishlist-remove"
                ? "Removed from Wishlist"
                : toast.type === "wishlist"
                ? "Added to Wishlist"
                : "Added to Cart"}
            </strong>

            <span
              style={{
                fontSize: "12px",
                opacity: 0.8,
              }}
            >
              {toast.title}
            </span>
          </div>
        </div>
      )}

      {/* Back Button */}

      <Link
        to="/productlist"
        className="p3d-back"
      >
        ← Back to collection
      </Link>

      {/* Main 3D Card Stage */}

      <div className="p3d-stage">
        <div className="p3d-card">

          {/* Image Side */}

          <div className="p3d-image">
            <img
              src={selectedImage}
              alt={product.title}
            />

            {galleryImages.length > 1 && (
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  display: "flex",
                  gap: "8px",
                }}
              >
                {galleryImages.map(
                  (imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        setSelectedImage(imgUrl)
                      }
                      style={{
                        border:
                          selectedImage === imgUrl
                            ? "2px solid #00d4aa"
                            : "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "8px",
                        overflow: "hidden",
                        background: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      <img
                        src={imgUrl}
                        alt=""
                        style={{
                          width: "45px",
                          height: "45px",
                          objectFit: "cover",
                          padding: 0,
                        }}
                      />
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* Content Side */}

          <div className="p3d-content">

            <div
              style={{
                textTransform: "uppercase",
                fontSize: "12px",
                letterSpacing: "1.5px",
                color: "#00d4aa",
                fontWeight: 700,
                marginBottom: "8px",
              }}
            >
              {product.category || "Curated"}
            </div>

            <h1>{product.title}</h1>

            {/* Rating Row */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <StarRating
                rating={reviewsData.rating}
              />

              <span
                style={{
                  fontSize: "14px",
                  color: "var(--p3d-muted)",
                }}
              >
                <strong>
                  {reviewsData.rating}
                </strong>{" "}
                ({reviewsData.reviewCount} customer
                reviews)
              </span>
            </div>

            <p className="p3d-desc">
              {product.description}
            </p>

            {/* Specs Box */}

            <div className="p3d-specs-box">
              <h3>
                Specifications & Availability
              </h3>

              <div className="p3d-specs-grid">

                <div className="p3d-spec-row">
                  <span className="p3d-spec-label">
                    Availability
                  </span>

                  <span className="p3d-spec-value p3d-stock-badge in-stock">
                    ✓ In Stock (
                    {product.stock || 25} available)
                  </span>
                </div>

                <div className="p3d-spec-row">
                  <span className="p3d-spec-label">
                    Department
                  </span>

                  <span className="p3d-spec-value">
                    {(
                      product.category ||
                      "General"
                    ).toUpperCase()}
                  </span>
                </div>

                <div className="p3d-spec-row">
                  <span className="p3d-spec-label">
                    Delivery
                  </span>

                  <span className="p3d-spec-value">
                    Express 2-Day Delivery
                  </span>
                </div>

                <div className="p3d-spec-row">
                  <span className="p3d-spec-label">
                    Warranty
                  </span>

                  <span className="p3d-spec-value">
                    1 Year Official Guarantee
                  </span>
                </div>

              </div>
            </div>

            {/* Price Row */}

            <div className="p3d-price">
              <span>
                Price (Taxes Included)
              </span>

              <strong>
                ₹{product.price}
              </strong>
            </div>

            {/* Quantity Selector */}

            <div className="p3d-qty-wrapper">
              <span className="p3d-qty-label">
                Quantity
              </span>

              <div className="p3d-qty-controls">

                <button
                  type="button"
                  className="p3d-qty-btn"
                  onClick={handleDecreaseQty}
                >
                  −
                </button>

                <span className="p3d-qty-value">
                  {cartItem
                    ? cartItem.quantity
                    : quantity}
                </span>

                <button
                  type="button"
                  className="p3d-qty-btn"
                  onClick={handleIncreaseQty}
                >
                  +
                </button>

              </div>
            </div>

            {/* Action Buttons */}

            <div className="p3d-action-buttons">

              {cartItem ? (
                <button
                  type="button"
                  className="p3d-btn"
                  onClick={() =>
                    navigate("/cart")
                  }
                >
                  ✓ Go to Cart
                </button>
              ) : (
                <button
                  type="button"
                  className="p3d-btn"
                  onClick={handleAddToCart}
                >
                  🛒 Add to Cart
                </button>
              )}

              <button
                type="button"
                className="p3d-btn p3d-btn-pay"
                onClick={handleBuyNow}
              >
                ⚡ Buy Now
              </button>

              <button
                type="button"
                className={`p3d-wishlist-btn ${
                  isWishlisted
                    ? "wishlisted"
                    : ""
                }`}
                style={{
                  gridColumn: "span 2",
                }}
                onClick={handleToggleWishlist}
              >
                {isWishlisted
                  ? "♥ Saved to Wishlist"
                  : "♡ Save to Wishlist"}
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}

      <div
        style={{
          maxWidth: "1100px",
          margin: "60px auto 0",
          background: "var(--p3d-card)",
          borderRadius: "24px",
          border:
            "1px solid var(--p3d-border)",
          padding: "36px",
          backdropFilter: "blur(20px)",
        }}
      >

        <h2
          style={{
            fontSize: "24px",
            fontWeight: 800,
            marginBottom: "24px",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          Customer Reviews & Ratings
        </h2>

        {/* Rating Summary Banner */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "30px",
            background:
              "rgba(0, 212, 170, 0.05)",
            border:
              "1px solid rgba(0, 212, 170, 0.15)",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "36px",
            flexWrap: "wrap",
          }}
        >

          <div
            style={{
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "44px",
                fontWeight: 900,
                color: "#00d4aa",
                lineHeight: 1,
              }}
            >
              {reviewsData.rating}
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "var(--p3d-muted)",
                marginTop: "4px",
              }}
            >
              out of 5 stars
            </div>
          </div>

          <div>
            <StarRating
              rating={reviewsData.rating}
            />

            <div
              style={{
                fontSize: "14px",
                color: "var(--p3d-muted)",
                marginTop: "6px",
              }}
            >
              Based on{" "}
              {reviewsData.reviewCount} verified
              buyer reviews
            </div>
          </div>

        </div>

        {/* Write a Review Form */}

        <form
          onSubmit={handleAddReview}
          style={{
            background:
              "rgba(255, 255, 255, 0.02)",
            border:
              "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "36px",
          }}
        >

          <h3
            style={{
              fontSize: "16px",
              fontWeight: 700,
              marginBottom: "16px",
              color: "#00d4aa",
            }}
          >
            Write a Customer Review
          </h3>

          {reviewSubmittedMsg && (
            <div
              style={{
                color: "#00d4aa",
                fontSize: "14px",
                marginBottom: "16px",
                fontWeight: 600,
              }}
            >
              {reviewSubmittedMsg}
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr",
              gap: "16px",
              marginBottom: "16px",
            }}
          >

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "var(--p3d-muted)",
                  marginBottom: "6px",
                }}
              >
                YOUR NAME
              </label>

              <input
                type="text"
                value={reviewName}
                onChange={(e) =>
                  setReviewName(e.target.value)
                }
                placeholder="Enter your name"
                required
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  background:
                    "rgba(0,0,0,0.4)",
                  border:
                    "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "var(--p3d-muted)",
                  marginBottom: "6px",
                }}
              >
                RATING
              </label>

              <select
                value={reviewRating}
                onChange={(e) =>
                  setReviewRating(
                    Number(e.target.value)
                  )
                }
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  background: "#070d14",
                  border:
                    "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  fontFamily: "inherit",
                }}
              >
                <option value={5}>
                  ★★★★★ (5/5 Excellent)
                </option>

                <option value={4}>
                  ★★★★☆ (4/5 Very Good)
                </option>

                <option value={3}>
                  ★★★☆☆ (3/5 Average)
                </option>

                <option value={2}>
                  ★★☆☆☆ (2/5 Below Average)
                </option>

                <option value={1}>
                  ★☆☆☆☆ (1/5 Poor)
                </option>
              </select>
            </div>

          </div>

          <div
            style={{
              marginBottom: "16px",
            }}
          >
            <label
              style={{
                display: "block",
                fontSize: "12px",
                color: "var(--p3d-muted)",
                marginBottom: "6px",
              }}
            >
              YOUR REVIEW
            </label>

            <textarea
              rows={3}
              value={reviewText}
              onChange={(e) =>
                setReviewText(e.target.value)
              }
              placeholder="Share details of your experience with this product..."
              required
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "10px",
                background:
                  "rgba(0,0,0,0.4)",
                border:
                  "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
                fontFamily: "inherit",
                resize: "vertical",
              }}
            />
          </div>

          <button
            type="submit"
            className="p3d-btn"
            style={{
              width: "auto",
              padding: "12px 28px",
            }}
          >
            Submit Review
          </button>

        </form>

        {/* Existing Reviews List */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {reviewsData.reviews.map(
            (rev) => (
              <div
                key={rev.id}
                style={{
                  background:
                    "rgba(255, 255, 255, 0.02)",
                  border:
                    "1px solid rgba(255, 255, 255, 0.06)",
                  borderRadius: "14px",
                  padding: "18px 22px",
                }}
              >

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >

                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background:
                          "linear-gradient(135deg, #00d4aa, #007791)",
                        color: "#050a0f",
                        fontWeight: 800,
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                          "center",
                        fontSize: "13px",
                      }}
                    >
                      {rev.avatar || "U"}
                    </div>

                    <div>
                      <strong
                        style={{
                          display: "block",
                          fontSize: "14px",
                          color: "#fff",
                        }}
                      >
                        {rev.name}
                      </strong>

                      <span
                        style={{
                          fontSize: "12px",
                          color:
                            "var(--p3d-muted)",
                        }}
                      >
                        {rev.date}
                      </span>
                    </div>

                  </div>

                  <StarRating
                    rating={rev.rating}
                  />

                </div>

                <p
                  style={{
                    fontSize: "14px",
                    color:
                      "var(--p3d-muted)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  "{rev.text}"
                </p>

              </div>
            )
          )}
        </div>

      </div>

      {/* Recommendations */}

      {relatedProducts.length > 0 && (
        <div
          style={{
            maxWidth: "1100px",
            margin: "60px auto 0",
          }}
        >

          <h2
            style={{
              fontSize: "22px",
              fontWeight: 800,
              marginBottom: "24px",
              color: "#fff",
            }}
          >
            You May Also Like
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "20px",
            }}
          >

            {relatedProducts.map(
              (rel) => (
                <div
                  key={rel._id}
                  onClick={() => {
                    navigate(
                      `/productdetail/${rel._id}`
                    );

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  style={{
                    background:
                      "var(--p3d-card)",
                    border:
                      "1px solid var(--p3d-border)",
                    borderRadius: "20px",
                    padding: "16px",
                    cursor: "pointer",
                    transition:
                      "transform 0.25s ease, border-color 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-4px)";

                    e.currentTarget.style.borderColor =
                      "rgba(0, 212, 170, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "none";

                    e.currentTarget.style.borderColor =
                      "var(--p3d-border)";
                  }}
                >

                  <img
                    src={
                      rel.images?.[0] ||
                      `https://picsum.photos/seed/${rel._id}/400/300`
                    }
                    alt={rel.title}
                    style={{
                      width: "100%",
                      height: "160px",
                      objectFit: "contain",
                      borderRadius: "12px",
                      background:
                        "rgba(0,0,0,0.3)",
                      padding: "10px",
                      marginBottom: "12px",
                    }}
                  />

                  <div
                    style={{
                      fontSize: "11px",
                      color: "#00d4aa",
                      fontWeight: 700,
                      textTransform:
                        "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    {rel.category || "Item"}
                  </div>

                  <h4
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#fff",
                      margin: "0 0 8px",
                      lineHeight: 1.3,
                      height: "36px",
                      overflow: "hidden",
                    }}
                  >
                    {rel.title}
                  </h4>

                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems: "center",
                    }}
                  >
                    <strong
                      style={{
                        fontSize: "16px",
                        color: "#00d4aa",
                      }}
                    >
                      ₹{rel.price}
                    </strong>

                    <span
                      style={{
                        fontSize: "12px",
                        color:
                          "var(--p3d-muted)",
                        fontWeight: 600,
                      }}
                    >
                      View →
                    </span>
                  </div>

                </div>
              )
            )}

          </div>
        </div>
      )}

    </div>
  );
}
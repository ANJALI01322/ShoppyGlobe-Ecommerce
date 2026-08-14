import React, { useEffect, useMemo, useState } from "react";
import { BiCategoryAlt, BiFilterAlt } from "react-icons/bi";
import {
  FaCartPlus,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";
import { FiArrowRight, FiCheck } from "react-icons/fi";

import {
  useNavigate,
  useSearchParams,
  Link,
} from "react-router-dom";

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

import api from "../api";

import "./ProductList.css";

/* =========================================================
   CATEGORIES
========================================================= */

const ALLOWED_CATEGORIES = [
  "electronics",
  "clothes",
  "sports",
  "shoes",
  "new",
];

/* =========================================================
   STATIC PRODUCTS
========================================================= */

const staticDatasets = [
  ...electronicsProducts,
  ...clothesProducts,
  ...shoesProducts,
  ...sportsProducts,
];

/* =========================================================
   CATEGORY HELPER
========================================================= */

function getProductCategory(product) {
  /*
   * First priority:
   * Use the actual category from product data.
   */
  if (product?.category) {
    const category = String(product.category)
      .trim()
      .toLowerCase();

    /*
     * Direct category values
     */
    if (ALLOWED_CATEGORIES.includes(category)) {
      return category;
    }

    /*
     * Handle common alternate names.
     */
    if (
      category === "fashion" ||
      category === "clothing" ||
      category === "clothes" ||
      category === "apparel"
    ) {
      return "clothes";
    }

    if (
      category === "electronic" ||
      category === "electronics"
    ) {
      return "electronics";
    }

    if (
      category === "shoe" ||
      category === "shoes" ||
      category === "footwear"
    ) {
      return "shoes";
    }

    if (
      category === "sport" ||
      category === "sports" ||
      category === "fitness"
    ) {
      return "sports";
    }
  }

  /*
   * Fallback:
   * Detect category from title + description.
   */
  const text = `
    ${product?.title || ""}
    ${product?.description || ""}
  `.toLowerCase();

  /*
   * Shoes / footwear
   */
  if (
    text.includes("shoe") ||
    text.includes("sneaker") ||
    text.includes("boot") ||
    text.includes("footwear") ||
    text.includes("sandal") ||
    text.includes("slipper") ||
    text.includes("loafer")
  ) {
    return "shoes";
  }

  /*
   * Sports
   */
  if (
    text.includes("sport") ||
    text.includes("football") ||
    text.includes("basketball") ||
    text.includes("cricket") ||
    text.includes("tennis") ||
    text.includes("ball") ||
    text.includes("fitness") ||
    text.includes("gym") ||
    text.includes("yoga") ||
    text.includes("exercise")
  ) {
    return "sports";
  }

  /*
   * Clothes / fashion
   */
  if (
    text.includes("shirt") ||
    text.includes("cloth") ||
    text.includes("wear") ||
    text.includes("dress") ||
    text.includes("pant") ||
    text.includes("jean") ||
    text.includes("jacket") ||
    text.includes("hoodie") ||
    text.includes("t-shirt") ||
    text.includes("tshirt") ||
    text.includes("sweater") ||
    text.includes("fashion") ||
    text.includes("apparel")
  ) {
    return "clothes";
  }

  /*
   * Electronics
   *
   * Keep electronics as the final fallback because
   * most remaining products in the current dataset
   * are electronics.
   */
  return "electronics";
}

/* =========================================================
   COMPONENT
========================================================= */

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(
    (state) => state.cart?.items || []
  );

  const wishlistItems = useSelector(
    (state) => state.wishlist?.items || []
  );

  const [searchParams, setSearchParams] =
    useSearchParams();

  const [data, setData] =
    useState(staticDatasets);

  const [loading, setLoading] =
    useState(true);

  const [addingId, setAddingId] =
    useState(null);

  const [toast, setToast] = useState({
    show: false,
    title: "",
    img: "",
    type: "cart",
  });

  /*
   * Read category from URL.
   *
   * Example:
   * /productlist?category=shoes
   */
  const selectedCategory = (
    searchParams.get("category") || "all"
  )
    .trim()
    .toLowerCase();

  /*
   * Read search from URL.
   */
  const searchQuery =
    searchParams.get("search") || "";

  const sortBy = searchParams.get("sort") || "default";

  /* =======================================================
     CATEGORIES
  ======================================================= */

  const availableCategories = useMemo(
    () => ["all", ...ALLOWED_CATEGORIES],
    []
  );

  /* =======================================================
     FETCH PRODUCTS
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");

        if (
          mounted &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          setData(response.data);
        } else if (mounted) {
          setData([]);
        }
      } catch (error) {
        console.error(
          "Failed to fetch products from API:",
          error
        );

        if (mounted) {
          setData([]);
          setError("Unable to load products from server.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, []);

  /* =======================================================
     FILTER & SORT PRODUCTS
  ======================================================= */

  const filtered = useMemo(() => {
    const category = selectedCategory || "all";
    const query = searchQuery.trim().toLowerCase();

    let list = data.filter((product) => {
      const productCategory = getProductCategory(product);

      const matchesCategory =
        category === "all" ||
        category === "new" ||
        category === "newest" ||
        productCategory === category;

      const searchableText = `
        ${product?.title || ""}
        ${product?.description || ""}
        ${productCategory}
      `.toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      return matchesCategory && matchesSearch;
    });

    if (category === "new" || category === "newest") {
      list = list.slice(0, 16);
    }

    if (sortBy === "price-low") {
      list = [...list].sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price-high") {
      list = [...list].sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "rating") {
      list = [...list].sort((a, b) => Number(b.rating || 4.5) - Number(a.rating || 4.5));
    } else if (sortBy === "newest") {
      list = [...list].reverse();
    }

    return list;
  }, [
    data,
    selectedCategory,
    searchQuery,
    sortBy,
  ]);

  /* =======================================================
     CATEGORY & SORT HANDLERS
  ======================================================= */

  const handleCategoryClick = (category) => {
    const normalizedCategory = String(category).toLowerCase();
    const currentSort = searchParams.get("sort");

    const params = {};
    if (normalizedCategory !== "all") {
      params.category = normalizedCategory;
    }
    if (searchQuery) {
      params.search = searchQuery;
    }
    if (currentSort) {
      params.sort = currentSort;
    }

    setSearchParams(params);
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    const params = {};
    if (selectedCategory && selectedCategory !== "all") {
      params.category = selectedCategory;
    }
    if (searchQuery) {
      params.search = searchQuery;
    }
    if (newSort !== "default") {
      params.sort = newSort;
    }
    setSearchParams(params);
  };

  /* =======================================================
     DETAIL
  ======================================================= */

  const handleDetail = (id) => {
    navigate(`/productdetail/${id}`);
  };

  /* =======================================================
     TOAST
  ======================================================= */

  const showToast = (
    title,
    img,
    type
  ) => {
    setToast({
      show: true,
      title,
      img,
      type,
    });

    setTimeout(() => {
      setToast((previous) => ({
        ...previous,
        show: false,
      }));
    }, 3200);
  };

  /* =======================================================
     WISHLIST
  ======================================================= */

  const handleToggleWishlist = async (event, product) => {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }

    const targetProduct = product || currentProduct;
    if (!targetProduct || !targetProduct._id) return;

    const isWishlisted = wishlistItems.some(
      (item) =>
        String(item._id || item.productId || item) === String(targetProduct._id)
    );

    if (isWishlisted) {
      dispatch(removeFromWishlist(targetProduct._id));
      showToast(
        targetProduct.title,
        targetProduct.images?.[0] || "",
        "wishlist-remove"
      );
      try {
        await api.delete(`/wishlist/${targetProduct._id}`);
      } catch {}
    } else {
      dispatch(addToWishlist(targetProduct));
      showToast(
        targetProduct.title,
        targetProduct.images?.[0] || "",
        "wishlist"
      );
      try {
        await api.post("/wishlist", {
          productId: targetProduct._id,
        });
      } catch {}
    }
  };

  /* =======================================================
     ADD TO CART
  ======================================================= */

  const handleAddToCart = async (event, product) => {
    event.stopPropagation();

    if (addingId) return;

    try {
      setAddingId(product._id);

      dispatch(
        addToCart({
          ...product,
          quantity: 1,
        })
      );

      showToast(
        product.title,
        product.images?.[0] || "",
        "cart"
      );

      try {
        await api.post("/cart/add", {
          productId: product._id,
          title: product.title,
          price: product.price,
          images: product.images,
          quantity: 1,
        });
      } catch (err) {
        /*
         * Redux cart remains functional for guest users.
         */
      }
    } finally {
      setAddingId(null);
    }
  };

  /* =======================================================
     INCREASE
  ======================================================= */

  const handleIncreaseQty = async (
    event,
    product,
    currentQty
  ) => {
    event.stopPropagation();

    const newQty =
      Number(currentQty) + 1;

    dispatch(
      updateQuantity({
        productId: product._id,
        quantity: newQty,
      })
    );

    try {
      await api.patch(
        `/cart/${product._id}`,
        {
          quantity: newQty,
        }
      );
    } catch {
      /*
       * Redux remains functional.
       */
    }
  };

  /* =======================================================
     DECREASE
  ======================================================= */

  const handleDecreaseQty = async (
    event,
    product,
    currentQty
  ) => {
    event.stopPropagation();

    if (currentQty <= 1) {
      dispatch(
        removeFromCart(product._id)
      );

      try {
        await api.delete(
          `/cart/${product._id}`
        );
      } catch {
        /*
         * Redux remains functional.
         */
      }

      return;
    }

    const newQty =
      Number(currentQty) - 1;

    dispatch(
      updateQuantity({
        productId: product._id,
        quantity: newQty,
      })
    );

    try {
      await api.patch(
        `/cart/${product._id}`,
        {
          quantity: newQty,
        }
      );
    } catch {
      /*
       * Redux remains functional.
       */
    }
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="lux-loader-page">
        <div className="lux-loader-orbit" />

        <p>
          Curating your collection...
        </p>
      </div>
    );
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="lux-page">

      {/* =================================================
          TOAST
      ================================================= */}

      {toast.show && (
        <div className="toast-popup-banner">

          <div className="toast-left">

            <span className="toast-check">
              {toast.type ===
              "wishlist-remove" ? (
                "♡"
              ) : toast.type ===
                "wishlist" ? (
                "♥"
              ) : (
                <FiCheck />
              )}
            </span>

            {toast.img && (
              <img
                src={toast.img}
                alt=""
                className="toast-img"
              />
            )}

            <div className="toast-info">

              <strong>
                {toast.type ===
                "wishlist-remove"
                  ? "Removed from Wishlist"
                  : toast.type ===
                    "wishlist"
                  ? "Added to Wishlist"
                  : "Added to Cart"}
              </strong>

              <span className="toast-prod-title">
                {toast.title}
              </span>

            </div>

          </div>

          <button
            className="toast-view-cart-btn"
            onClick={() =>
              navigate(
                toast.type?.startsWith(
                  "wishlist"
                )
                  ? "/wishlist"
                  : "/cart"
              )
            }
          >
            {toast.type?.startsWith(
              "wishlist"
            )
              ? "View Wishlist"
              : "View Cart"}
          </button>

        </div>
      )}

      {/* =================================================
          HERO
      ================================================= */}

      <section className="discover-hero">

        <div className="hero-grid" />

        <div className="hero-glow hero-glow-one" />

        <div className="hero-glow hero-glow-two" />

        <div className="hero-content">

          <span className="discover-eyebrow">
            <span />
            SHOPYGLOBE / CURATED COLLECTION
            <span />
          </span>

          <h1>
            Discover{" "}
            <em>something better.</em>
          </h1>

          <p>
            Hand-picked products for modern
            everyday life. Explore fashion,
            tech, footwear and sports
            essentials curated in one
            beautiful collection.
          </p>

          <div className="hero-stats">

            <div className="hero-stat">
              <strong>01</strong>
              <span>
                Curated selection
              </span>
            </div>

            <div className="hero-stat">
              <strong>04</strong>
              <span>
                Essential categories
              </span>
            </div>

            <div className="hero-stat">
              <strong>∞</strong>
              <span>
                Better discoveries
              </span>
            </div>

          </div>

          <button
            className="browse-btn"
            onClick={() =>
              document
                .getElementById(
                  "collection"
                )
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            Browse collection
            <FiArrowRight />
          </button>

        </div>

        <div className="hero-scroll">
          <span />
          Scroll to explore
        </div>

      </section>

      {/* =================================================
          COLLECTION
      ================================================= */}

      <section
        id="collection"
        className="collection-section"
      >

        {/* TOP */}

        <div className="collection-top">

          <div className="section-title">

            <span className="section-kicker">
              EXPLORE COLLECTION
            </span>

            <h2>
              Shop by{" "}
              <em>category</em>
            </h2>

            <p className="section-description">
              Find something made for you.
            </p>

          </div>

          <div className="product-count">
            <strong>
              {filtered.length}
            </strong>

            {filtered.length === 1
              ? "product"
              : "products"}
          </div>

        </div>

        {/* CATEGORY BAR */}

        <div className="category-bar">

          <div className="category-label">
            <BiCategoryAlt />

            <span>
              Browse categories
            </span>
          </div>

          <div className="category-pills">

            {availableCategories.map(
              (category) => (
                <button
                  key={category}
                  type="button"
                  className={
                    selectedCategory.toLowerCase() ===
                    category.toLowerCase()
                      ? "category-pill active"
                      : "category-pill"
                  }
                  onClick={() =>
                    handleCategoryClick(
                      category
                    )
                  }
                >
                  {category === "all"
                    ? "All Products"
                    : category
                        .charAt(0)
                        .toUpperCase() +
                      category.slice(1)}

                  {selectedCategory ===
                    category && (
                    <span className="pill-check">
                      ✓
                    </span>
                  )}
                </button>
              )
            )}

          </div>

        </div>

        {/* PRODUCT HEADING */}

        <div className="products-heading">

          <div>

            <span className="products-kicker">
              {selectedCategory === "all"
                ? "THE COMPLETE EDIT"
                : `${selectedCategory.toUpperCase()} EDIT`}
            </span>

            <h2>
              {selectedCategory === "all"
                ? "Curated for you"
                : `Best of ${selectedCategory}`}
            </h2>

            {searchQuery && (
              <p className="search-result-text">
                Results for “{searchQuery}”
              </p>
            )}

          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div className="sort-dropdown-container">
              <select
                value={sortBy}
                onChange={handleSortChange}
                style={{
                  padding: "8px 14px",
                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                <option value="default" style={{ background: "#050a0f", color: "#fff" }}>Sort: Featured</option>
                <option value="newest" style={{ background: "#050a0f", color: "#fff" }}>Sort: Newest Arrivals</option>
                <option value="price-low" style={{ background: "#050a0f", color: "#fff" }}>Price: Low to High</option>
                <option value="price-high" style={{ background: "#050a0f", color: "#fff" }}>Price: High to Low</option>
                <option value="rating" style={{ background: "#050a0f", color: "#fff" }}>Sort: Highest Rated</option>
              </select>
            </div>

            <span className="product-count">
              <strong>
                {filtered.length}
              </strong>
              {filtered.length === 1
                ? " item"
                : " items"}
            </span>
          </div>
        </div>

        {/* PRODUCTS */}

        {filtered.length === 0 ? (

          <div className="lux-empty-wrap">

            <BiFilterAlt className="lux-empty-icon" />

            <h3>
              No products found
            </h3>

            <p>
              Try another search or
              explore another category.
            </p>

            <button
              onClick={() =>
                handleCategoryClick(
                  "all"
                )
              }
              className="empty-reset-btn"
            >
              View all products
            </button>

          </div>

        ) : (

          <div className="lux-grid">

            {filtered.map(
              (product, index) => {

                const isWishlisted =
                  wishlistItems.some(
                    (item) =>
                      String(
                        item.productId ||
                          item._id
                      ) ===
                      String(product._id)
                  );

                const cartItem =
                  cartItems.find(
                    (item) =>
                      String(
                        item.productId ||
                          item._id
                      ) ===
                      String(product._id)
                  );

                const image =
                  product.images?.length
                    ? product.images[0]
                    : `https://picsum.photos/seed/${product._id}/600/500`;

                return (
                  <article
                    key={product._id}
                    className="lux-card"
                    style={{
                      "--card-index":
                        index,
                    }}
                    onClick={() =>
                      handleDetail(
                        product._id
                      )
                    }
                  >

                    {/* IMAGE */}

                    <div className="lux-media">

                      <span className="lux-card-number">
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>

                      <button
                        type="button"
                        className={
                          isWishlisted
                            ? "lux-card-heart-btn active"
                            : "lux-card-heart-btn"
                        }
                        onClick={(event) =>
                          handleToggleWishlist(
                            event,
                            product
                          )
                        }
                        aria-label={
                          isWishlisted
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                      >
                        {isWishlisted
                          ? "♥"
                          : "♡"}
                      </button>

                      <span className="lux-badge">
                        {getProductCategory(
                          product
                        )}
                      </span>

                      <div className="product-image-wrap">

                        <img
                          src={image}
                          alt={
                            product.title
                          }
                          loading="lazy"
                          onError={(
                            event
                          ) => {
                            event.currentTarget.onerror =
                              null;

                            event.currentTarget.src =
                              `https://picsum.photos/seed/${product._id}/600/500`;
                          }}
                        />

                      </div>

                      <div className="image-view-label">
                        View product
                        <FiArrowRight />
                      </div>

                    </div>

                    {/* BODY */}

                    <div className="lux-body">

                      <span className="product-category">
                        {getProductCategory(
                          product
                        )}
                      </span>

                      <h3>
                        {product.title}
                      </h3>

                      <p>
                        {product.description
                          ?.length > 90
                          ? product.description.slice(
                              0,
                              90
                            ) + "…"
                          : product.description ||
                            "Premium quality product curated for you."}
                      </p>

                    </div>

                    {/* FOOTER */}

                    <div className="lux-product-footer">

                      <div className="lux-price-block">

                        <span className="price-label">
                          PRICE
                        </span>

                        <span className="lux-price">
                          ₹
                          {product.price}
                        </span>

                      </div>

                      {cartItem ? (

                        <div
                          className="lux-qty-control"
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                        >

                          <button
                            className="lux-qty-btn"
                            onClick={(
                              event
                            ) =>
                              handleDecreaseQty(
                                event,
                                product,
                                cartItem.quantity
                              )
                            }
                          >
                            −
                          </button>

                          <span className="lux-qty-val">
                            {
                              cartItem.quantity
                            }
                          </span>

                          <button
                            className="lux-qty-btn"
                            onClick={(
                              event
                            ) =>
                              handleIncreaseQty(
                                event,
                                product,
                                cartItem.quantity
                              )
                            }
                          >
                            +
                          </button>

                        </div>

                      ) : (

                        <button
                          className="lux-cart-btn"
                          onClick={(
                            event
                          ) =>
                            handleAddToCart(
                              event,
                              product
                            )
                          }
                          disabled={
                            addingId ===
                            product._id
                          }
                        >
                          <FaCartPlus />

                          {addingId ===
                          product._id
                            ? "Adding..."
                            : "Add to Cart"}
                        </button>

                      )}

                    </div>

                  </article>
                );
              }
            )}

          </div>
        )}

      </section>

      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="discover-footer">

        <div className="footer-top">

          <div className="footer-brand">

            <Link
              to="/"
              className="footer-logo"
            >
              Shoppy
              <span>Globe</span>
            </Link>

            <p>
              A better way to discover
              the things you love.
              Thoughtfully designed
              shopping, without the noise.
            </p>

            <div className="socials">

              <a
                href="#instagram"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="#facebook"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="#twitter"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>

            </div>

          </div>

          <div className="footer-column">

            <h4>Shop</h4>

            <Link to="/productlist">
              All products
            </Link>

            <Link to="/productlist?category=clothes">
              Fashion
            </Link>

            <Link to="/productlist?category=electronics">
              Electronics
            </Link>

            <Link to="/productlist?category=shoes">
              Footwear
            </Link>

            <Link to="/productlist?category=sports">
              Sports
            </Link>

          </div>

          <div className="footer-column">

            <h4>Discover</h4>

            <Link to="/productlist">
              Trending
            </Link>

            <Link to="/productlist?category=shoes">
              New arrivals
            </Link>

            <Link to="/productlist">
              Best sellers
            </Link>

          </div>

          <div className="footer-column">

            <h4>Account</h4>

            <Link to="/cart">
              Your cart
            </Link>

            <Link to="/wishlist">
              Wishlist
            </Link>

            <Link to="/orders">
              Orders
            </Link>

            <Link to="/profile">
              Profile
            </Link>

          </div>

        </div>

        <div className="footer-bottom">

          <span>
            © 2026 ShoppyGlobe.
            All rights reserved.
          </span>

          <div>
            <a href="#privacy">
              Privacy
            </a>

            <a href="#terms">
              Terms
            </a>

            <a href="#contact">
              Contact
            </a>
          </div>

          <span>
            Designed for better shopping.
          </span>

        </div>

      </footer>

    </main>
  );
}

export default ProductList;
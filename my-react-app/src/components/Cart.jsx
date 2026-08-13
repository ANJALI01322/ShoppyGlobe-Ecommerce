
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCart,
  updateQuantity,
  removeFromCart,
  addToCart,
} from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import "./Cart.css";

import { electronicsProducts } from "../data/electronicsData";
import { clothesProducts } from "../data/clothesData";
import { shoesProducts } from "../data/shoesData";
import { sportsProducts } from "../data/sportsData";
import { getProductReviews } from "../data/productReviews";

/* =========================================================
   STAR RATING
========================================================= */

function StarRating({ rating }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const filled = i <= Math.floor(rating);
    const half =
      !filled && i === Math.ceil(rating) && rating % 1 >= 0.4;

    stars.push(
      <span
        key={i}
        className={`cart-star ${
          filled ? "star-full" : half ? "star-half" : "star-empty"
        }`}
      >
        {filled ? "★" : half ? "⯨" : "☆"}
      </span>
    );
  }

  return <span className="cart-star-row">{stars}</span>;
}

/* =========================================================
   PRODUCT COLOR MAP
========================================================= */

const PRODUCT_COLOR_MAP = {
  "elec-001": "Natural Titanium",
  "elec-002": "Titanium Black",
  "elec-003": "Space Grey",
  "elec-004": "Midnight Black",
  "elec-005": "Cosmic Nebula Black",
  "elec-006": "Space Grey",
  "elec-007": "Silver",
  "elec-008": "Midnight",
  "elec-009": "Black",
  "elec-010": "Phantom Black",
  "elec-011": "Black",
  "elec-012": "Silver",
  "elec-013": "Space Grey",
  "elec-014": "Midnight Black",
  "elec-015": "Obsidian Black",
  "elec-016": "Black",
  "elec-017": "White",
  "elec-018": "Black",
  "elec-019": "Black",
  "elec-020": "Phantom Black",
  "elec-021": "Graphite",
  "elec-022": "Blue",
  "elec-023": "True Black",
  "elec-024": "Midnight Black",
  "elec-025": "Steel Black",
  "elec-026": "White",
  "elec-027": "Black",
  "elec-028": "Silver",
  "elec-029": "Titan Black",
  "elec-030": "Midnight Green",
  "elec-031": "Black",
  "elec-032": "Black",
  "elec-033": "Phantom Black",
  "elec-034": "Eclipse Black",
  "elec-035": "Midnight",
  "elec-036": "Graphite",
  "elec-037": "White",
  "elec-038": "Black",
  "elec-039": "White",
  "elec-040": "Black",
  "elec-041": "Silver",
  "elec-042": "Black",
  "elec-043": "Cosmic Red",
  "elec-044": "White",
  "elec-045": "Volcanic Orange",
  "elec-046": "Black",
  "elec-047": "White Smoke",
  "elec-048": "White",
  "elec-049": "Carbon Black",
  "elec-050": "Black",
  "elec-051": "Phantom Black",
  "elec-052": "Black",

  "shoe-001": "Red/Black",
  "shoe-002": "Core Black",
  "shoe-003": "White/Multi",
  "shoe-004": "White/Green",
  "shoe-005": "Wheat",
  "shoe-006": "Blue/White",
  "shoe-007": "Tan",
  "shoe-008": "Black/White",
  "shoe-009": "Black/Blue",
  "shoe-010": "Cherry Red",
  "shoe-011": "Black/White",
  "shoe-012": "Espresso Brown",
  "shoe-013": "Triple White",
  "shoe-014": "Black",
  "shoe-015": "Brown",
  "shoe-016": "White/Green",
  "shoe-017": "Blue",
  "shoe-018": "Black",
  "shoe-019": "Black/Gold",
  "shoe-020": "Brown",
  "shoe-021": "Lemon Yellow",
  "shoe-022": "Black/Gold",
  "shoe-023": "Cork/Brown",
  "shoe-024": "Grey",
  "shoe-025": "Black/Gold",
  "shoe-026": "Nude",
  "shoe-027": "White",
  "shoe-028": "White/Grey",
  "shoe-029": "Brown",
  "shoe-030": "Grey/White",
  "shoe-031": "Beeswax",
  "shoe-032": "White/Black",
  "shoe-033": "Brown",
  "shoe-034": "Black/White",
  "shoe-035": "Navy Blue",
  "shoe-036": "White/Blue",
  "shoe-037": "Black",
  "shoe-038": "White/Multi",
  "shoe-039": "Black/Silver",
  "shoe-040": "Dark Brown",
  "shoe-041": "Black/Red",
  "shoe-042": "Black/Yellow",
  "shoe-043": "Blush Pink",
  "shoe-044": "Black/Orange",
  "shoe-045": "White",
  "shoe-046": "Dark Brown",
  "shoe-047": "White/Blue",
  "shoe-048": "White",
  "shoe-049": "White/Multi",
  "shoe-050": "Black",
  "shoe-051": "Tan",
  "shoe-052": "All Black",

  "sport-001": "Willow Brown",
  "sport-002": "Black/Gold",
  "sport-003": "Caramel Brown",
  "sport-004": "Blue/Black",
  "sport-005": "Red/Black",
  "sport-006": "Red",
  "sport-007": "Black",
  "sport-008": "Blue/Black",
  "sport-009": "Black",
  "sport-010": "Black/Silver",
  "sport-011": "Red/Black",
  "sport-012": "Maple/Multi",
  "sport-013": "Clear/Blue",
  "sport-014": "Blue/Black",
  "sport-015": "Charcoal",
  "sport-016": "Black",
  "sport-017": "Black/Multi",
  "sport-018": "Olive Green",
  "sport-019": "Blue",
  "sport-020": "Blue/Yellow",
  "sport-021": "Caramel Brown",
  "sport-022": "Black/Blue",
  "sport-023": "Yellow/Grey",
  "sport-024": "Black/Blue",
  "sport-025": "Red",
  "sport-026": "Orange/Black",
  "sport-027": "White/Black",
  "sport-028": "White/Red",
  "sport-029": "Black",
  "sport-030": "Black",
  "sport-031": "White/Blue",
  "sport-032": "Black",
  "sport-033": "White/Blue",
  "sport-034": "Black",
  "sport-035": "Multi",
  "sport-036": "Black/Silver",
  "sport-037": "White/Yellow",
  "sport-038": "Blue",
  "sport-039": "Black/Red",
  "sport-040": "Blue/White",
  "sport-041": "White",
  "sport-042": "Orange/Black",
  "sport-043": "Blue/White",
  "sport-044": "White",
  "sport-045": "Black",
  "sport-046": "Black",
  "sport-047": "Black",
  "sport-048": "Black/Yellow",
  "sport-049": "Black/Blue",
  "sport-050": "Black/Red",
  "sport-051": "Black/Red",
  "sport-052": "Yellow/Green",

  "cloth-001": "Vintage Blue",
  "cloth-002": "Floral Multi",
  "cloth-003": "Charcoal",
  "cloth-004": "White",
  "cloth-005": "Onyx Black",
  "cloth-006": "Indigo Blue",
  "cloth-007": "Gold/Multi",
  "cloth-008": "Black",
  "cloth-009": "Beige",
  "cloth-010": "Olive Green",
  "cloth-011": "Washed Grey",
  "cloth-012": "Camel",
  "cloth-013": "White",
  "cloth-014": "Light Blue",
  "cloth-015": "Navy Blue",
  "cloth-016": "Gold/Ivory",
  "cloth-017": "Ivory White",
  "cloth-018": "Heather Grey",
  "cloth-019": "Emerald",
  "cloth-020": "Burgundy",
  "cloth-021": "Black",
  "cloth-022": "Multi",
  "cloth-023": "Khaki",
  "cloth-024": "Brown",
  "cloth-025": "Black",
  "cloth-026": "Navy Blue",
  "cloth-027": "Blush Pink",
  "cloth-028": "Charcoal",
  "cloth-029": "Multi",
  "cloth-030": "Cream",
  "cloth-031": "Khaki",
  "cloth-032": "Black",
  "cloth-033": "Black",
  "cloth-034": "Multi",
  "cloth-035": "Navy/White",
  "cloth-036": "Black",
  "cloth-037": "Red/Green",
  "cloth-038": "Black",
  "cloth-039": "Pastel Multi",
  "cloth-040": "Beige",
  "cloth-041": "Light Blue",
  "cloth-042": "Navy Blue",
  "cloth-043": "White",
  "cloth-044": "Black",
  "cloth-045": "Light Blue",
  "cloth-046": "Charcoal",
  "cloth-047": "White",
  "cloth-048": "Olive Green",
  "cloth-049": "Natural White",
  "cloth-050": "Black",
  "cloth-051": "Tan",
  "cloth-052": "Black",
};

/* =========================================================
   COLOR HELPERS
========================================================= */

function getProductColor(title, productId, directColor) {
  if (directColor) return directColor;

  const colorKeywords = [
    "Natural Titanium",
    "Blue Titanium",
    "Black Titanium",
    "White Titanium",
    "Midnight Black",
    "Onyx Black",
    "Core Black",
    "Triple Black",
    "All Black",
    "Jet Black",
    "Phantom White",
    "Triple White",
    "Cloud White",
    "Ivory White",
    "Midnight Blue",
    "Navy Blue",
    "Vintage Blue",
    "Royal Blue",
    "Pacific Blue",
    "Olive Green",
    "Forest Green",
    "Sage Green",
    "Midnight Green",
    "Rose Gold",
    "Starlight Gold",
    "Cosmic Gold",
    "Espresso Brown",
    "Heather Grey",
    "Dark Brown",
    "Black/White",
    "White/Black",
    "Black/Blue",
    "Black/Red",
    "White/Blue",
    "Burgundy",
    "Camel",
    "Beeswax",
    "Charcoal",
    "Graphite",
    "Emerald",
    "Blush Pink",
    "Beige",
    "Nude",
    "Silver",
    "Gold",
    "Red",
    "Blue",
    "Green",
    "Black",
    "White",
    "Grey",
    "Gray",
    "Brown",
    "Pink",
    "Tan",
  ];

  if (title) {
    const titleLower = title.toLowerCase();

    const sorted = [...colorKeywords].sort(
      (a, b) => b.length - a.length
    );

    for (const color of sorted) {
      if (titleLower.includes(color.toLowerCase())) {
        return color;
      }
    }
  }

  if (productId && PRODUCT_COLOR_MAP[productId]) {
    return PRODUCT_COLOR_MAP[productId];
  }

  return "Standard";
}

function getColorHex(colorName) {
  if (!colorName) return "#888";

  const c = colorName.toLowerCase();

  if (
    c.includes("black") ||
    c.includes("obsidian") ||
    c.includes("carbon") ||
    c.includes("jet") ||
    c.includes("onyx")
  )
    return "#18181b";

  if (
    c.includes("white") ||
    c.includes("ivory") ||
    c.includes("smoke")
  )
    return "#e5e7eb";

  if (
    c.includes("blue") ||
    c.includes("navy") ||
    c.includes("cobalt")
  )
    return "#2563eb";

  if (
    c.includes("red") ||
    c.includes("burgundy") ||
    c.includes("cherry")
  )
    return "#dc2626";

  if (
    c.includes("green") ||
    c.includes("olive") ||
    c.includes("sage") ||
    c.includes("emerald")
  )
    return "#16a34a";

  if (
    c.includes("gold") ||
    c.includes("camel") ||
    c.includes("yellow")
  )
    return "#d97706";

  if (
    c.includes("pink") ||
    c.includes("blush")
  )
    return "#ec4899";

  if (
    c.includes("silver") ||
    c.includes("grey") ||
    c.includes("gray") ||
    c.includes("charcoal") ||
    c.includes("graphite")
  )
    return "#6b7280";

  if (
    c.includes("brown") ||
    c.includes("espresso") ||
    c.includes("tan") ||
    c.includes("nude") ||
    c.includes("beige") ||
    c.includes("wheat")
  )
    return "#92400e";

  if (
    c.includes("orange") ||
    c.includes("volcanic")
  )
    return "#ea580c";

  if (c.includes("multi"))
    return "linear-gradient(135deg,#f59e0b,#10b981,#3b82f6)";

  return "#4b5563";
}

/* =========================================================
   CATEGORY DETECTION
========================================================= */

const PHONE_IDS = new Set([
  "elec-001",
  "elec-002",
  "elec-015",
  "elec-029",
  "elec-030",
  "elec-045",
]);

const LAPTOP_IDS = new Set([
  "elec-003",
  "elec-007",
  "elec-012",
  "elec-028",
  "elec-034",
  "elec-036",
]);

const HEADPH_IDS = new Set([
  "elec-004",
  "elec-009",
  "elec-023",
  "elec-037",
  "elec-047",
]);

const TABLET_IDS = new Set([
  "elec-006",
  "elec-013",
  "elec-022",
  "elec-041",
]);

const GAMING_IDS = new Set([
  "elec-005",
  "elec-026",
  "elec-043",
  "elec-044",
  "elec-049",
]);

const WATCH_IDS = new Set(["elec-008", "elec-035"]);

const CAMERA_IDS = new Set([
  "elec-011",
  "elec-018",
  "elec-019",
  "elec-031",
]);

const TV_IDS = new Set([
  "elec-010",
  "elec-020",
  "elec-025",
  "elec-033",
  "elec-051",
]);

const SPEAKER_IDS = new Set([
  "elec-014",
  "elec-024",
  "elec-032",
  "elec-042",
  "elec-048",
]);

function detectCartCategory(item) {
  const title = (item.title || "").toLowerCase();
  const id = String(item.productId || "");

  const headphoneWord =
    title.includes("headphone") ||
    title.includes("earphone") ||
    title.includes("earbuds") ||
    title.includes("airpod");

  if (
    !headphoneWord &&
    (
      title.includes("iphone") ||
      title.includes("galaxy s") ||
      title.includes("pixel") ||
      title.includes("oneplus") ||
      title.includes("smartphone") ||
      PHONE_IDS.has(id)
    )
  )
    return "phone";

  if (
    title.includes("laptop") ||
    title.includes("macbook") ||
    title.includes("notebook") ||
    title.includes("xps") ||
    title.includes("legion") ||
    LAPTOP_IDS.has(id)
  )
    return "laptop";

  if (
    headphoneWord ||
    title.includes("momentum") ||
    title.includes("quietcomfort") ||
    title.includes("wh-") ||
    HEADPH_IDS.has(id)
  )
    return "headphone";

  if (
    title.includes("ipad") ||
    title.includes("tablet") ||
    title.includes("tab s") ||
    title.includes("kindle") ||
    TABLET_IDS.has(id)
  )
    return "tablet";

  if (
    title.includes("playstation") ||
    title.includes("xbox") ||
    title.includes("nintendo") ||
    title.includes("meta quest") ||
    GAMING_IDS.has(id)
  )
    return "gaming";

  if (
    title.includes("watch") ||
    title.includes("smartwatch") ||
    WATCH_IDS.has(id)
  )
    return "watch";

  if (
    title.includes("camera") ||
    title.includes("canon") ||
    title.includes("sony alpha") ||
    title.includes("gopro") ||
    title.includes("dji") ||
    CAMERA_IDS.has(id)
  )
    return "camera";

  if (
    title.includes("tv") ||
    title.includes("monitor") ||
    title.includes("display") ||
    title.includes("bravia") ||
    TV_IDS.has(id)
  )
    return "tv";

  if (
    title.includes("speaker") ||
    title.includes("soundbar") ||
    title.includes("marshall") ||
    title.includes("jbl") ||
    SPEAKER_IDS.has(id)
  )
    return "speaker";

  if (
    title.includes("shoe") ||
    title.includes("sneaker") ||
    title.includes("boot") ||
    title.includes("footwear") ||
    id.startsWith("shoe")
  )
    return "shoe";

  if (
    title.includes("shirt") ||
    title.includes("tshirt") ||
    title.includes("t-shirt") ||
    title.includes("jeans") ||
    title.includes("dress") ||
    title.includes("jacket") ||
    title.includes("hoodie") ||
    title.includes("pant") ||
    id.startsWith("clot")
  )
    return "cloth";

  if (
    title.includes("sport") ||
    title.includes("fitness") ||
    title.includes("gym") ||
    title.includes("dumbbell") ||
    title.includes("yoga") ||
    title.includes("ball") ||
    id.startsWith("spor")
  )
    return "sport";

  return null;
}

/* =========================================================
   CART COMPONENT
========================================================= */

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  /* =======================================================
     FETCH CART
  ======================================================= */

  useEffect(() => {
    api
      .get("/cart")
      .then((res) => {
        if (res.data?.cart?.items?.length) {
          dispatch(setCart(res.data.cart.items));
        }
      })
      .catch(() => {});
  }, [dispatch]);

  /* =======================================================
     QUANTITY
  ======================================================= */

  const increase = async (item) => {
    const newQty = item.quantity + 1;

    dispatch(
      updateQuantity({
        productId: item.productId,
        quantity: newQty,
      })
    );

    try {
      await api.patch(`/cart/${item.productId}`, {
        quantity: newQty,
      });
    } catch {}
  };

  const decrease = async (item) => {
    const newQty = item.quantity - 1;

    if (newQty <= 0) {
      dispatch(removeFromCart(item.productId));

      try {
        await api.delete(`/cart/${item.productId}`);
      } catch {}

      return;
    }

    dispatch(
      updateQuantity({
        productId: item.productId,
        quantity: newQty,
      })
    );

    try {
      await api.patch(`/cart/${item.productId}`, {
        quantity: newQty,
      });
    } catch {}
  };

  const remove = async (item) => {
    dispatch(removeFromCart(item.productId));

    try {
      await api.delete(`/cart/${item.productId}`);
    } catch {}
  };

  /* =======================================================
     ADD SIMILAR PRODUCT
  ======================================================= */

  const quickAdd = async (e, product) => {
    e.stopPropagation();

    dispatch(
      addToCart({
        ...product,
        quantity: 1,
      })
    );

    try {
      await api.post("/cart/add", {
        productId: product._id,
        quantity: 1,
      });
    } catch {}
  };

  /* =======================================================
     PRICE CALCULATIONS
  ======================================================= */

  const totalItems = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity || 1),
    0
  );

  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  const mrp = total * 1.1;
  const productDiscount = mrp - total;

  const deliveryThreshold = 999;
  const remainingForFreeDelivery = Math.max(
    deliveryThreshold - total,
    0
  );

  const deliveryProgress = Math.min(
    (total / deliveryThreshold) * 100,
    100
  );

  const deliveryCharge =
    total >= deliveryThreshold ? 0 : 49;

  const couponDiscount = couponApplied
    ? Math.min(total * 0.05, 250)
    : 0;

  const finalTotal =
    total + deliveryCharge - couponDiscount;

  /* =======================================================
     SIMILAR PRODUCTS
  ======================================================= */

  const cartProductIds = new Set(
    cartItems.map((item) => String(item.productId))
  );

  const presentCategories = new Set();

  cartItems.forEach((item) => {
    const category = detectCartCategory(item);

    if (category) {
      presentCategories.add(category);
    }
  });

  const CATEGORY_POOL = {
    phone: electronicsProducts,
    laptop: electronicsProducts,
    headphone: electronicsProducts,
    tablet: electronicsProducts,
    gaming: electronicsProducts,
    watch: electronicsProducts,
    camera: electronicsProducts,
    tv: electronicsProducts,
    speaker: electronicsProducts,
    shoe: shoesProducts,
    cloth: clothesProducts,
    sport: sportsProducts,
  };

  const ELEC_SUB_IDS = {
    phone: PHONE_IDS,
    laptop: LAPTOP_IDS,
    headphone: HEADPH_IDS,
    tablet: TABLET_IDS,
    gaming: GAMING_IDS,
    watch: WATCH_IDS,
    camera: CAMERA_IDS,
    tv: TV_IDS,
    speaker: SPEAKER_IDS,
  };

  const exploreProducts = useMemo(() => {
    let products = [];

    if (presentCategories.size) {
      presentCategories.forEach((category) => {
        const pool =
          CATEGORY_POOL[category] ||
          electronicsProducts;

        products.push(
          ...pool.filter((product) => {
            if (ELEC_SUB_IDS[category]) {
              return ELEC_SUB_IDS[category].has(
                String(product._id)
              );
            }

            return true;
          })
        );
      });
    } else {
      products = [...electronicsProducts];
    }

    const unique = new Map();

    products.forEach((product) => {
      if (
        !cartProductIds.has(String(product._id))
      ) {
        unique.set(
          String(product._id),
          product
        );
      }
    });

    return Array.from(unique.values()).slice(0, 8);
  }, [cartItems]);

  /* =======================================================
     EMPTY CART
  ======================================================= */

  if (cartItems.length === 0) {
    return (
      <section className="cart-page">
        <Link
          to="/productlist"
          className="cart-back"
        >
          ← Continue Shopping
        </Link>

        <div className="empty-cart">
          <div className="empty-cart-icon">
            🛍️
          </div>

          <span className="empty-cart-label">
            YOUR CART IS WAITING
          </span>

          <h1>Your cart feels a little empty.</h1>

          <p>
            Discover something you love and
            make it yours.
          </p>

          <Link
            to="/productlist"
            className="empty-cart-button"
          >
            Explore Products
            <span>→</span>
          </Link>

          <div className="empty-cart-benefits">
            <div>
              <span>🚚</span>
              <p>Fast Delivery</p>
            </div>

            <div>
              <span>↩</span>
              <p>Easy Returns</p>
            </div>

            <div>
              <span>🔒</span>
              <p>Secure Payment</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">

      {/* =====================================================
          TOP NAV
      ===================================================== */}

      <div className="cart-topbar">
        <Link
          to="/productlist"
          className="cart-back"
        >
          ← Continue Shopping
        </Link>

        <div className="secure-label">
          <span>🔒</span>
          Secure Checkout
        </div>
      </div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="cart-heading">
        <div>
          <span className="eyebrow">
            YOUR SHOPPING BAG
          </span>

          <h1>
            Your Cart
            <span>{totalItems}</span>
          </h1>

          <p>
            Review your items before you
            complete your order.
          </p>
        </div>

        <div className="checkout-progress">

          <div className="progress-step active">
            <span>1</span>
            <small>Cart</small>
          </div>

          <div className="progress-line active" />

          <div className="progress-step">
            <span>2</span>
            <small>Address</small>
          </div>

          <div className="progress-line" />

          <div className="progress-step">
            <span>3</span>
            <small>Payment</small>
          </div>

        </div>
      </div>

      {/* =====================================================
          FREE DELIVERY BANNER
      ===================================================== */}

      <div className="delivery-banner">

        <div className="delivery-icon">
          🚚
        </div>

        <div className="delivery-content">

          {remainingForFreeDelivery > 0 ? (
            <>
              <strong>
                Add ₹{remainingForFreeDelivery.toFixed(0)} more
                for FREE delivery
              </strong>

              <span>
                You're almost there. Keep shopping!
              </span>
            </>
          ) : (
            <>
              <strong>
                🎉 You've unlocked FREE delivery
              </strong>

              <span>
                Great choice. Delivery is on us.
              </span>
            </>
          )}

          <div className="delivery-progress">
            <span
              style={{
                width: `${deliveryProgress}%`,
              }}
            />
          </div>

        </div>

        <div className="delivery-amount">
          {remainingForFreeDelivery > 0
            ? `${Math.round(deliveryProgress)}%`
            : "FREE"}
        </div>

      </div>

      {/* =====================================================
          MAIN CART GRID
      ===================================================== */}

      <div className="cart-grid">

        {/* ===================================================
            LEFT SIDE
        =================================================== */}

        <div className="cart-main">

          <div className="cart-list-header">
            <div>
              <h2>
                Cart Items
              </h2>

              <span>
                {totalItems}{" "}
                {totalItems === 1
                  ? "item"
                  : "items"}{" "}
                selected
              </span>
            </div>

            <span className="saved-label">
              ✦ Quality picks for you
            </span>
          </div>

          <div className="cart-list">

            {cartItems.map((item) => {

              const quantity =
                Number(item.quantity || 1);

              const price =
                Number(item.price || 0);

              const itemTotal =
                price * quantity;

              const originalPrice =
                price * 1.1;

              const saving =
                (originalPrice - price) *
                quantity;

              const { rating, reviewCount } =
                getProductReviews(
                  item.productId
                );

              const color =
                getProductColor(
                  item.title,
                  item.productId,
                  item.color
                );

              return (
                <article
                  className="cart-card"
                  key={item.productId}
                >

                  {/* IMAGE */}

                  <div className="cart-image-box">
                    <span className="image-badge">
                      IN CART
                    </span>

                    <Link
                      to={`/productdetail/${item.productId}`}
                      className="cart-product-image-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        src={
                          item.images?.[0] ||
                          `https://picsum.photos/seed/${item.productId}/400/400`
                        }
                        alt={item.title}
                        onError={(e) => {
                          e.currentTarget.onerror =
                            null;

                          e.currentTarget.src =
                            `https://picsum.photos/seed/${item.productId}/400/400`;
                        }}
                      />
                    </Link>
                  </div>

                  {/* INFORMATION */}

                  <div className="cart-info">

                    <div className="cart-product-top">

                      <div>
                        <span className="product-category">
                          Premium Selection
                        </span>

                        <h3>
                          <Link to={`/productdetail/${item.productId}`}>
                            {item.title}
                          </Link>
                        </h3>
                      </div>

                      <div className="item-menu">
                        ⋯
                      </div>

                    </div>

                    {/* RATING */}

                    <div className="cart-item-rating">

                      <span className="rating-pill">
                        {rating}
                        <span>★</span>
                      </span>

                      <span className="rating-count">
                        {reviewCount
                          ? reviewCount.toLocaleString()
                          : "1,200"}{" "}
                        ratings
                      </span>

                    </div>

                    {/* COLOR */}

                    <div className="cart-item-color">

                      <span
                        className="cart-color-swatch"
                        style={{
                          background:
                            getColorHex(color),
                        }}
                      />

                      <span>
                        Color:
                        <strong>
                          {color}
                        </strong>
                      </span>

                    </div>

                    {/* PRICE */}

                    <div className="cart-price-details">

                      <div className="price-line">

                        <strong>
                          ₹{price.toFixed(0)}
                        </strong>

                        <span className="old-price">
                          ₹{originalPrice.toFixed(0)}
                        </span>

                        <span className="discount-percent">
                          10% OFF
                        </span>

                      </div>

                      <span className="unit-price">
                        ₹{price.toFixed(0)} per item
                      </span>

                    </div>

                    {/* SAVING */}

                    <div className="saving-text">
                      ✦ You save ₹
                      {saving.toFixed(0)} on this item
                    </div>

                    {/* ACTIONS */}

                    <div className="cart-card-bottom">

                      <div
                        className="qty-control"
                        onClick={(e) =>
                          e.stopPropagation()
                        }
                      >

                        <button
                          onClick={() =>
                            decrease(item)
                          }
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <span>
                          {quantity}
                        </span>

                        <button
                          onClick={() =>
                            increase(item)
                          }
                          aria-label="Increase quantity"
                        >
                          +
                        </button>

                      </div>

                      <div className="action-divider" />

                      <button
                        className="item-action wishlist-action"
                        onClick={() => {}}
                      >
                        ♡ Wishlist
                      </button>

                      <button
                        className="item-action remove-action"
                        onClick={() =>
                          remove(item)
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                  {/* ITEM TOTAL */}

                  <div className="item-total">

                    <span>
                      Item Total
                    </span>

                    <strong>
                      ₹{itemTotal.toFixed(0)}
                    </strong>

                    <button
                      className="buy-now-small"
                      onClick={() =>
                        navigate("/checkout", {
                          state: {
                            singleItem: item,
                          },
                        })
                      }
                    >
                      Buy this now →
                    </button>

                  </div>

                </article>
              );
            })}

          </div>

          {/* =================================================
              SHOP MORE
          ================================================= */}

          <Link
            to="/productlist"
            className="shop-more-card"
          >
            <div className="shop-more-icon">
              +
            </div>

            <div>
              <strong>
                Add more to your order
              </strong>

              <span>
                Explore products picked for you
              </span>
            </div>

            <span className="shop-more-arrow">
              →
            </span>
          </Link>

        </div>

        {/* ===================================================
            RIGHT SUMMARY
        =================================================== */}

        <aside className="summary">

          <div className="summary-heading">

            <div>
              <span className="summary-eyebrow">
                ORDER SUMMARY
              </span>

              <h2>
                Price Details
              </h2>
            </div>

            <span className="summary-count">
              {totalItems} items
            </span>

          </div>

          {/* COUPON */}

          <div className="coupon-box">

            <div className="coupon-icon">
              %
            </div>

            <div className="coupon-content">

              <strong>
                Have a coupon?
              </strong>

              <span>
                Save more on this order
              </span>

            </div>

            <button
              onClick={() => {
                if (coupon.trim()) {
                  setCouponApplied(true);
                }
              }}
            >
              {couponApplied
                ? "APPLIED"
                : "APPLY"}
            </button>

          </div>

          {!couponApplied && (
            <div className="coupon-input-wrap">
              <input
                value={coupon}
                onChange={(e) =>
                  setCoupon(e.target.value)
                }
                placeholder="Enter coupon code"
              />

              <button
                onClick={() => {
                  if (coupon.trim()) {
                    setCouponApplied(true);
                  }
                }}
              >
                Apply
              </button>
            </div>
          )}

          {couponApplied && (
            <div className="coupon-success">
              ✓ Coupon applied — You saved ₹
              {couponDiscount.toFixed(0)}
            </div>
          )}

          {/* PRICE BREAKDOWN */}

          <div className="summary-details">

            <div className="summary-row">
              <span>
                MRP ({totalItems} items)
              </span>

              <strong>
                ₹{mrp.toFixed(0)}
              </strong>
            </div>

            <div className="summary-row positive">
              <span>
                Product Discount
              </span>

              <strong>
                − ₹{productDiscount.toFixed(0)}
              </strong>
            </div>

            {couponApplied && (
              <div className="summary-row positive">
                <span>
                  Coupon Discount
                </span>

                <strong>
                  − ₹{couponDiscount.toFixed(0)}
                </strong>
              </div>
            )}

            <div className="summary-row">

              <span>
                Delivery
              </span>

              <strong
                className={
                  deliveryCharge === 0
                    ? "free"
                    : ""
                }
              >
                {deliveryCharge === 0
                  ? "FREE"
                  : `₹${deliveryCharge}`}
              </strong>

            </div>

          </div>

          <div className="summary-divider" />

          {/* TOTAL */}

          <div className="grand-total">

            <div>
              <span>
                Total Amount
              </span>

              <small>
                Inclusive of all taxes
              </small>
            </div>

            <strong>
              ₹{finalTotal.toFixed(0)}
            </strong>

          </div>

          <div className="total-saving">
            ✦ You're saving ₹
            {(
              productDiscount +
              couponDiscount
            ).toFixed(0)}{" "}
            on this order
          </div>

          {/* CHECKOUT */}

          <button
            className="checkout"
            onClick={() =>
              navigate("/checkout")
            }
          >
            <span>
              Proceed to Checkout
            </span>

            <strong>
              →
            </strong>
          </button>

          {/* TRUST */}

          <div className="checkout-trust">

            <div>
              <span>🔒</span>

              <div>
                <strong>
                  Secure Payment
                </strong>

                <small>
                  100% protected checkout
                </small>
              </div>
            </div>

            <div>
              <span>↩</span>

              <div>
                <strong>
                  Easy Returns
                </strong>

                <small>
                  Hassle-free return policy
                </small>
              </div>
            </div>

            <div>
              <span>✓</span>

              <div>
                <strong>
                  Genuine Products
                </strong>

                <small>
                  Quality checked products
                </small>
              </div>
            </div>

          </div>

        </aside>
      </div>

      {/* =====================================================
          SIMILAR PRODUCTS
      ===================================================== */}

      {exploreProducts.length > 0 && (
        <section className="explore-section">

          <div className="explore-header">

            <div>
              <span className="eyebrow">
                CURATED FOR YOU
              </span>

              <h2>
                SIMILAR PRODUCTS
              </h2>

              <p>
                Products you might love based
                on what's in your cart.
              </p>
            </div>

            <Link to="/productlist">
              View all →
            </Link>

          </div>

          <div className="explore-grid">

            {exploreProducts.map((product) => {

              const {
                rating,
                reviewCount,
              } = getProductReviews(
                product._id
              );

              return (
                <article
                  className="explore-card"
                  key={product._id}
                  onClick={() =>
                    navigate(
                      `/productdetail/${product._id}`
                    )
                  }
                >

                  <div className="explore-media">

                    <span className="explore-tag">
                      PICK FOR YOU
                    </span>

                    <Link
                      to={`/productdetail/${product._id}`}
                      className="recommendation-image-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        src={
                          product.images?.[0] ||
                          `https://picsum.photos/seed/${product._id}/400/400`
                        }
                        alt={product.title}
                        onError={(e) => {
                          e.currentTarget.onerror =
                            null;

                          e.currentTarget.src =
                            `https://picsum.photos/seed/${product._id}/400/400`;
                        }}
                      />
                    </Link>
                  </div>

                  <div className="explore-body">

                    <span className="explore-category">
                      Curated Product
                    </span>

                    <h3>
                      <Link to={`/productdetail/${product._id}`}>
                        {product.title}
                      </Link>
                    </h3>

                    <div className="explore-rating">

                      <span>
                        {rating} ★
                      </span>

                      <small>
                        ({reviewCount || "1.2k"})
                      </small>

                    </div>

                    <div className="explore-price-row">

                      <strong>
                        ₹{product.price}
                      </strong>

                      <span>
                        ₹
                        {Math.round(
                          product.price * 1.1
                        )}
                      </span>

                      <em>
                        10% OFF
                      </em>

                    </div>

                  </div>

                  <button
                    className="explore-add-btn"
                    onClick={(e) =>
                      quickAdd(e, product)
                    }
                  >
                    <span>+</span>
                    Add to Cart
                  </button>

                </article>
              );
            })}

          </div>
        </section>
      )}

      {/* =====================================================
          BOTTOM TRUST STRIP
      ===================================================== */}

      <div className="cart-trust-strip">

        <div>
          <span>🚚</span>

          <div>
            <strong>
              Fast & Reliable Delivery
            </strong>

            <small>
              Delivered safely to your doorstep
            </small>
          </div>
        </div>

        <div>
          <span>🛡️</span>

          <div>
            <strong>
              Buyer Protection
            </strong>

            <small>
              Shop confidently with us
            </small>
          </div>
        </div>

        <div>
          <span>💳</span>

          <div>
            <strong>
              Multiple Payment Options
            </strong>

            <small>
              UPI, Cards & more
            </small>
          </div>
        </div>

        <div>
          <span>↩</span>

          <div>
            <strong>
              Easy Returns
            </strong>

            <small>
              Simple & transparent process
            </small>
          </div>
        </div>

      </div>

    </section>
  );
}

export default Cart;















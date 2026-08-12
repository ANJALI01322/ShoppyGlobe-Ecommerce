import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart, updateQuantity, removeFromCart, addToCart } from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import "./Cart.css";

import { electronicsProducts } from "../data/electronicsData";
import { clothesProducts } from "../data/clothesData";
import { shoesProducts } from "../data/shoesData";
import { sportsProducts } from "../data/sportsData";
import { getProductReviews } from "../data/productReviews";

// Star rating component for cart items
function StarRating({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const filled = i <= Math.floor(rating);
    const half   = !filled && i === Math.ceil(rating) && rating % 1 >= 0.4;
    stars.push(
      <span key={i} className={`cart-star ${filled ? "star-full" : half ? "star-half" : "star-empty"}`}>
        {filled ? "★" : half ? "⯨" : "☆"}
      </span>
    );
  }
  return <span className="cart-star-row">{stars}</span>;
}

// Per-product color map for products that don't have color in title
const PRODUCT_COLOR_MAP = {
  // Electronics
  "elec-001": "Natural Titanium", "elec-002": "Titanium Black", "elec-003": "Space Grey",
  "elec-004": "Midnight Black", "elec-005": "Cosmic Nebula Black", "elec-006": "Space Grey",
  "elec-007": "Silver", "elec-008": "Midnight", "elec-009": "Black",
  "elec-010": "Phantom Black", "elec-011": "Black", "elec-012": "Silver",
  "elec-013": "Space Grey", "elec-014": "Midnight Black", "elec-015": "Obsidian Black",
  "elec-016": "Black", "elec-017": "White", "elec-018": "Black", "elec-019": "Black",
  "elec-020": "Phantom Black", "elec-021": "Graphite", "elec-022": "Blue",
  "elec-023": "True Black", "elec-024": "Midnight Black", "elec-025": "Steel Black",
  "elec-026": "White", "elec-027": "Black", "elec-028": "Silver", "elec-029": "Titan Black",
  "elec-030": "Midnight Green", "elec-031": "Black", "elec-032": "Black",
  "elec-033": "Phantom Black", "elec-034": "Eclipse Black", "elec-035": "Midnight",
  "elec-036": "Graphite", "elec-037": "White", "elec-038": "Black", "elec-039": "White",
  "elec-040": "Black", "elec-041": "Silver", "elec-042": "Black",
  "elec-043": "Cosmic Red", "elec-044": "White", "elec-045": "Volcanic Orange",
  "elec-046": "Black", "elec-047": "White Smoke", "elec-048": "White",
  "elec-049": "Carbon Black", "elec-050": "Black", "elec-051": "Phantom Black", "elec-052": "Black",
  // Shoes
  "shoe-001": "Red/Black", "shoe-002": "Core Black", "shoe-003": "White/Multi",
  "shoe-004": "White/Green", "shoe-005": "Wheat", "shoe-006": "Blue/White",
  "shoe-007": "Tan", "shoe-008": "Black/White", "shoe-009": "Black/Blue",
  "shoe-010": "Cherry Red", "shoe-011": "Black/White", "shoe-012": "Espresso Brown",
  "shoe-013": "Triple White", "shoe-014": "Black", "shoe-015": "Brown",
  "shoe-016": "White/Green", "shoe-017": "Blue", "shoe-018": "Black",
  "shoe-019": "Black/Gold", "shoe-020": "Brown", "shoe-021": "Lemon Yellow",
  "shoe-022": "Black/Gold", "shoe-023": "Cork/Brown", "shoe-024": "Grey",
  "shoe-025": "Black/Gold", "shoe-026": "Nude", "shoe-027": "White",
  "shoe-028": "White/Grey", "shoe-029": "Brown", "shoe-030": "Grey/White",
  "shoe-031": "Beeswax", "shoe-032": "White/Black", "shoe-033": "Brown",
  "shoe-034": "Black/White", "shoe-035": "Navy Blue", "shoe-036": "White/Blue",
  "shoe-037": "Black", "shoe-038": "White/Multi", "shoe-039": "Black/Silver",
  "shoe-040": "Dark Brown", "shoe-041": "Black/Red", "shoe-042": "Black/Yellow",
  "shoe-043": "Blush Pink", "shoe-044": "Black/Orange", "shoe-045": "White",
  "shoe-046": "Dark Brown", "shoe-047": "White/Blue", "shoe-048": "White",
  "shoe-049": "White/Multi", "shoe-050": "Black", "shoe-051": "Tan",
  "shoe-052": "All Black",
  // Sports
  "sport-001": "Willow Brown", "sport-002": "Black/Gold", "sport-003": "Caramel Brown",
  "sport-004": "Blue/Black", "sport-005": "Red/Black", "sport-006": "Red",
  "sport-007": "Black", "sport-008": "Blue/Black", "sport-009": "Black",
  "sport-010": "Black/Silver", "sport-011": "Red/Black", "sport-012": "Maple/Multi",
  "sport-013": "Clear/Blue", "sport-014": "Blue/Black", "sport-015": "Charcoal",
  "sport-016": "Black", "sport-017": "Black/Multi", "sport-018": "Olive Green",
  "sport-019": "Blue", "sport-020": "Blue/Yellow", "sport-021": "Caramel Brown",
  "sport-022": "Black/Blue", "sport-023": "Yellow/Grey", "sport-024": "Black/Blue",
  "sport-025": "Red", "sport-026": "Orange/Black", "sport-027": "White/Black",
  "sport-028": "White/Red", "sport-029": "Black", "sport-030": "Black",
  "sport-031": "White/Blue", "sport-032": "Black", "sport-033": "White/Blue",
  "sport-034": "Black", "sport-035": "Multi", "sport-036": "Black/Silver",
  "sport-037": "White/Yellow", "sport-038": "Blue", "sport-039": "Black/Red",
  "sport-040": "Blue/White", "sport-041": "White", "sport-042": "Orange/Black",
  "sport-043": "Blue/White", "sport-044": "White", "sport-045": "Black",
  "sport-046": "Black", "sport-047": "Black", "sport-048": "Black/Yellow",
  "sport-049": "Black/Blue", "sport-050": "Black/Red", "sport-051": "Black/Red",
  "sport-052": "Yellow/Green",
  // Clothes
  "cloth-001": "Vintage Blue",  "cloth-002": "Floral Multi",  "cloth-003": "Charcoal",
  "cloth-004": "White",         "cloth-005": "Onyx Black",    "cloth-006": "Indigo Blue",
  "cloth-007": "Gold/Multi",    "cloth-008": "Black",         "cloth-009": "Beige",
  "cloth-010": "Olive Green",   "cloth-011": "Washed Grey",   "cloth-012": "Camel",
  "cloth-013": "White",         "cloth-014": "Light Blue",    "cloth-015": "Navy Blue",
  "cloth-016": "Gold/Ivory",    "cloth-017": "Ivory White",   "cloth-018": "Heather Grey",
  "cloth-019": "Emerald",       "cloth-020": "Burgundy",      "cloth-021": "Black",
  "cloth-022": "Multi",         "cloth-023": "Khaki",         "cloth-024": "Brown",
  "cloth-025": "Black",         "cloth-026": "Navy Blue",     "cloth-027": "Blush Pink",
  "cloth-028": "Charcoal",      "cloth-029": "Multi",         "cloth-030": "Cream",
  "cloth-031": "Khaki",         "cloth-032": "Black",         "cloth-033": "Black",
  "cloth-034": "Multi",         "cloth-035": "Navy/White",    "cloth-036": "Black",
  "cloth-037": "Red/Green",     "cloth-038": "Black",         "cloth-039": "Pastel Multi",
  "cloth-040": "Beige",         "cloth-041": "Light Blue",    "cloth-042": "Navy Blue",
  "cloth-043": "White",         "cloth-044": "Black",         "cloth-045": "Light Blue",
  "cloth-046": "Charcoal",      "cloth-047": "White",         "cloth-048": "Olive Green",
  "cloth-049": "Natural White", "cloth-050": "Black",         "cloth-051": "Tan",
  "cloth-052": "Black",
};


// Extract color: direct field > title keyword > ID map > fallback
function getProductColor(title, productId, directColor) {
  // 1. Use direct color field from product data (most accurate)
  if (directColor) return directColor;

  // 2. Common color keywords to detect in title
  const colorKeywords = [
    "Natural Titanium", "Blue Titanium", "Black Titanium", "White Titanium",
    "Midnight Black", "Onyx Black", "Core Black", "Triple Black", "All Black", "Jet Black",
    "Phantom White", "Triple White", "Cloud White", "Ivory White",
    "Midnight Blue", "Navy Blue", "Vintage Blue", "Royal Blue", "Pacific Blue",
    "Olive Green", "Forest Green", "Sage Green", "Midnight Green",
    "Rose Gold", "Starlight Gold", "Cosmic Gold",
    "Espresso Brown", "Heather Grey", "Dark Brown",
    "Chicago Lost & Found",
    "Black/White", "White/Black", "Black/Blue", "Black/Red", "White/Blue",
    "Burgundy", "Camel", "Beeswax", "Charcoal", "Graphite", "Emerald",
    "Blush Pink", "Beige", "Nude", "Silver", "Gold", "Red", "Blue", "Green",
    "Black", "White", "Grey", "Gray", "Brown", "Pink", "Tan",
  ];

  if (title) {
    const titleLower = title.toLowerCase();
    const sorted = [...colorKeywords].sort((a, b) => b.length - a.length);
    for (const color of sorted) {
      if (titleLower.includes(color.toLowerCase())) return color;
    }
    const dashMatch = title.match(/-\s*([A-Z][a-zA-Z/& ]+)$/);
    if (dashMatch) return dashMatch[1].trim();
  }

  // 3. Fall back to per-product ID map
  if (productId && PRODUCT_COLOR_MAP[productId]) {
    return PRODUCT_COLOR_MAP[productId];
  }

  return "Standard";
}

// Map color name to hex swatch
function getColorHex(colorName) {
  if (!colorName) return "#888";
  const c = colorName.toLowerCase();
  if (c.includes("black") || c.includes("obsidian") || c.includes("carbon") || c.includes("jet") || c.includes("onyx") || c.includes("midnight black")) return "#1a1a1a";
  if (c.includes("white") || c.includes("ivory") || c.includes("starlight") || c.includes("smoke") || c.includes("chalk")) return "#e5e7eb";
  if (c.includes("blue") || c.includes("pacific") || c.includes("navy") || c.includes("cobalt")) return "#1d4ed8";
  if (c.includes("red") || c.includes("burgundy") || c.includes("chicago") || c.includes("cherry") || c.includes("scarlet") || c.includes("cosmic red")) return "#dc2626";
  if (c.includes("green") || c.includes("olive") || c.includes("sage") || c.includes("forest") || c.includes("emerald")) return "#16a34a";
  if (c.includes("gold") || c.includes("camel") || c.includes("beeswax") || c.includes("yellow")) return "#d97706";
  if (c.includes("rose") || c.includes("pink") || c.includes("blush") || c.includes("magenta")) return "#f472b6";
  if (c.includes("silver") || c.includes("grey") || c.includes("gray") || c.includes("charcoal") || c.includes("graphite") || c.includes("heather")) return "#6b7280";
  if (c.includes("titanium") || c.includes("natural") || c.includes("cosmic nebula")) return "#9ca3af";
  if (c.includes("brown") || c.includes("espresso") || c.includes("tan") || c.includes("nude") || c.includes("beige") || c.includes("beeswax") || c.includes("willow") || c.includes("caramel") || c.includes("wheat") || c.includes("cork")) return "#92400e";
  if (c.includes("orange") || c.includes("volcanic")) return "#ea580c";
  if (c.includes("purple") || c.includes("volt") || c.includes("nebula")) return "#9333ea";
  if (c.includes("multi")) return "linear-gradient(135deg, #f59e0b, #10b981, #3b82f6)";
  if (c.includes("standard")) return "#4b5563";
  return "#4b5563";
}


// ── Product ID Whitelists ──────────────────────────────────────
const PHONE_IDS   = new Set(["elec-001","elec-002","elec-015","elec-029","elec-030","elec-045"]);
const LAPTOP_IDS  = new Set(["elec-003","elec-007","elec-012","elec-028","elec-034","elec-036"]);
const HEADPH_IDS  = new Set(["elec-004","elec-009","elec-023","elec-037","elec-047"]);
const TABLET_IDS  = new Set(["elec-006","elec-013","elec-022","elec-041"]);
const GAMING_IDS  = new Set(["elec-005","elec-026","elec-043","elec-044","elec-049"]);
const WATCH_IDS   = new Set(["elec-008","elec-035"]);
const CAMERA_IDS  = new Set(["elec-011","elec-018","elec-019","elec-031"]);
const TV_IDS      = new Set(["elec-010","elec-020","elec-025","elec-033","elec-051"]);
const SPEAKER_IDS = new Set(["elec-014","elec-024","elec-032","elec-042","elec-048"]);

function matchesSet(idSet, p)    { return idSet.has(String(p._id)); }
function cartMatchesSet(idSet, item) { return idSet.has(String(item.productId)); }

function detectCartCategory(item) {
  const title = (item.title || "").toLowerCase();
  const id    = String(item.productId || "");

  // Phones (exclude headphone/earphone)
  const isHeadphoneWord = title.includes("headphone") || title.includes("earphone") || title.includes("earbuds") || title.includes("airpod");
  if (!isHeadphoneWord && (
    title.includes("iphone") || title.includes("galaxy s") || title.includes("galaxy a") ||
    title.includes("pixel") || title.includes("oneplus") || title.includes("nothing phone") ||
    title.includes("xiaomi") || title.includes("smartphone") || PHONE_IDS.has(id)
  )) return "phone";

  // Laptops
  if (title.includes("laptop") || title.includes("macbook") || title.includes("notebook") ||
      title.includes("xps") || title.includes("zephyrus") || title.includes("legion") ||
      title.includes("spectre") || title.includes("tuf gaming f") || LAPTOP_IDS.has(id)
  ) return "laptop";

  // Headphones & Earbuds
  if (title.includes("headphone") || title.includes("earbuds") || title.includes("earphone") ||
      title.includes("airpod") || title.includes("momentum") || title.includes("quietcomfort") ||
      title.includes("wh-") || title.includes("arctis") || HEADPH_IDS.has(id)
  ) return "headphone";

  // Tablets
  if (title.includes("ipad") || title.includes("tablet") || title.includes("tab s") ||
      title.includes("kindle") || TABLET_IDS.has(id)
  ) return "tablet";

  // Gaming Consoles
  if (title.includes("playstation") || title.includes("xbox") || title.includes("nintendo") ||
      title.includes("meta quest") || title.includes("rog ally") || GAMING_IDS.has(id)
  ) return "gaming";

  // Smartwatches
  if (title.includes("watch") || title.includes("fenix") || title.includes("smartwatch") ||
      WATCH_IDS.has(id)
  ) return "watch";

  // Cameras & Drones
  if (title.includes("camera") || title.includes("canon") || title.includes("sony alpha") ||
      title.includes("gopro") || title.includes("dji") || title.includes("drone") ||
      CAMERA_IDS.has(id)
  ) return "camera";

  // TVs & Monitors
  if (title.includes("tv") || title.includes("oled tv") || title.includes("monitor") ||
      title.includes("display") || title.includes("bravia") || TV_IDS.has(id)
  ) return "tv";

  // Speakers
  if (title.includes("speaker") || title.includes("soundbar") || title.includes("marshall") ||
      title.includes("jbl") || title.includes("bose soundlink") || SPEAKER_IDS.has(id)
  ) return "speaker";

  // Shoes
  if (title.includes("shoe") || title.includes("sneaker") || title.includes("boot") ||
      title.includes("footwear") || id.startsWith("shoe")
  ) return "shoe";

  // Clothes
  if (title.includes("shirt") || title.includes("tshirt") || title.includes("t-shirt") ||
      title.includes("jeans") || title.includes("dress") || title.includes("jacket") ||
      title.includes("hoodie") || title.includes("pant") || id.startsWith("clot")
  ) return "cloth";

  // Sports
  if (title.includes("sport") || title.includes("fitness") || title.includes("gym") ||
      title.includes("dumbbell") || title.includes("yoga") || title.includes("ball") ||
      id.startsWith("spor")
  ) return "sport";

  return null;
}

const CATEGORY_CONFIG = {
  phone:    { title: "Phones & Mobile Devices 📱",  ids: PHONE_IDS,   pool: "electronics" },
  laptop:   { title: "Laptops & Computers 💻",       ids: LAPTOP_IDS,  pool: "electronics" },
  headphone:{ title: "Headphones & Earbuds 🎧",      ids: HEADPH_IDS,  pool: "electronics" },
  tablet:   { title: "Tablets & E-Readers 📲",       ids: TABLET_IDS,  pool: "electronics" },
  gaming:   { title: "Gaming Consoles 🎮",            ids: GAMING_IDS,  pool: "electronics" },
  watch:    { title: "Smartwatches ⌚",               ids: WATCH_IDS,   pool: "electronics" },
  camera:   { title: "Cameras & Drones 📷",           ids: CAMERA_IDS,  pool: "electronics" },
  tv:       { title: "TVs & Monitors 🖥️",             ids: TV_IDS,      pool: "electronics" },
  speaker:  { title: "Speakers & Audio 🔊",           ids: SPEAKER_IDS, pool: "electronics" },
  shoe:     { title: "Shoes & Sneakers 👟",            ids: null,        pool: "shoes"       },
  cloth:    { title: "Clothing & Fashion 👕",          ids: null,        pool: "clothes"     },
  sport:    { title: "Sports & Fitness Gear ⚽",       ids: null,        pool: "sports"      },
};

function getCategoryInfo(cartItems, allElec, allShoes, allClothes, allSports) {
  const defaultResult = {
    title: "Phones & Mobile Devices 📱",
    products: allElec.filter((p) => PHONE_IDS.has(String(p._id))),
  };

  if (!cartItems || !cartItems.length) return defaultResult;

  const cartProductIds = new Set(cartItems.map((i) => String(i.productId)));

  // Find the first recognizable category from cart
  let detected = null;
  for (const item of cartItems) {
    const cat = detectCartCategory(item);
    if (cat) { detected = cat; break; }
  }
  if (!detected) return defaultResult;

  const cfg = CATEGORY_CONFIG[detected];
  let pool;
  if (cfg.pool === "electronics") pool = allElec.filter((p) => cfg.ids.has(String(p._id)));
  else if (cfg.pool === "shoes")   pool = allShoes;
  else if (cfg.pool === "clothes") pool = allClothes;
  else                             pool = allSports;

  const filtered = pool.filter((p) => !cartProductIds.has(String(p._id)));
  return {
    title: cfg.title,
    products: filtered.length ? filtered : pool,
  };
}

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

  const quickAdd = async (e, product) => {
    e.stopPropagation();
    dispatch(addToCart({ ...product, quantity: 1 }));
    try {
      await api.post("/cart/add", { productId: product._id, quantity: 1 });
    } catch {
      // Offline fallback
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const [showExplore, setShowExplore] = useState(false);

  // Collect ALL categories present in cart items
  const cartProductIds = new Set(cartItems.map((i) => String(i.productId)));

  const presentCategories = new Set();
  for (const item of cartItems) {
    const cat = detectCartCategory(item);
    if (cat) presentCategories.add(cat);
  }

  const CATEGORY_POOL = {
    phone: electronicsProducts, laptop: electronicsProducts,
    headphone: electronicsProducts, tablet: electronicsProducts,
    gaming: electronicsProducts, watch: electronicsProducts,
    camera: electronicsProducts, tv: electronicsProducts,
    speaker: electronicsProducts,
    shoe: shoesProducts,
    cloth: clothesProducts,
    sport: sportsProducts,
  };

  const ELEC_SUB_IDS = {
    phone: PHONE_IDS, laptop: LAPTOP_IDS, headphone: HEADPH_IDS,
    tablet: TABLET_IDS, gaming: GAMING_IDS, watch: WATCH_IDS,
    camera: CAMERA_IDS, tv: TV_IDS, speaker: SPEAKER_IDS,
  };

  // Gather products from ALL present categories
  let combinedExploreProducts = [];

  if (presentCategories.size > 0) {
    presentCategories.forEach((cat) => {
      const pool = CATEGORY_POOL[cat] || electronicsProducts;
      const catProducts = pool.filter((p) => {
        if (ELEC_SUB_IDS[cat]) {
          return ELEC_SUB_IDS[cat].has(String(p._id));
        }
        return true;
      });
      combinedExploreProducts.push(...catProducts);
    });
  } else {
    // Fallback to electronics if no category detected
    combinedExploreProducts = [...electronicsProducts];
  }

  // Filter out items already in cart and remove duplicate products
  const uniqueExploreMap = new Map();
  combinedExploreProducts.forEach((p) => {
    if (!cartProductIds.has(String(p._id))) {
      uniqueExploreMap.set(String(p._id), p);
    }
  });

  const exploreProducts = Array.from(uniqueExploreMap.values());
  const similarLabel = presentCategories.size > 0 
    ? "🔍 View Similar Products For Items In Your Cart" 
    : "🔍 View Similar Products";

  return (
    <section className="cart-page">
      <Link to="/productlist" className="cart-back">
        ← Continue shopping
      </Link>

      <h1 className="cart-title">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="cart-empty-wrap">
          <p className="cart-empty">Your cart is empty 🛒</p>
          <Link to="/productlist" className="cart-shop-btn">
            Discover Products
          </Link>
        </div>
      ) : (
        <div className="cart-grid">
          {/* LEFT */}
          <div className="cart-list">
            {cartItems.map((item) => {
              const itemTotal = (item.price * item.quantity).toFixed(2);
              const { rating, reviewCount } = getProductReviews(item.productId);
              return (
                <div
                  className="cart-card cart-card-clickable"
                  key={item.productId}
                  onClick={() => navigate(`/productdetail/${item.productId}`)}
                  title="Click to view product details"
                >
                  <img
                    src={item.images?.[0] || `https://picsum.photos/seed/${item.productId}/200/200`}
                    alt={item.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://picsum.photos/seed/${item.productId}/200/200`;
                    }}
                  />

                  <div className="cart-info">
                    <h3 className="cart-item-title">{item.title}</h3>

                    {/* ⭐ RATING MATCHING SCREENSHOT */}
                    <div className="cart-item-rating">
                      <StarRating rating={rating} />
                      <span className="cart-rating-score">{rating}</span>
                      <span className="cart-rating-count">({reviewCount ? reviewCount.toLocaleString() : "1,200"} ratings)</span>
                    </div>



                    <div className="cart-price-details">
                      <span className="unit-price">₹{item.price} each</span>
                      <span className="item-subtotal">Item Total: ₹{itemTotal}</span>
                    </div>
                  </div>

                  <div className="cart-actions-right">
                    <div className="cart-actions-row">
                      <div className="qty" onClick={(e) => e.stopPropagation()}>
                        <button onClick={(e) => { e.stopPropagation(); decrease(item); }}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={(e) => { e.stopPropagation(); increase(item); }}>+</button>
                      </div>

                      <button
                        className="remove"
                        onClick={(e) => {
                          e.stopPropagation();
                          remove(item);
                        }}
                      >
                        Remove
                      </button>
                    </div>

                    <button
                      className="buy-this-now-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/checkout", { state: { singleItem: item } });
                      }}
                    >
                      ⚡ Buy This Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Price Details Box */}
          <aside className="summary">
            <h2>Price Details</h2>

            <div className="row">
              <span>MRP ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items) <small style={{ display: "block", fontSize: "11px", color: "rgba(240, 244, 248, 0.4)" }}>(Incl. of all taxes)</small></span>
              <span className="amount">₹{(total * 1.1).toFixed(2)}</span>
            </div>

            <div className="row discount-row" style={{ color: "#00d4aa" }}>
              <span>Discount</span>
              <span className="amount" style={{ color: "#00d4aa" }}>− ₹{(total * 0.1).toFixed(2)}</span>
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

      {/* ===== VIEW SIMILAR PRODUCTS (Only show when cart has items) ===== */}
      {cartItems.length > 0 && (
        <div className="explore-container">
          <div className="explore-section">
            <div className="explore-header">
              <h2>🔍 {similarLabel}</h2>
              <p>Products similar to what's in your cart</p>
            </div>

              <div className="explore-grid">
                {exploreProducts.length === 0 ? (
                  <p className="explore-empty">All similar products are already in your cart! 🎉</p>
                ) : (
                  exploreProducts.map((p) => (
                    <div
                      className="explore-card"
                      key={p._id}
                      onClick={() => navigate(`/productdetail/${p._id}`)}
                    >
                      <div className="explore-media">
                        <img
                          src={p.images?.[0] || `https://picsum.photos/seed/${p._id}/400/300`}
                          alt={p.title}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://picsum.photos/seed/${p._id}/400/300`;
                          }}
                        />
                      </div>
                      <div className="explore-body">
                        <h4>{p.title}</h4>
                        <span className="explore-price">₹{p.price}</span>
                      </div>
                      <button
                        className="explore-add-btn"
                        onClick={(e) => quickAdd(e, p)}
                      >
                        + Add to Cart
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
        </div>
      )}
    </section>
  );
}

export default Cart;













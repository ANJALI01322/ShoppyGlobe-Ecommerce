import React, { useEffect, useState, useMemo } from "react";
import { GoSearch } from "react-icons/go";
import { BiCategoryAlt, BiFilterAlt } from "react-icons/bi";
import { FaCartPlus } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCart } from "../redux/cartSlice";
import { electronicsProducts } from "../data/electronicsData";
import { clothesProducts } from "../data/clothesData";
import { shoesProducts } from "../data/shoesData";
import { sportsProducts } from "../data/sportsData";
import api from "../api";
import "./ProductList.css";

const ALLOWED_CATEGORIES = ["electronics", "clothes", "sports", "shoes"];
const staticDatasets = [...electronicsProducts, ...clothesProducts, ...shoesProducts, ...sportsProducts];

// Helper to determine product category
function getProductCategory(p) {
  if (p.category && ALLOWED_CATEGORIES.includes(p.category.toLowerCase())) {
    return p.category.toLowerCase();
  }
  const text = `${p.title || ""} ${p.description || ""}`.toLowerCase();
  if (text.includes("shoe") || text.includes("sneaker") || text.includes("boot") || text.includes("footwear")) return "shoes";
  if (text.includes("sport") || text.includes("ball") || text.includes("fitness") || text.includes("gym")) return "sports";
  if (text.includes("shirt") || text.includes("cloth") || text.includes("wear") || text.includes("dress") || text.includes("pant") || text.includes("jacket") || text.includes("powder") || text.includes("beauty") || text.includes("lipstick")) return "clothes";
  return "electronics";
}

function ProductList() {
  const [data, setData] = useState(staticDatasets);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "all";

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addingId, setAddingId] = useState(null);

  async function handleAddToCart(e, product) {
    e.stopPropagation(); // Card click navigation prevent
    if (addingId) return;
    try {
      setAddingId(product._id);
      dispatch(addToCart({ ...product, quantity: 1 }));
      try {
        await api.post("/cart/add", {
          productId: product._id,
          quantity: 1,
        });
      } catch {
        // Offline / guest mode fallback active
      }
      navigate("/cart");
    } finally {
      setAddingId(null);
    }
  }

  function handleDetail(id) {
    navigate(`/productdetail/${id}`);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        if (Array.isArray(res.data) && res.data.length > 0) {
          const existingIds = new Set(res.data.map((item) => item._id));
          const extraStatic = staticDatasets.filter((item) => !existingIds.has(item._id));
          setData([...res.data, ...extraStatic]);
        } else {
          setData(staticDatasets);
        }
      } catch (err) {
        console.error("Using fallback static products dataset", err);
        setData(staticDatasets);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Preset requested categories
  const availableCategories = useMemo(() => {
    return ["all", ...ALLOWED_CATEGORIES];
  }, []);

  // Sync state with URL params
  useEffect(() => {
    const q = searchParams.get("search") || "";
    const cat = searchParams.get("category") || "all";
    setSearchTerm(q);
    setSelectedCategory(cat);
  }, [searchParams]);

  // Combined search & category filtering
  useEffect(() => {
    const q = searchTerm.toLowerCase().trim();
    const cat = selectedCategory.toLowerCase();

    setFiltered(
      data.filter((p) => {
        const pCat = getProductCategory(p);
        const matchesCategory = cat === "all" || pCat === cat;
        const matchesSearch =
          !q ||
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          pCat.includes(q) ||
          q.includes(pCat);
        return matchesCategory && matchesSearch;
      })
    );
  }, [data, searchTerm, selectedCategory]);

  function updateQueryParams(newSearch, newCategory) {
    const params = {};
    if (newSearch && newSearch.trim()) params.search = newSearch.trim();
    if (newCategory && newCategory !== "all") params.category = newCategory;
    setSearchParams(params);
  }

  function handleSearchInputChange(e) {
    const val = e.target.value;
    setSearchTerm(val);
    // URL only updates on submit — not on every keystroke
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    updateQueryParams(searchTerm, selectedCategory);
  }

  function handleCategoryClick(categoryName) {
    setSelectedCategory(categoryName);
    updateQueryParams(searchTerm, categoryName);
  }

  if (loading) {
    return <div className="lux-loader">Curating products…</div>;
  }

  return (
    <section className="lux-page">
      <header className="lux-header">
        <h1>Discover Products</h1>
        <p>Hand-picked items with premium quality</p>

        {/* CATEGORY BUTTONS / PILLS */}
        <div className="lux-category-section">
          <div className="lux-category-header">
            <BiCategoryAlt className="lux-cat-icon" />
            <span>Select Category:</span>
          </div>

          <div className="lux-category-pills">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`lux-cat-pill ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? "active"
                    : ""
                }`}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </header>

      {filtered.length === 0 ? (
        <div className="lux-empty-wrap">
          <BiFilterAlt className="lux-empty-icon" />
          <p className="lux-empty">No products match your criteria</p>
        </div>
      ) : (
        <div className="lux-grid">
          {filtered.map((product) => (
            <article
              key={product._id}
              className="lux-card"
              onClick={() => handleDetail(product._id)}
            >
              <div className="lux-media">
                <span className="lux-badge">{getProductCategory(product)}</span>
                <img
                  src={
                    product.images?.length
                      ? product.images[0]
                      : `https://picsum.photos/seed/${product._id}/600/400`
                  }
                  alt={product.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://picsum.photos/seed/${product._id}/600/400`;
                  }}
                />
              </div>

              <div className="lux-body">
                <h3>{product.title}</h3>
                <p>
                  {product.description?.length > 90
                    ? product.description.slice(0, 90) + "…"
                    : product.description}
                </p>
              </div>

              <footer className="lux-footer">
                <span className="lux-price">₹{product.price}</span>
                <div className="lux-footer-actions">
                  <button
                    className="lux-cart-btn"
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={addingId === product._id}
                  >
                    <FaCartPlus />
                    {addingId === product._id ? "Adding…" : "Add to Cart"}
                  </button>
                  <span className="lux-link">Explore →</span>
                </div>
              </footer>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductList;






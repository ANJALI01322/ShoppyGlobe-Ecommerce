import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCart, addToCart } from "../redux/cartSlice";
import "./Productdetail.css";
import api from "../api";

import { electronicsProducts } from "../data/electronicsData";
import { clothesProducts } from "../data/clothesData";
import { shoesProducts } from "../data/shoesData";
import { sportsProducts } from "../data/sportsData";

const staticProducts = [...electronicsProducts, ...clothesProducts, ...shoesProducts, ...sportsProducts];

function ProductDetail() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);

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

    setAdding(true);

    // Save item to Redux + LocalStorage instantly
    dispatch(addToCart({ ...data, quantity: 1 }));

    // Try backend API sync if logged in
    try {
      const res = await api.post("/cart/add", {
        productId: data._id,
        quantity: 1,
      });
      if (res.data?.cart?.items) {
        // Sync if backend succeeded
      }
    } catch {
      // Offline / guest mode fallback active
    } finally {
      setAdding(false);
      navigate("/cart");
    }
  }

  if (loading) return <div className="p3d-status">Loading product details…</div>;
  if (error) return <div className="p3d-status">{error}</div>;
  if (!data) return <div className="p3d-status">Product not found</div>;

  return (
    <section className="p3d-page">
      <Link to="/productlist" className="p3d-back">
        ← Back to Products
      </Link>

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

            <p className="p3d-desc">{data.description}</p>

            {/* PRICE */}
            <div className="p3d-price">
              <span>Price</span>
              <strong>₹{Number(data.price).toFixed(2)}</strong>
            </div>

            {/* ACTION BUTTON */}
            <button
              className="p3d-btn"
              onClick={handleCart}
              disabled={adding}
            >
              🛒 {adding ? "Adding to Cart…" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;










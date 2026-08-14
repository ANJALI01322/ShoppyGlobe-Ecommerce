import { createSlice } from "@reduxjs/toolkit";

const loadWishlistFromStorage = () => {
  try {
    const stored = localStorage.getItem("pvx_wishlist");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: loadWishlistFromStorage(),
  },
  reducers: {
    setWishlist: (state, action) => {
      const raw = action.payload?.products || action.payload?.items || action.payload;
      if (!Array.isArray(raw)) return;

      state.items = raw.map((i) => {
        if (typeof i === "object" && i !== null) {
          return {
            _id: i._id || i.id,
            title: i.title,
            price: i.price,
            images: i.images || (i.image ? [i.image] : []),
            category: i.category,
            rating: i.rating,
            stock: i.stock,
          };
        }
        return { _id: i };
      });
      try {
        localStorage.setItem("pvx_wishlist", JSON.stringify(state.items));
      } catch {}
    },
    addToWishlist: (state, action) => {
      const product = action.payload;
      const prodId = product._id || product.id;
      const exists = state.items.find((item) => String(item._id || item) === String(prodId));
      if (!exists) {
        state.items.push(product);
        try {
          localStorage.setItem("pvx_wishlist", JSON.stringify(state.items));
        } catch {}
      }
    },
    removeFromWishlist: (state, action) => {
      const prodId = action.payload;
      state.items = state.items.filter((item) => String(item._id || item) !== String(prodId));
      try {
        localStorage.setItem("pvx_wishlist", JSON.stringify(state.items));
      } catch {}
    },
    clearWishlist: (state) => {
      state.items = [];
      try {
        localStorage.removeItem("pvx_wishlist");
      } catch {}
    },
  },
});

export const { setWishlist, addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;


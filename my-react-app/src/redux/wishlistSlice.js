import { createSlice } from "@reduxjs/toolkit";

// Load initial wishlist from localStorage
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
    addToWishlist: (state, action) => {
      const exists = state.items.find((item) => String(item._id) === String(action.payload._id));
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem("pvx_wishlist", JSON.stringify(state.items));
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => String(item._id) !== String(action.payload));
      localStorage.setItem("pvx_wishlist", JSON.stringify(state.items));
    },
    clearWishlist: (state) => {
      state.items = [];
      localStorage.removeItem("pvx_wishlist");
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

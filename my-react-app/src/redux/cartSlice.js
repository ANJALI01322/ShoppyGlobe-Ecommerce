import { createSlice } from "@reduxjs/toolkit";

const getInitialCart = () => {
  try {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveCart = (items) => {
  try {
    localStorage.setItem("cartItems", JSON.stringify(items));
  } catch (err) {
    console.error("Failed to save cart to localStorage", err);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: getInitialCart() },

  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const id = String(product._id || product.productId);
      const existing = state.items.find((item) => String(item.productId) === id);

      if (existing) {
        existing.quantity += Number(action.payload.quantity || 1);
      } else {
        state.items.push({
          productId: id,
          title: product.title,
          price: Number(product.price),
          images: product.images || [product.image],
          quantity: Number(action.payload.quantity || 1),
        });
      }
      saveCart(state.items);
    },

    updateQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const id = String(productId);
      const item = state.items.find((i) => String(i.productId) === id);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => String(i.productId) !== id);
        } else {
          item.quantity = Number(quantity);
        }
        saveCart(state.items);
      }
    },

    removeFromCart(state, action) {
      const id = String(action.payload);
      state.items = state.items.filter((i) => String(i.productId) !== id);
      saveCart(state.items);
    },

    setCart(state, action) {
      const raw = action.payload?.items || action.payload;
      if (!Array.isArray(raw)) return;

      state.items = raw.map((i) => ({
        productId:
          typeof i.productId === "object"
            ? i.productId._id
            : i.productId,

        title:
          typeof i.productId === "object"
            ? i.productId.title
            : i.title,

        price:
          typeof i.productId === "object"
            ? i.productId.price
            : i.price,

        images:
          typeof i.productId === "object"
            ? i.productId.images
            : i.images,

        quantity: Number(i.quantity),
      }));
      saveCart(state.items);
    },

    clearCart(state) {
      state.items = [];
      saveCart([]);
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;






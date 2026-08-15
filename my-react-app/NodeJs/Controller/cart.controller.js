import Cart from "../Model/cart.model.js";

export async function getCart(req, res) {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    return res.status(200).json({
      cart: cart || { items: [] },
    });
  } catch (err) {
    return res.status(200).json({ cart: { items: [] } });
  }
}

import Product from "../Model/products.model.js";
import Cart from "../Model/cart.model.js";

export async function addToCart(req, res) {
  const { productId, title, price, images, quantity = 1 } = req.body;

  try {
    const product = await Product.findById(String(productId));
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const requestedQty = Number(quantity);
    let cart = await Cart.findOne({ userId: req.user._id });

    let currentQtyInCart = 0;
    if (cart) {
      const existingItem = cart.items.find(
        (i) => String(i.productId) === String(productId)
      );
      if (existingItem) {
        currentQtyInCart = Number(existingItem.quantity || 0);
      }
    }

    const totalRequested = currentQtyInCart + requestedQty;
    if (totalRequested > product.stock) {
      return res.status(400).json({
        message: `Insufficient stock for ${product.title}. Available stock: ${product.stock}`,
      });
    }

    if (!cart) {
      cart = new Cart({
        userId: req.user._id,
        items: [{ productId: String(productId), title: product.title, price: product.price, images: product.images, quantity: requestedQty }],
      });
    } else {
      const item = cart.items.find(
        (i) => String(i.productId) === String(productId)
      );

      if (item) {
        item.quantity = totalRequested;
      } else {
        cart.items.push({ productId: String(productId), title: product.title, price: product.price, images: product.images, quantity: requestedQty });
      }
    }

    await cart.save();
    return res.status(200).json({ cart });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export async function updateQuantity(req, res) {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const product = await Product.findById(String(productId));
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const requestedQty = Number(quantity);
    if (requestedQty > product.stock) {
      return res.status(400).json({
        message: `Insufficient stock for ${product.title}. Available stock: ${product.stock}`,
      });
    }

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (i) => String(i.productId) === String(productId)
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (requestedQty <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = requestedQty;
    }

    await cart.save();
    return res.status(200).json({ cart });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}


export async function removeItem(req, res) {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (i) => String(i.productId) !== String(productId)
    );

    await cart.save();
    return res.status(200).json({ cart });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export async function clearCartBackend(req, res) {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({ items: [] });
  } catch (err) {
    res.status(500).json({ message: "Failed to clear cart" });
  }
}




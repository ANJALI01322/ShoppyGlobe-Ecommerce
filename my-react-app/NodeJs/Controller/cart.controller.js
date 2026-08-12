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

export async function addToCart(req, res) {
  const { productId, title, price, images, quantity = 1 } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = new Cart({
        userId: req.user._id,
        items: [{ productId: String(productId), title, price, images, quantity: Number(quantity) }],
      });
    } else {
      const item = cart.items.find(
        (i) => String(i.productId) === String(productId)
      );

      if (item) {
        item.quantity += Number(quantity);
      } else {
        cart.items.push({ productId: String(productId), title, price, images, quantity: Number(quantity) });
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

    if (Number(quantity) <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = Number(quantity);
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




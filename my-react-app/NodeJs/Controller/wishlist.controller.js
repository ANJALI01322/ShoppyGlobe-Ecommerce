import Wishlist from "../Model/wishlist.model.js";
import Product from "../Model/products.model.js";

/* ===================== GET WISHLIST ===================== */
export async function getWishlist(req, res) {
  try {
    const userId = req.user._id || req.user.id;
    let wishlist = await Wishlist.findOne({ userId }).populate("products");

    if (!wishlist) {
      wishlist = { userId, products: [] };
    }

    return res.status(200).json({ wishlist });
  } catch (error) {
    console.error("GET WISHLIST ERROR:", error);
    return res.status(500).json({ message: "Failed to fetch wishlist" });
  }
}

/* ===================== ADD TO WISHLIST ===================== */
export async function addToWishlist(req, res) {
  try {
    const userId = req.user._id || req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Verify product exists in DB
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({
        userId,
        products: [productId],
      });
    } else {
      // Prevent duplicates
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
      }
    }

    await wishlist.save();
    const populatedWishlist = await Wishlist.findOne({ userId }).populate("products");

    return res.status(201).json({
      message: "Product added to wishlist successfully",
      wishlist: populatedWishlist,
    });
  } catch (error) {
    console.error("ADD TO WISHLIST ERROR:", error);
    return res.status(500).json({ message: "Failed to add product to wishlist" });
  }
}

/* ===================== REMOVE FROM WISHLIST ===================== */
export async function removeFromWishlist(req, res) {
  try {
    const userId = req.user._id || req.user.id;
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter(
      (id) => String(id) !== String(productId)
    );

    await wishlist.save();
    const populatedWishlist = await Wishlist.findOne({ userId }).populate("products");

    return res.status(200).json({
      message: "Product removed from wishlist successfully",
      wishlist: populatedWishlist,
    });
  } catch (error) {
    console.error("REMOVE FROM WISHLIST ERROR:", error);
    return res.status(500).json({ message: "Failed to remove product from wishlist" });
  }
}

/* ===================== CLEAR WISHLIST ===================== */
export async function clearWishlist(req, res) {
  try {
    const userId = req.user._id || req.user.id;
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(200).json({ wishlist: { products: [] } });
    }

    wishlist.products = [];
    await wishlist.save();

    return res.status(200).json({
      message: "Wishlist cleared successfully",
      wishlist,
    });
  } catch (error) {
    console.error("CLEAR WISHLIST ERROR:", error);
    return res.status(500).json({ message: "Failed to clear wishlist" });
  }
}

import express from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../Controller/wishlist.controller.js";
import authMiddleware from "../Middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, getWishlist);
router.post("/", authMiddleware, addToWishlist);
router.delete("/clear", authMiddleware, clearWishlist);
router.delete("/:productId", authMiddleware, removeFromWishlist);

export default router;

import express from "express";
import { getProductReviews, addReview, deleteReview } from "../Controller/review.controller.js";
import authMiddleware from "../Middleware/auth.js";

const router = express.Router();

router.get("/:productId", getProductReviews);
router.post("/", authMiddleware, addReview);
router.delete("/:id", authMiddleware, deleteReview);

export default router;

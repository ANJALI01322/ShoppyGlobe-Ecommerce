import Review from "../Model/review.model.js";
import mongoose from "mongoose";

/* ===================== GET REVIEWS FOR PRODUCT ===================== */
export async function getProductReviews(req, res) {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const reviews = await Review.find({ productId }).sort({ createdAt: -1 }).lean();

    let avgRating = 4.5;
    if (reviews.length > 0) {
      const sum = reviews.reduce((acc, r) => acc + Number(r.rating || 0), 0);
      avgRating = Math.min(5, Math.max(1, Math.round((sum / reviews.length) * 10) / 10));
    }

    return res.status(200).json({
      rating: avgRating,
      reviewCount: reviews.length,
      reviews: reviews.map((r) => ({
        id: r._id,
        _id: r._id,
        userId: r.userId,
        name: r.name,
        avatar: r.avatar,
        date: new Date(r.createdAt).toLocaleDateString("en-IN", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        rating: r.rating,
        text: r.text,
      })),
    });
  } catch (error) {
    console.error("GET REVIEWS ERROR:", error);
    return res.status(500).json({ message: "Failed to fetch reviews" });
  }
}

/* ===================== ADD REVIEW ===================== */
export async function addReview(req, res) {
  try {
    const { productId, rating, text } = req.body;
    const userId = req.user?._id || req.user?.id;
    const userName = req.user?.name || req.user?.email?.split("@")[0] || "Verified Customer";

    if (!productId || !rating || !text) {
      return res.status(400).json({ message: "Product ID, rating, and review text are required" });
    }

    const cleanRating = Number(rating);
    if (cleanRating < 1 || cleanRating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    // Check duplicate
    const existing = await Review.findOne({ productId, userId });
    if (existing) {
      return res.status(409).json({ message: "You have already reviewed this product" });
    }

    const avatar = userName.slice(0, 2).toUpperCase();

    const review = new Review({
      productId: String(productId),
      userId,
      name: userName,
      avatar,
      rating: cleanRating,
      text: String(text).trim(),
    });

    await review.save();

    // Fetch updated reviews summary
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 }).lean();
    const sum = reviews.reduce((acc, r) => acc + Number(r.rating || 0), 0);
    const avgRating = Math.min(5, Math.max(1, Math.round((sum / reviews.length) * 10) / 10));

    return res.status(201).json({
      message: "Review added successfully",
      rating: avgRating,
      reviewCount: reviews.length,
      review: {
        id: review._id,
        _id: review._id,
        userId: review.userId,
        name: review.name,
        avatar: review.avatar,
        date: "Just now",
        rating: review.rating,
        text: review.text,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "You have already reviewed this product" });
    }
    console.error("ADD REVIEW ERROR:", error);
    return res.status(500).json({ message: "Failed to add review" });
  }
}

/* ===================== DELETE REVIEW ===================== */
export async function deleteReview(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user?._id || req.user?.id;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Ensure user owns review
    if (String(review.userId) !== String(userId)) {
      return res.status(403).json({ message: "Unauthorized to delete this review" });
    }

    const productId = review.productId;
    await Review.findByIdAndDelete(id);

    const reviews = await Review.find({ productId }).sort({ createdAt: -1 }).lean();
    let avgRating = 4.5;
    if (reviews.length > 0) {
      const sum = reviews.reduce((acc, r) => acc + Number(r.rating || 0), 0);
      avgRating = Math.min(5, Math.max(1, Math.round((sum / reviews.length) * 10) / 10));
    }

    return res.status(200).json({
      message: "Review deleted successfully",
      rating: avgRating,
      reviewCount: reviews.length,
    });
  } catch (error) {
    console.error("DELETE REVIEW ERROR:", error);
    return res.status(500).json({ message: "Failed to delete review" });
  }
}

import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "U",
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate reviews by the same user for the same product
reviewSchema.index({ productId: 1, userId: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema);

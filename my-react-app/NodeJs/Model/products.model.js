import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    default: 50,
  },
  category: {
    type: String,
    default: "general",
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  reviewCount: {
    type: Number,
    default: 120,
  },
});

const Product = mongoose.model("Product", ProductSchema, "products");

export default Product;

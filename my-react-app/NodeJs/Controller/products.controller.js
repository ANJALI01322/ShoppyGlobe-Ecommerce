import mongoose from "mongoose";
import Product from "../Model/products.model.js";
import fetch from "node-fetch";

export const saveData = async (req, res) => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();

    // ✅ CORRECT CHECK
    if (!data || !data.products || data.products.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const productsToSave = data.products.map(item => ({
      images: item.images,
      title: item.title,
      description: item.description,
      price: item.price,
      stock: item.stock,
      category: item.category || "general",
    }));

    await Product.insertMany(productsToSave);

    res.status(200).json({
      message: "Products successfully added",
      count: productsToSave.length,
    });

  } catch (error) {
    console.error("SAVE DATA ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getProductID = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




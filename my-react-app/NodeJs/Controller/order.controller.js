import Order from "../Model/order.model.js";
import Product from "../Model/products.model.js";
import mongoose from "mongoose";

// In-memory orders store fallback
const memoryOrders = new Map(); // key: userEmail -> array of orders

// 1. Create a new order with Stock Validation and Atomic Decrement
export async function createOrder(req, res) {
  try {
    const userEmail = req.user?.email;
    if (!userEmail) {
      return res.status(401).json({ success: false, message: "Unauthorized: user email not found" });
    }

    const { items, paymentMethod, paymentId, shippingAddress } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Order must contain items" });
    }

    // Server-side validation and price/stock calculation
    let calculatedTotal = 0;
    const validatedItems = [];

    if (mongoose.connection.readyState === 1) {
      for (const item of items) {
        const prodId = String(item.productId || item._id || item.id || "");
        const requestedQty = Number(item.quantity || 0);

        if (requestedQty <= 0) {
          return res.status(400).json({ success: false, message: "Invalid quantity specified" });
        }

        const product = await Product.findById(prodId);
        if (!product) {
          return res.status(404).json({ success: false, message: `Product not found: ${item.title || prodId}` });
        }

        if (product.stock < requestedQty) {
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for ${product.title}. Available stock: ${product.stock}`,
          });
        }

        const itemTotal = Number(product.price) * requestedQty;
        calculatedTotal += itemTotal;

        validatedItems.push({
          productId: prodId,
          title: product.title,
          price: Number(product.price),
          quantity: requestedQty,
          image: product.images?.[0] || item.image || "",
        });
      }

      // Decrement stock atomically for all items
      for (const vItem of validatedItems) {
        const updated = await Product.findOneAndUpdate(
          { _id: vItem.productId, stock: { $gte: vItem.quantity } },
          { $inc: { stock: -vItem.quantity } },
          { new: true }
        );

        if (!updated) {
          // If any stock condition fails midway, abort and report stock error
          return res.status(400).json({
            success: false,
            message: `Stock conflict or insufficient stock for ${vItem.title}`,
          });
        }
      }
    } else {
      // Fallback if DB offline
      for (const item of items) {
        const requestedQty = Number(item.quantity || 1);
        const price = Number(item.price || 0);
        calculatedTotal += price * requestedQty;
        validatedItems.push({
          productId: String(item.productId || item._id || item.id || ""),
          title: item.title || "Product",
          price,
          quantity: requestedQty,
          image: item.image || item.images?.[0] || "",
        });
      }
    }

    const newOrderId = "ORD-" + Date.now() + "-" + Math.floor(1000 + Math.random() * 9000);

    const orderData = {
      orderId: newOrderId,
      userEmail,
      items: validatedItems,
      totalAmount: calculatedTotal,
      paymentMethod: paymentMethod || "upi",
      paymentId: paymentId || "",
      status: "Confirmed",
      shippingAddress: shippingAddress || {},
      createdAt: new Date(),
    };

    let createdOrder = orderData;

    if (mongoose.connection.readyState === 1) {
      const dbOrder = new Order(orderData);
      await dbOrder.save();
      createdOrder = dbOrder.toObject();
    }

    // Always sync with memory cache
    const existing = memoryOrders.get(userEmail) || [];
    existing.unshift(createdOrder);
    memoryOrders.set(userEmail, existing);

    return res.status(201).json({
      success: true,
      message: "Order placed successfully! 🎉",
      order: createdOrder,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    return res.status(500).json({ success: false, message: "Failed to save order", error: error.message });
  }
}

// 2. Get all orders for logged in user
export async function getUserOrders(req, res) {
  try {
    const userEmail = req.user?.email;
    if (!userEmail) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    let orders = [];

    if (mongoose.connection.readyState === 1) {
      orders = await Order.find({ userEmail }).sort({ createdAt: -1 }).lean();
    }

    // Fallback to memory store if DB is empty or offline
    if (!orders || orders.length === 0) {
      orders = memoryOrders.get(userEmail) || [];
    }

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get Orders Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch orders", error: error.message });
  }
}


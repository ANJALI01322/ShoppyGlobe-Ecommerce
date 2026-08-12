import Order from "../Model/order.model.js";
import mongoose from "mongoose";

// In-memory orders store fallback
const memoryOrders = new Map(); // key: userEmail -> array of orders

// 1. Create a new order
export async function createOrder(req, res) {
  try {
    const userEmail = req.user?.email;
    if (!userEmail) {
      return res.status(401).json({ success: false, message: "Unauthorized: user email not found" });
    }

    const { items, totalAmount, paymentMethod, paymentId, shippingAddress } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Order must contain items" });
    }

    const newOrderId = "ORD-" + Date.now() + "-" + Math.floor(1000 + Math.random() * 9000);

    const orderData = {
      orderId: newOrderId,
      userEmail,
      items: items.map((i) => ({
        productId: String(i.productId || i._id || i.id || ""),
        title: i.title || "Product",
        price: Number(i.price || 0),
        quantity: Number(i.quantity || 1),
        image: i.image || i.images?.[0] || "",
      })),
      totalAmount: Number(totalAmount || 0),
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

    res.status(201).json({
      success: true,
      message: "Order placed successfully! 🎉",
      order: createdOrder,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ success: false, message: "Failed to save order", error: error.message });
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

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get Orders Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders", error: error.message });
  }
}

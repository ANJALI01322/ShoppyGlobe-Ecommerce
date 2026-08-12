import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_TOb9ndistzEYCD",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "cwQY5U2YhJU6E5g8lctJRGgw",
});

// 1. Create Razorpay Order
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body; // Amount in INR
    if (!amount) {
      return res.status(400).json({ success: false, message: "Amount is required" });
    }

    // Razorpay Test Mode limits single transaction to ₹5,00,000 (5,00,000 INR = 50,00,000 paise)
    let rawPaise = Math.round(Number(amount) * 100);
    const maxPaiseAllowed = 50000000; // ₹5,00,000
    const finalAmountInPaise = Math.min(rawPaise, maxPaiseAllowed);

    const options = {
      amount: finalAmountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(200).json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID || "rzp_test_TOb9ndistzEYCD",
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error?.error || error);
    const errorMsg = error?.error?.description || error.message || "Could not create Razorpay order";
    res.status(500).json({ success: false, message: errorMsg, error });
  }
});

// 2. Verify Razorpay Payment Signature
router.post("/verify-payment", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET || "cwQY5U2YhJU6E5g8lctJRGgw";
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid payment signature" });
    }
  } catch (error) {
    console.error("Razorpay verification error:", error);
    res.status(500).json({ success: false, message: "Payment verification failed" });
  }
});

export default router;

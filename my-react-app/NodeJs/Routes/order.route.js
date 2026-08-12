import express from "express";
import { createOrder, getUserOrders } from "../Controller/order.controller.js";
import authMiddleware from "../Middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, getUserOrders);

export default router;

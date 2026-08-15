import express from "express";
import { chatWithAssistant } from "../Controller/ai.controller.js";
import authMiddleware from "../Middleware/auth.js";

const router = express.Router();

router.post("/chat", authMiddleware, chatWithAssistant);

export default router;

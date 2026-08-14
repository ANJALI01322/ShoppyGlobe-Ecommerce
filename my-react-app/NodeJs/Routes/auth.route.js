import express from "express";
import { register, login, logout, updateProfile, getAddresses, saveAddresses } from "../Controller/auth.controller.js";
import authMiddleware from "../Middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/profile", authMiddleware, updateProfile);
router.get("/addresses", authMiddleware, getAddresses);
router.put("/addresses", authMiddleware, saveAddresses);

router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    user: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name || "",
      phone: req.user.phone || "",
    },
  });
});

export default router;

import jwt from "jsonwebtoken";
import auth from "../Model/auth.model.js";
import mongoose from "mongoose";
import { memoryUsers } from "../Controller/auth.controller.js";

export default async function authMiddleware(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret_key";
    const decoded = jwt.verify(token, jwtSecret);

    // decoded.id = user._id (string), decoded.email = user email
    let user = null;

    if (mongoose.connection.readyState === 1) {
      // Look up by email if available in token, else by _id as string
      if (decoded.email) {
        user = await auth.findOne({ email: decoded.email }).select("-password").lean();
      } else {
        // Try direct string match on _id
        try {
          user = await auth.findOne({ _id: decoded.id }).select("-password").lean();
        } catch (castErr) {
          user = null;
        }
      }
    } else {
      user = memoryUsers.get(decoded.id) || memoryUsers.get(decoded.email);
    }

    if (!user) {
      // If still not found but token is valid, create a minimal user object from token
      if (decoded.id && decoded.email) {
        user = { _id: decoded.id, email: decoded.email };
      } else {
        return res.status(401).json({ message: "User not found" });
      }
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("AUTH ERROR:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
}









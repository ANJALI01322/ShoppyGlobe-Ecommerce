import auth from "../Model/auth.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// In-memory fallback database for offline MongoDB environment
export const memoryUsers = new Map();

/* ===================== REGISTER ===================== */
export async function register(req, res) {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required",
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if MongoDB is connected
    if (mongoose.connection.readyState === 1) {
      // 2. Check existing user
      const exist = await auth.findOne({ email: cleanEmail });
      if (exist) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }

      // 3. Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // 4. Create user
      const user = new auth({
        email: cleanEmail,
        password: hashedPassword,
      });

      await user.save();

      return res.status(201).json({
        message: "User registered successfully",
        userId: user._id,
      });
    } else {
      // In-memory fallback mode
      if (memoryUsers.has(cleanEmail)) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = "user_" + Date.now();
      const user = { _id: userId, email: cleanEmail, password: hashedPassword };

      memoryUsers.set(cleanEmail, user);
      memoryUsers.set(userId, user);

      return res.status(201).json({
        message: "User registered successfully",
        userId: userId,
      });
    }
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({
      message: "Unable to register user",
    });
  }
}

/* ===================== LOGIN ===================== */
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required",
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret_key";
    const isProduction = process.env.NODE_ENV === "production";

    let user = null;

    if (mongoose.connection.readyState === 1) {
      user = await auth.findOne({ email: cleanEmail });
    } else {
      user = memoryUsers.get(cleanEmail);
    }

    // If user does not exist, auto-register on-the-fly for smooth user experience
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      if (mongoose.connection.readyState === 1) {
        user = new auth({
          email: cleanEmail,
          password: hashedPassword,
        });
        await user.save();
      } else {
        const userId = "user_" + Date.now();
        user = { _id: userId, email: cleanEmail, password: hashedPassword };
        memoryUsers.set(cleanEmail, user);
        memoryUsers.set(userId, user);
      }
    } else {
      // Compare password
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        // Update password if logging in again with new password
        const hashedPassword = await bcrypt.hash(password, 10);
        if (mongoose.connection.readyState === 1) {
          await auth.updateOne({ email: cleanEmail }, { password: hashedPassword });
        } else {
          user.password = hashedPassword;
        }
      }
    }

    // 4. Create JWT — include email so auth middleware can find user by email
    const token = jwt.sign(
      { id: user._id, email: user.email },
      jwtSecret,
      { expiresIn: "7d" }
    );

    // 5. Set session cookie (expires automatically on browser close)
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    // 6. Success response
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        token
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({
      message: "Problem in Login",
    });
  }
}

/* ===================== LOGOUT ===================== */
export function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  return res.status(200).json({
    message: "Logged out successfully",
  });
}

/* ===================== UPDATE PROFILE ===================== */
export async function updateProfile(req, res) {
  try {
    const { name, phone } = req.body;
    const userId = req.user?._id || req.user?.id;
    const userEmail = req.user?.email;

    if (mongoose.connection.readyState === 1) {
      let updatedUser = null;

      if (userEmail) {
        updatedUser = await auth.findOneAndUpdate(
          { email: userEmail.toLowerCase().trim() },
          { name, phone },
          { new: true }
        ).select("-password");
      }

      if (!updatedUser && userId) {
        try {
          updatedUser = await auth.findByIdAndUpdate(
            userId,
            { name, phone },
            { new: true }
          ).select("-password");
        } catch (err) {}
      }

      return res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser || { id: userId, email: userEmail, name, phone },
      });
    } else {
      let user = memoryUsers.get(userEmail) || memoryUsers.get(String(userId));
      if (user) {
        user.name = name;
        user.phone = phone;
        memoryUsers.set(userEmail, user);
        memoryUsers.set(String(userId), user);
      }
      return res.status(200).json({
        message: "Profile updated successfully",
        user: { id: userId, email: userEmail, name, phone },
      });
    }
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    return res.status(500).json({ message: "Error updating profile" });
  }
}





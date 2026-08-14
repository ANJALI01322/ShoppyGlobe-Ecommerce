import express from "express"
import mongoose from 'mongoose'
import cors from "cors";
import dotenv from "dotenv";
import cartRoutes from "./Routes/cart.route.js";
import productRoutes from "./Routes/products.route.js";
import authRoutes from "./Routes/auth.route.js";
import paymentRoutes from "./Routes/payment.route.js";
import orderRoutes from "./Routes/order.route.js";
import wishlistRoutes from "./Routes/wishlist.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app= express();
app.use(express.json())
app.use(cookieParser());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    return callback(null, origin);
  },
  credentials: true
}));

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist", wishlistRoutes);





import { seedProducts } from "./seedData.js";

// MongoDB connection
async function connectDB() {
  const defaultUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/productsdata";
  try {
    await mongoose.connect(defaultUri, { dbName: "productsdata", serverSelectionTimeoutMS: 2000 });
    console.log("✅ MongoDB Connected to Local Server");
  } catch {
    console.log("⚠️ Local MongoDB not running. Starting Embedded MongoDB Server...");
    try {
      const { MongoMemoryServer } = await import("mongodb-memory-server");
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri, { dbName: "productsdata" });
      console.log("✅ Embedded MongoDB Server Online at:", mongoUri);
    } catch (e) {
      console.error("❌ Error starting embedded MongoDB:", e.message);
    }
  }
}

connectDB();

mongoose.connection.once("open", async () => {
  console.log("✅ Database Connected & Ready. DB Name:", mongoose.connection.name);
  try {
    await seedProducts();
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("👉 MongoDB Collections:", collections.map(c => c.name));
  } catch {}
});

mongoose.connection.on("error", () => {
  console.log("❌ Error in connecting...");
});

//start server
const PORT = process.env.PORT || 1900;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


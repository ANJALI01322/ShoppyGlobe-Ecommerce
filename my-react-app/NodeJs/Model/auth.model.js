import mongoose from "mongoose";

const userschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
});

const auth = mongoose.model("authuser", userschema);

export default auth;
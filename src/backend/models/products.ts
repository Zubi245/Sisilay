import mongoose, { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  name: String,
  price: Number,
  category: String,
  page: { type: String, default: 'shop' }, // e.g., 'landing', 'shop', etc.
  featured: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 },
  image: String,
}, { timestamps: true });

export default mongoose.models.Product || model("Product", ProductSchema);

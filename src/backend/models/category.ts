import mongoose, { Schema, model } from "mongoose";

const CategorySchema = new Schema({
  name: String,
}, { timestamps: true });

export default mongoose.models.Category || model("Category", CategorySchema);

import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
}, { timestamps: true });

export default mongoose.models.User || model("User", UserSchema);

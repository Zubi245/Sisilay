import mongoose, { Schema, model } from "mongoose";

const OrderSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    price: Number,
  }],
  total: Number,
  status: { type: String, default: "pending" },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
}, { timestamps: true });

export default mongoose.models.Order || model("Order", OrderSchema);

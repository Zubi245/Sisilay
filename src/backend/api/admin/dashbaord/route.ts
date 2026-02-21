import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Order from "../../../models/order";
import User from "../../../models/user";
import Product from "../../../models/products";

export async function GET() {
  await connectDB();
  const totalOrders = await Order.countDocuments();
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalRevenueAgg = await Order.aggregate([{ $group: { _id: null, total: { $sum: "$total" } } }]);
  const totalRevenue = totalRevenueAgg[0]?.total || 0;

  return NextResponse.json({ totalOrders, totalRevenue, totalUsers, totalProducts });
}

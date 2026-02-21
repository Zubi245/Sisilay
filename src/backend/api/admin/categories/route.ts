import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Category from "../../../models/category";

export async function GET() {
  await connectDB();
  const categories = await Category.find();
  return NextResponse.json(categories);
}

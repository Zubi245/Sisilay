import { NextResponse } from "next/server";
import cloudinary from "../../lib/cloudinary";

export async function POST(req: Request) {
  const data = await req.json();
  const result = await cloudinary.uploader.upload(data.image, { folder: "products" });
  return NextResponse.json({ url: result.secure_url });
}

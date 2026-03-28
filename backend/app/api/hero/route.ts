import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import HeroSlide from '@/models/heroSlide';

// GET /api/hero - Get all enabled hero slides
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const slides = await HeroSlide.find({ enabled: true })
      .sort({ sortOrder: 1 })
      .lean();

    return NextResponse.json({ success: true, data: slides });
  } catch (error: any) {
    console.error('GET /api/hero error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch hero slides' },
      { status: 500 }
    );
  }
}

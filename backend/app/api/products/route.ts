import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/product';

// GET /api/products - Get all enabled products
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const pageType = searchParams.get('pageType');

    const query: any = { enabled: true };

    if (category && category !== 'All') {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (pageType) {
      query.pageType = pageType;
    }

    const products = await Product.find(query).sort({ sortOrder: 1, createdAt: -1 }).lean();

    return NextResponse.json({ success: true, data: products });
  } catch (error: any) {
    console.error('GET /api/products error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

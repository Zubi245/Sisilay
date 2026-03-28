import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/models/order';

// POST /api/orders - Create new order
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate required fields
    const { customerName, customerEmail, customerPhone, shippingAddress, city, postalCode, items, total } = body;

    if (!customerName || !customerEmail || !customerPhone || !shippingAddress || !city || !postalCode || !items || !total) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Order must contain at least one item' },
        { status: 400 }
      );
    }

    const order = await Order.create({
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      city,
      postalCode,
      items,
      total,
      status: 'pending',
    });

    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/orders error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/user';
import { signToken, comparePassword, hashPassword } from '@/lib/auth';

// POST /api/auth/login - Admin login
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Find user
    let user = await User.findOne({ username });

    // For demo: Create default admin if doesn't exist
    if (!user && username === 'admin') {
      const hashedPassword = await hashPassword('password');
      user = await User.create({
        username: 'admin',
        password: hashedPassword,
        email: 'admin@sisilay.com',
        role: 'admin',
      });
    }

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate token
    const token = signToken({
      userId: user._id.toString(),
      username: user.username,
      role: user.role,
    });

    return NextResponse.json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error: any) {
    console.error('POST /api/auth/login error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Login failed' },
      { status: 500 }
    );
  }
}

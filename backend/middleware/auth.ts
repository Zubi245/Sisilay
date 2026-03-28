import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractToken } from '@/lib/auth';

export function withAuth(handler: Function) {
  return async (request: NextRequest, ...args: any[]) => {
    try {
      const authHeader = request.headers.get('authorization');
      const token = extractToken(authHeader);

      if (!token) {
        return NextResponse.json(
          { success: false, error: 'Authentication required' },
          { status: 401 }
        );
      }

      const payload = verifyToken(token);

      if (payload.role !== 'admin') {
        return NextResponse.json(
          { success: false, error: 'Admin access required' },
          { status: 403 }
        );
      }

      // Attach user to request
      (request as any).user = payload;

      return handler(request, ...args);
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 401 }
      );
    }
  };
}

# Project Separation Plan: Frontend (Vite + React) & Backend (Next.js API)

## Overview
This document outlines the complete separation of the Sisilay project into:
1. **Frontend**: Vite + React (client-only)
2. **Backend**: Next.js (API-only, no UI rendering)

## Architecture

### Frontend Structure
```
frontend/
├── src/
│   ├── components/          # UI components (unchanged)
│   ├── pages/              # React pages (unchanged UI)
│   ├── context/            # React context (CartContext)
│   ├── services/
│   │   └── api.ts          # Centralized API service
│   ├── hooks/              # Custom React hooks
│   ├── types.ts            # TypeScript types
│   ├── index.tsx
│   └── index.css
├── public/
├── .env                    # VITE_API_URL
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### Backend Structure
```
backend/
├── app/
│   └── api/
│       ├── products/
│       │   └── route.ts    # GET /api/products
│       ├── products/[id]/
│       │   └── route.ts    # GET /api/products/:id
│       ├── orders/
│       │   └── route.ts    # GET, POST /api/orders
│       ├── orders/[id]/
│       │   └── route.ts    # PATCH /api/orders/:id
│       ├── auth/
│       │   ├── login/
│       │   │   └── route.ts    # POST /api/auth/login
│       │   └── verify/
│       │       └── route.ts    # GET /api/auth/verify
│       ├── admin/
│       │   ├── products/
│       │   │   └── route.ts    # POST, PUT, DELETE /api/admin/products
│       │   ├── categories/
│       │   │   └── route.ts    # GET /api/admin/categories
│       │   ├── dashboard/
│       │   │   └── route.ts    # GET /api/admin/dashboard
│       │   ├── orders/
│       │   │   └── route.ts    # GET /api/admin/orders
│       │   └── users/
│       │       └── route.ts    # GET /api/admin/users
│       ├── hero/
│       │   └── route.ts    # GET, PUT /api/hero
│       └── upload/
│           └── route.ts    # POST /api/upload
├── lib/
│   ├── db.ts              # Database connection
│   ├── auth.ts            # JWT utilities
│   └── cloudinary.ts      # Image upload
├── models/
│   ├── product.ts
│   ├── order.ts
│   ├── category.ts
│   └── user.ts
├── services/
│   ├── product.services.ts
│   ├── order.services.ts
│   └── category.services.ts
├── middleware/
│   └── adminAuth.ts
├── .env                   # MONGO_URI, JWT_SECRET, CLOUDINARY_*
├── package.json
├── next.config.js
└── tsconfig.json
```

## API Endpoints

### Public Endpoints
- `GET /api/products` - Get all enabled products
- `GET /api/products/:id` - Get single product
- `GET /api/hero` - Get hero slides
- `POST /api/orders` - Create order
- `POST /api/auth/login` - Admin login

### Admin Endpoints (Requires JWT)
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/products` - All products (including disabled)
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/orders` - All orders
- `PATCH /api/admin/orders/:id` - Update order status
- `GET /api/admin/categories` - All categories
- `GET /api/admin/users` - All users
- `POST /api/upload` - Upload images
- `PUT /api/hero` - Update hero slides

## Frontend API Integration

### Environment Variables
```env
VITE_API_URL=http://localhost:3001
```

### API Service (`frontend/src/services/api.ts`)
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Products
export const getProducts = () => fetch(`${API_URL}/api/products`).then(r => r.json());
export const getProduct = (id: string) => fetch(`${API_URL}/api/products/${id}`).then(r => r.json());

// Orders
export const createOrder = (order: Order) => 
  fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  }).then(r => r.json());

// Admin (with JWT)
export const adminLogin = (credentials: {username: string, password: string}) =>
  fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  }).then(r => r.json());

export const getAdminProducts = (token: string) =>
  fetch(`${API_URL}/api/admin/products`, {
    headers: { 'Authorization': `Bearer ${token}` }
  }).then(r => r.json());
```

## Migration Steps

### Phase 1: Backend Setup
1. Create `backend/` directory
2. Initialize Next.js: `npx create-next-app@latest backend --typescript --app`
3. Move backend code from `Sisilay/src/backend/` to `backend/app/api/`
4. Convert localStorage `db.ts` to MongoDB operations
5. Set up environment variables
6. Test all API endpoints

### Phase 2: Frontend Setup
1. Create `frontend/` directory
2. Move frontend code from `Sisilay/` to `frontend/src/`
3. Create `api.ts` service file
4. Replace all `db.*` calls with API calls
5. Update environment variables
6. Test all pages

### Phase 3: Testing
1. Start backend: `cd backend && npm run dev` (port 3001)
2. Start frontend: `cd frontend && npm run dev` (port 3000)
3. Test all functionality
4. Verify authentication flow
5. Test admin dashboard

## Key Changes

### Authentication
- **Before**: localStorage check
- **After**: JWT token from `/api/auth/login`, stored in localStorage, sent in Authorization header

### Data Fetching
- **Before**: Direct `db.getProducts()`
- **After**: `await api.getProducts()`

### Admin Operations
- **Before**: Direct `db.addProduct(product)`
- **After**: `await api.createProduct(product, token)`

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001
```

### Backend (.env)
```
MONGO_URI=mongodb://localhost:27017/sisilay
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Deployment

### Frontend
- Build: `npm run build`
- Deploy to: Vercel, Netlify, or any static hosting
- Set environment variable: `VITE_API_URL=https://your-backend-url.com`

### Backend
- Deploy to: Vercel, Railway, or any Node.js hosting
- Set all environment variables
- Ensure CORS is configured for frontend domain

## CORS Configuration
Backend needs to allow frontend origin:
```typescript
// backend/middleware/cors.ts
export const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.FRONTEND_URL || 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
```

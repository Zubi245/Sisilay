# Migration Guide: Separating Frontend & Backend

This guide will help you migrate from the current mixed architecture to a clean separation of frontend (Vite + React) and backend (Next.js API).

## Overview

### Current Structure
```
Sisilay/
├── src/backend/        # Backend code mixed with frontend
├── pages/              # Frontend pages
├── components/         # UI components
└── services/db.ts      # LocalStorage-based database
```

### Target Structure
```
frontend/               # Vite + React (port 3000)
└── src/
    ├── pages/
    ├── components/
    └── services/api.ts # API client

backend/                # Next.js API (port 3001)
└── app/api/           # REST API endpoints
```

## Step-by-Step Migration

### Phase 1: Backend Setup

#### 1. Create Backend Directory
```bash
mkdir backend
cd backend
```

#### 2. Initialize Next.js
```bash
npx create-next-app@latest . --typescript --app --no-src-dir
```

Or copy the provided `backend/package.json` and run:
```bash
npm install
```

#### 3. Copy Backend Files
Copy the following from `Sisilay/src/backend/` to `backend/`:
- `lib/` → `backend/lib/`
- `models/` → `backend/models/`
- `middleware/` → `backend/middleware/`
- API routes → `backend/app/api/`

#### 4. Set Up Environment Variables
Create `backend/.env`:
```env
MONGO_URI=mongodb://localhost:27017/sisilay
JWT_SECRET=your-super-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
FRONTEND_URL=http://localhost:3000
```

#### 5. Update Database Logic
Replace the LocalStorage-based `db.ts` with MongoDB operations:

**Before (LocalStorage):**
```typescript
export const db = {
  getProducts: () => JSON.parse(localStorage.getItem('products') || '[]'),
  addProduct: (product) => { /* ... */ }
};
```

**After (MongoDB):**
```typescript
import Product from '@/models/product';

export const getProducts = async () => {
  await connectDB();
  return await Product.find({ enabled: true });
};
```

#### 6. Start Backend
```bash
cd backend
npm run dev
```

Backend will run on `http://localhost:3001`

### Phase 2: Frontend Setup

#### 1. Create Frontend Directory
```bash
mkdir frontend
cd frontend
```

#### 2. Copy Frontend Files
Copy from `Sisilay/` to `frontend/`:
```bash
# Copy source files
cp -r Sisilay/components frontend/src/
cp -r Sisilay/pages frontend/src/
cp -r Sisilay/context frontend/src/
cp Sisilay/types.ts frontend/src/
cp Sisilay/index.tsx frontend/src/
cp Sisilay/index.css frontend/src/

# Copy config files
cp Sisilay/vite.config.ts frontend/
cp Sisilay/tsconfig.json frontend/
cp Sisilay/package.json frontend/
```

#### 3. Install Dependencies
```bash
cd frontend
npm install axios
```

#### 4. Create API Service
Create `frontend/src/services/api.ts` (already provided in this migration).

#### 5. Set Up Environment Variables
Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:3001
```

#### 6. Update Frontend Pages

Replace direct `db.*` calls with API calls:

**Before:**
```typescript
import { db } from '../services/db';

const products = db.getProducts();
```

**After:**
```typescript
import { getProducts } from '../services/api';

const products = await getProducts();
```

#### 7. Update Login Page
Replace localStorage auth check with JWT token:

**Before:**
```typescript
if (username === 'admin' && password === 'password') {
  localStorage.setItem('sam_fabrics_admin', 'true');
  navigate('/admin');
}
```

**After:**
```typescript
try {
  await login(username, password);
  navigate('/admin');
} catch (error) {
  setError('Invalid credentials');
}
```

#### 8. Start Frontend
```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:3000`

### Phase 3: Update All Pages

#### Pages to Update:

1. **Home.tsx**
   - Replace: `db.getEnabledProducts()` → `await getProducts()`
   - Replace: `db.getHeroSlides()` → `await getHeroSlides()`

2. **Shop.tsx**
   - Replace: `db.getEnabledProducts()` → `await getProducts()`

3. **ProductDetail.tsx**
   - Replace: `db.getProducts().find(...)` → `await getProduct(id)`

4. **Cart.tsx** / **Checkout.tsx**
   - Replace: `db.addOrder(order)` → `await createOrder(order)`

5. **Login.tsx**
   - Replace: Hardcoded check → `await login(username, password)`

6. **AdminDashboard.tsx**
   - Replace: `db.getProducts()` → `await getAdminProducts()`
   - Replace: `db.addProduct(product)` → `await createProduct(product)`
   - Replace: `db.updateProduct(id, data)` → `await updateProduct(id, data)`
   - Replace: `db.deleteProduct(id)` → `await deleteProduct(id)`
   - Replace: `db.getOrders()` → `await getAdminOrders()`
   - Replace: `db.updateOrderStatus(id, status)` → `await updateOrderStatus(id, status)`

### Phase 4: Testing

#### 1. Test Backend Endpoints
```bash
# Test products endpoint
curl http://localhost:3001/api/products

# Test login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}'

# Test admin endpoint (with token)
curl http://localhost:3001/api/admin/products \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### 2. Test Frontend
1. Open `http://localhost:3000`
2. Browse products
3. Test login at `/login`
4. Test admin dashboard at `/admin`
5. Create/edit/delete products
6. Place test orders

### Phase 5: Deployment

#### Backend Deployment (Vercel)
```bash
cd backend
vercel
```

Set environment variables in Vercel dashboard:
- `MONGO_URI`
- `JWT_SECRET`
- `CLOUDINARY_*`
- `FRONTEND_URL` (your frontend domain)

#### Frontend Deployment (Vercel/Netlify)
```bash
cd frontend
npm run build
vercel
```

Set environment variable:
- `VITE_API_URL` (your backend domain)

## API Endpoints Reference

### Public Endpoints
- `GET /api/products` - Get all enabled products
- `GET /api/products/:id` - Get single product
- `GET /api/hero` - Get hero slides
- `POST /api/orders` - Create order
- `POST /api/auth/login` - Admin login

### Admin Endpoints (Requires JWT)
- `GET /api/admin/products` - Get all products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products` - Update product
- `DELETE /api/admin/products?id=:id` - Delete product
- `GET /api/admin/orders` - Get all orders
- `PATCH /api/admin/orders` - Update order status

## Common Issues & Solutions

### CORS Errors
**Problem:** Frontend can't access backend API

**Solution:** Ensure `next.config.js` has correct CORS headers:
```javascript
headers: [
  { key: 'Access-Control-Allow-Origin', value: 'http://localhost:3000' }
]
```

### Authentication Errors
**Problem:** Token not being sent

**Solution:** Check that token is stored and sent in headers:
```typescript
localStorage.setItem('auth_token', token);
// axios interceptor adds: Authorization: Bearer ${token}
```

### MongoDB Connection Issues
**Problem:** Can't connect to MongoDB

**Solution:** 
1. Ensure MongoDB is running: `mongod`
2. Check `MONGO_URI` in `.env`
3. Install MongoDB: https://www.mongodb.com/try/download/community

### Image Upload Issues
**Problem:** Images not uploading

**Solution:**
1. Set up Cloudinary account
2. Add credentials to backend `.env`
3. Or use local file storage temporarily

## Migration Checklist

- [ ] Backend setup complete
- [ ] MongoDB connected
- [ ] All API endpoints working
- [ ] Frontend setup complete
- [ ] API service created
- [ ] All pages updated to use API
- [ ] Authentication working
- [ ] Admin dashboard functional
- [ ] Orders working
- [ ] Product CRUD working
- [ ] Image uploads working
- [ ] Testing complete
- [ ] Ready for deployment

## Need Help?

If you encounter issues:
1. Check browser console for errors
2. Check backend logs
3. Verify environment variables
4. Test API endpoints with curl/Postman
5. Ensure both servers are running

## Next Steps

After migration:
1. Add loading states to all API calls
2. Add error handling and user feedback
3. Implement proper error boundaries
4. Add request caching (React Query)
5. Set up CI/CD pipeline
6. Add API rate limiting
7. Implement proper logging
8. Add API documentation (Swagger)

# Complete Folder Structure

## Backend (Next.js API - Port 3001)

```
backend/
├── app/
│   └── api/                           # API Routes
│       ├── products/
│       │   ├── route.ts              # GET /api/products
│       │   └── [id]/
│       │       └── route.ts          # GET /api/products/:id
│       ├── orders/
│       │   └── route.ts              # POST /api/orders
│       ├── hero/
│       │   └── route.ts              # GET /api/hero
│       ├── auth/
│       │   └── login/
│       │       └── route.ts          # POST /api/auth/login
│       └── admin/                     # Protected Admin Routes
│           ├── products/
│           │   └── route.ts          # GET, POST, PUT, DELETE /api/admin/products
│           └── orders/
│               └── route.ts          # GET, PATCH /api/admin/orders
│
├── lib/                               # Utilities
│   ├── db.ts                         # MongoDB connection
│   ├── auth.ts                       # JWT sign/verify, password hashing
│   └── cloudinary.ts                 # Image upload service
│
├── models/                            # Mongoose Models
│   ├── product.ts                    # Product schema
│   ├── order.ts                      # Order schema
│   ├── user.ts                       # User schema
│   └── heroSlide.ts                  # Hero slide schema
│
├── middleware/
│   └── auth.ts                       # JWT authentication middleware
│
├── .env                              # Environment variables
├── .env.example                      # Environment template
├── next.config.js                    # Next.js config (CORS)
├── package.json                      # Dependencies
└── tsconfig.json                     # TypeScript config
```

## Frontend (Vite + React - Port 3000)

```
frontend/
├── src/
│   ├── components/                   # UI Components (unchanged)
│   │   ├── ErrorBoundary.tsx
│   │   ├── Layout.tsx
│   │   ├── ProductCard.tsx
│   │   └── SEO.tsx
│   │
│   ├── pages/                        # React Pages (updated to use API)
│   │   ├── Home.tsx                 # Uses: getProducts(), getHeroSlides()
│   │   ├── Shop.tsx                 # Uses: getProducts()
│   │   ├── ProductDetail.tsx        # Uses: getProduct(id)
│   │   ├── Cart.tsx                 # Uses: CartContext
│   │   ├── Checkout.tsx             # Uses: createOrder()
│   │   ├── Login.tsx                # Uses: login()
│   │   ├── AdminDashboard.tsx       # Uses: getAdminProducts(), etc.
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   │
│   ├── context/                      # React Context
│   │   └── CartContext.tsx          # Shopping cart state
│   │
│   ├── services/                     # API Layer
│   │   └── api.ts                   # ⭐ Centralized API client
│   │                                 # - axios instance
│   │                                 # - All API functions
│   │                                 # - Token management
│   │                                 # - Error handling
│   │
│   ├── hooks/                        # Custom React Hooks (optional)
│   │   ├── useProducts.ts
│   │   └── useAuth.ts
│   │
│   ├── types.ts                      # TypeScript types
│   ├── index.tsx                     # App entry point
│   └── index.css                     # Global styles
│
├── public/                           # Static assets
│   └── assets/
│
├── .env                              # Environment variables
├── .env.example                      # Environment template
├── vite.config.ts                    # Vite configuration
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
└── tailwind.config.js                # Tailwind CSS config
```

## Documentation

```
project-root/
├── PROJECT_SEPARATION_PLAN.md        # Architecture overview
├── MIGRATION_GUIDE.md                # Step-by-step migration
├── API_DOCUMENTATION.md              # Complete API reference
├── README_SEPARATION.md              # Quick start guide
└── FOLDER_STRUCTURE.md               # This file
```

## Key Files Explained

### Backend

#### `app/api/products/route.ts`
```typescript
// Public endpoint - Get all enabled products
export async function GET(request: NextRequest) {
  await connectDB();
  const products = await Product.find({ enabled: true });
  return NextResponse.json({ success: true, data: products });
}
```

#### `app/api/admin/products/route.ts`
```typescript
// Protected endpoint - Requires JWT
export const GET = withAuth(async (request: NextRequest) => {
  await connectDB();
  const products = await Product.find({});
  return NextResponse.json({ success: true, data: products });
});
```

#### `lib/auth.ts`
```typescript
// JWT utilities
export function signToken(payload: TokenPayload): string;
export function verifyToken(token: string): TokenPayload;
export async function hashPassword(password: string): Promise<string>;
export async function comparePassword(password: string, hash: string): Promise<boolean>;
```

#### `models/product.ts`
```typescript
// Mongoose schema
const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  // ... more fields
});
```

### Frontend

#### `src/services/api.ts` ⭐ Most Important File
```typescript
// Centralized API client
const API_URL = import.meta.env.VITE_API_URL;

// Public API
export const getProducts = async () => { /* ... */ };
export const getProduct = async (id: string) => { /* ... */ };
export const createOrder = async (order: Order) => { /* ... */ };

// Auth API
export const login = async (username: string, password: string) => { /* ... */ };

// Admin API (requires token)
export const getAdminProducts = async () => { /* ... */ };
export const createProduct = async (product: Product) => { /* ... */ };
export const updateProduct = async (id: string, data: Partial<Product>) => { /* ... */ };
export const deleteProduct = async (id: string) => { /* ... */ };
```

#### `src/pages/Home.tsx`
```typescript
// Before: Direct localStorage access
const products = db.getProducts();

// After: API call
const products = await getProducts();
```

#### `src/pages/Login.tsx`
```typescript
// Before: Hardcoded check
if (username === 'admin' && password === 'password') {
  localStorage.setItem('sam_fabrics_admin', 'true');
}

// After: API authentication
const { token, user } = await login(username, password);
// Token automatically stored by api.ts
```

## Data Flow

### Public User Flow
```
User Browser
    ↓
Frontend (React)
    ↓ HTTP Request
Backend API (/api/products)
    ↓
MongoDB
    ↓
Backend API (Response)
    ↓
Frontend (Display)
```

### Admin Flow
```
Admin Browser
    ↓
Login Page → POST /api/auth/login
    ↓
Backend verifies credentials
    ↓
Returns JWT token
    ↓
Token stored in localStorage
    ↓
Admin Dashboard → GET /api/admin/products
    ↓ (with Authorization: Bearer token)
Backend verifies token
    ↓
Returns all products
    ↓
Admin can CRUD products
```

## Environment Variables

### Backend `.env`
```env
# Database
MONGO_URI=mongodb://localhost:27017/sisilay

# Authentication
JWT_SECRET=your-super-secret-key-change-this

# Image Upload (Optional)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# CORS
FRONTEND_URL=http://localhost:3000
```

### Frontend `.env`
```env
# Backend API URL
VITE_API_URL=http://localhost:3001
```

## Port Configuration

| Service | Port | URL |
|---------|------|-----|
| Frontend | 3000 | http://localhost:3000 |
| Backend API | 3001 | http://localhost:3001 |
| MongoDB | 27017 | mongodb://localhost:27017 |

## Dependencies

### Backend
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "mongoose": "^8.0.0",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "cloudinary": "^1.41.0"
  }
}
```

### Frontend
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.0",
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.292.0"
  }
}
```

## File Sizes (Approximate)

```
backend/
├── app/api/              ~15 files, ~2KB each
├── lib/                  3 files, ~1KB each
├── models/               4 files, ~1KB each
└── middleware/           1 file, ~0.5KB

frontend/
├── src/components/       ~5 files, ~2-5KB each
├── src/pages/           ~10 files, ~5-20KB each
└── src/services/api.ts   1 file, ~5KB
```

## Migration Checklist

- [ ] Backend folder created
- [ ] Backend dependencies installed
- [ ] MongoDB running
- [ ] Backend .env configured
- [ ] Backend server starts successfully
- [ ] API endpoints tested with curl/Postman
- [ ] Frontend folder created
- [ ] Frontend dependencies installed
- [ ] Frontend .env configured
- [ ] api.ts service created
- [ ] All pages updated to use API
- [ ] Frontend server starts successfully
- [ ] Login works
- [ ] Products display
- [ ] Admin dashboard functional
- [ ] Orders can be created
- [ ] Ready for deployment

## Quick Commands

```bash
# Start Backend
cd backend && npm run dev

# Start Frontend
cd frontend && npm run dev

# Test API
curl http://localhost:3001/api/products

# Build for Production
cd backend && npm run build
cd frontend && npm run build
```

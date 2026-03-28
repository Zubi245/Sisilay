# API Documentation

Base URL: `http://localhost:3001` (development) or `https://your-backend.vercel.app` (production)

## Authentication

Most admin endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

Get token from `/api/auth/login` endpoint.

---

## Public Endpoints

### Products

#### Get All Products
```http
GET /api/products
```

**Query Parameters:**
- `category` (optional) - Filter by category
- `featured` (optional) - Filter featured products (true/false)
- `pageType` (optional) - Filter by page type (hero/home/shop)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Midnight Velvet Luxury",
      "description": "A stunning black velvet suit...",
      "price": 8500,
      "salePrice": 7999,
      "category": "Velvet",
      "fabric": "Premium Velvet",
      "images": ["https://..."],
      "pageType": "shop",
      "featured": true,
      "sortOrder": 0,
      "enabled": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get Single Product
```http
GET /api/products/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Midnight Velvet Luxury",
    ...
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Product not found"
}
```

---

### Hero Slides

#### Get Hero Slides
```http
GET /api/hero
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "New Arrivals 2024",
      "subtitle": "Discover the latest collection",
      "image": "https://...",
      "sortOrder": 0,
      "enabled": true
    }
  ]
}
```

---

### Orders

#### Create Order
```http
POST /api/orders
```

**Request Body:**
```json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+92-300-1234567",
  "shippingAddress": "123 Main St",
  "city": "Karachi",
  "postalCode": "75500",
  "items": [
    {
      "productId": "507f1f77bcf86cd799439011",
      "name": "Midnight Velvet Luxury",
      "price": 7999,
      "quantity": 2,
      "image": "https://..."
    }
  ],
  "total": 15998
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "customerName": "John Doe",
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00.000Z",
    ...
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Missing required fields"
}
```

---

## Authentication Endpoints

### Login
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "username": "admin",
  "password": "password"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "username": "admin",
      "email": "admin@sisilay.com",
      "role": "admin"
    }
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

---

## Admin Endpoints

**All admin endpoints require JWT authentication.**

### Admin Products

#### Get All Products (Including Disabled)
```http
GET /api/admin/products
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [...]
}
```

#### Create Product
```http
POST /api/admin/products
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 5000,
  "salePrice": 4500,
  "category": "Lawn",
  "fabric": "Premium Lawn",
  "images": ["https://..."],
  "pageType": "shop",
  "featured": false,
  "sortOrder": 0,
  "enabled": true
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    ...
  }
}
```

#### Update Product
```http
PUT /api/admin/products
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Updated Product Name",
  "price": 6000,
  ...
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    ...
  }
}
```

#### Delete Product
```http
DELETE /api/admin/products?id=507f1f77bcf86cd799439011
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Product deleted"
}
```

---

### Admin Orders

#### Get All Orders
```http
GET /api/admin/orders
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "customerName": "John Doe",
      "status": "pending",
      "total": 15998,
      ...
    }
  ]
}
```

#### Update Order Status
```http
PATCH /api/admin/orders
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "id": "507f1f77bcf86cd799439012",
  "status": "processing"
}
```

**Valid Status Values:**
- `pending`
- `processing`
- `shipped`
- `delivered`
- `cancelled`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "status": "processing",
    ...
  }
}
```

---

## Error Responses

All endpoints follow a consistent error response format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## Frontend Integration Examples

### Using Axios (Recommended)

```typescript
import axios from 'axios';

const API_URL = 'http://localhost:3001';

// Get products
const products = await axios.get(`${API_URL}/api/products`);

// Create order
const order = await axios.post(`${API_URL}/api/orders`, orderData);

// Admin: Get products with auth
const token = localStorage.getItem('auth_token');
const adminProducts = await axios.get(`${API_URL}/api/admin/products`, {
  headers: { Authorization: `Bearer ${token}` }
});
```

### Using Fetch

```typescript
// Get products
const response = await fetch('http://localhost:3001/api/products');
const data = await response.json();

// Create order
const response = await fetch('http://localhost:3001/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(orderData)
});

// Admin: Get products with auth
const token = localStorage.getItem('auth_token');
const response = await fetch('http://localhost:3001/api/admin/products', {
  headers: { Authorization: `Bearer ${token}` }
});
```

---

## Rate Limiting

Currently no rate limiting is implemented. Consider adding rate limiting in production:

```typescript
// Example with express-rate-limit
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

---

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:3000` (development)
- Your production frontend URL (set via `FRONTEND_URL` env variable)

If you need to add more origins, update `next.config.js`:

```javascript
headers: [
  { 
    key: 'Access-Control-Allow-Origin', 
    value: process.env.FRONTEND_URL || 'http://localhost:3000' 
  }
]
```

---

## Testing with cURL

### Get Products
```bash
curl http://localhost:3001/api/products
```

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}'
```

### Create Product (Admin)
```bash
curl -X POST http://localhost:3001/api/admin/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Test Product",
    "description": "Test description",
    "price": 5000,
    "category": "Lawn",
    "fabric": "Cotton",
    "images": [],
    "pageType": "shop",
    "enabled": true
  }'
```

---

## Postman Collection

Import this collection into Postman for easy testing:

```json
{
  "info": {
    "name": "Sisilay API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get Products",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/api/products"
      }
    },
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "url": "{{baseUrl}}/api/auth/login",
        "body": {
          "mode": "raw",
          "raw": "{\"username\":\"admin\",\"password\":\"password\"}"
        }
      }
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3001"
    }
  ]
}
```

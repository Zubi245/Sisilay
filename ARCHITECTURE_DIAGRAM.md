# Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                                 │
│                      http://localhost:3000                           │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │
┌────────────────────────────▼────────────────────────────────────────┐
│                    FRONTEND (Vite + React)                           │
│                         Port 3000                                    │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │
│  │    Home     │  │    Shop     │  │   Product   │                │
│  │    Page     │  │    Page     │  │   Detail    │                │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘                │
│         │                │                │                         │
│         └────────────────┼────────────────┘                         │
│                          │                                          │
│  ┌─────────────┐  ┌──────▼──────┐  ┌─────────────┐                │
│  │    Cart     │  │   api.ts    │  │    Login    │                │
│  │   Context   │  │  (Axios)    │  │    Page     │                │
│  └─────────────┘  └──────┬──────┘  └──────┬──────┘                │
│                          │                │                         │
│                          │  ┌─────────────▼─────────────┐          │
│                          │  │    Admin Dashboard        │          │
│                          │  │  (Protected by JWT)       │          │
│                          │  └───────────────────────────┘          │
│                          │                                          │
└──────────────────────────┼──────────────────────────────────────────┘
                           │
                           │ HTTP/REST API
                           │ (JSON)
                           │
┌──────────────────────────▼──────────────────────────────────────────┐
│                    BACKEND (Next.js API)                             │
│                         Port 3001                                    │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    API Routes                                 │  │
│  │                                                               │  │
│  │  PUBLIC ROUTES                                                │  │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐ │  │
│  │  │ GET /products  │  │ GET /hero      │  │ POST /orders   │ │  │
│  │  └────────────────┘  └────────────────┘  └────────────────┘ │  │
│  │                                                               │  │
│  │  AUTH ROUTES                                                  │  │
│  │  ┌────────────────┐                                          │  │
│  │  │ POST /login    │                                          │  │
│  │  └────────────────┘                                          │  │
│  │                                                               │  │
│  │  ADMIN ROUTES (JWT Protected)                                │  │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐ │  │
│  │  │ CRUD Products  │  │ GET Orders     │  │ PATCH Orders   │ │  │
│  │  └────────────────┘  └────────────────┘  └────────────────┘ │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                          │                                          │
│  ┌──────────────────────▼──────────────────────────────────────┐  │
│  │                   Middleware                                 │  │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐ │  │
│  │  │ CORS Handler   │  │ JWT Verifier   │  │ Error Handler  │ │  │
│  │  └────────────────┘  └────────────────┘  └────────────────┘ │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                          │                                          │
│  ┌──────────────────────▼──────────────────────────────────────┐  │
│  │                   Services                                   │  │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐ │  │
│  │  │ Auth Service   │  │ DB Connection  │  │ Cloudinary     │ │  │
│  │  │ (JWT, bcrypt)  │  │ (Mongoose)     │  │ (Images)       │ │  │
│  │  └────────────────┘  └────────┬───────┘  └────────────────┘ │  │
│  └──────────────────────────────┼──────────────────────────────┘  │
│                                  │                                  │
└──────────────────────────────────┼──────────────────────────────────┘
                                   │
                                   │
┌──────────────────────────────────▼──────────────────────────────────┐
│                         MongoDB Database                             │
│                      mongodb://localhost:27017                       │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │
│  │  Products   │  │   Orders    │  │    Users    │                │
│  │ Collection  │  │ Collection  │  │ Collection  │                │
│  └─────────────┘  └─────────────┘  └─────────────┘                │
│                                                                      │
│  ┌─────────────┐                                                    │
│  │ Hero Slides │                                                    │
│  │ Collection  │                                                    │
│  └─────────────┘                                                    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

## Request Flow Diagrams

### 1. Public User - Browse Products

```
┌──────┐                ┌──────────┐              ┌─────────┐           ┌──────────┐
│ User │                │ Frontend │              │ Backend │           │ MongoDB  │
└───┬──┘                └────┬─────┘              └────┬────┘           └────┬─────┘
    │                        │                         │                     │
    │  Visit /shop           │                         │                     │
    ├───────────────────────>│                         │                     │
    │                        │                         │                     │
    │                        │  GET /api/products      │                     │
    │                        ├────────────────────────>│                     │
    │                        │                         │                     │
    │                        │                         │  Find enabled       │
    │                        │                         │  products           │
    │                        │                         ├────────────────────>│
    │                        │                         │                     │
    │                        │                         │  Return products    │
    │                        │                         │<────────────────────┤
    │                        │                         │                     │
    │                        │  JSON Response          │                     │
    │                        │<────────────────────────┤                     │
    │                        │                         │                     │
    │  Display Products      │                         │                     │
    │<───────────────────────┤                         │                     │
    │                        │                         │                     │
```

### 2. Admin - Login Flow

```
┌───────┐              ┌──────────┐              ┌─────────┐           ┌──────────┐
│ Admin │              │ Frontend │              │ Backend │           │ MongoDB  │
└───┬───┘              └────┬─────┘              └────┬────┘           └────┬─────┘
    │                       │                         │                     │
    │  Enter credentials    │                         │                     │
    ├──────────────────────>│                         │                     │
    │                       │                         │                     │
    │                       │  POST /api/auth/login   │                     │
    │                       │  {username, password}   │                     │
    │                       ├────────────────────────>│                     │
    │                       │                         │                     │
    │                       │                         │  Find user          │
    │                       │                         ├────────────────────>│
    │                       │                         │                     │
    │                       │                         │  Return user        │
    │                       │                         │<────────────────────┤
    │                       │                         │                     │
    │                       │                         │  Verify password    │
    │                       │                         │  (bcrypt.compare)   │
    │                       │                         │                     │
    │                       │                         │  Generate JWT       │
    │                       │                         │  (jwt.sign)         │
    │                       │                         │                     │
    │                       │  {token, user}          │                     │
    │                       │<────────────────────────┤                     │
    │                       │                         │                     │
    │                       │  Store token in         │                     │
    │                       │  localStorage           │                     │
    │                       │                         │                     │
    │  Redirect to /admin   │                         │                     │
    │<──────────────────────┤                         │                     │
    │                       │                         │                     │
```

### 3. Admin - Create Product

```
┌───────┐              ┌──────────┐              ┌─────────┐           ┌──────────┐
│ Admin │              │ Frontend │              │ Backend │           │ MongoDB  │
└───┬───┘              └────┬─────┘              └────┬────┘           └────┬─────┘
    │                       │                         │                     │
    │  Fill product form    │                         │                     │
    ├──────────────────────>│                         │                     │
    │                       │                         │                     │
    │                       │  POST /api/admin/products                     │
    │                       │  Authorization: Bearer token                  │
    │                       │  {product data}         │                     │
    │                       ├────────────────────────>│                     │
    │                       │                         │                     │
    │                       │                         │  Verify JWT         │
    │                       │                         │  (middleware)       │
    │                       │                         │                     │
    │                       │                         │  Create product     │
    │                       │                         ├────────────────────>│
    │                       │                         │                     │
    │                       │                         │  Return new product │
    │                       │                         │<────────────────────┤
    │                       │                         │                     │
    │                       │  {success, data}        │                     │
    │                       │<────────────────────────┤                     │
    │                       │                         │                     │
    │  Show success message │                         │                     │
    │<──────────────────────┤                         │                     │
    │                       │                         │                     │
```

### 4. Customer - Place Order

```
┌──────────┐           ┌──────────┐              ┌─────────┐           ┌──────────┐
│ Customer │           │ Frontend │              │ Backend │           │ MongoDB  │
└────┬─────┘           └────┬─────┘              └────┬────┘           └────┬─────┘
     │                      │                         │                     │
     │  Add items to cart   │                         │                     │
     ├─────────────────────>│                         │                     │
     │                      │                         │                     │
     │  Proceed to checkout │                         │                     │
     ├─────────────────────>│                         │                     │
     │                      │                         │                     │
     │  Fill shipping info  │                         │                     │
     ├─────────────────────>│                         │                     │
     │                      │                         │                     │
     │                      │  POST /api/orders       │                     │
     │                      │  {order data}           │                     │
     │                      ├────────────────────────>│                     │
     │                      │                         │                     │
     │                      │                         │  Validate order     │
     │                      │                         │                     │
     │                      │                         │  Create order       │
     │                      │                         ├────────────────────>│
     │                      │                         │                     │
     │                      │                         │  Return order       │
     │                      │                         │<────────────────────┤
     │                      │                         │                     │
     │                      │  {success, data}        │                     │
     │                      │<────────────────────────┤                     │
     │                      │                         │                     │
     │  Show confirmation   │                         │                     │
     │<─────────────────────┤                         │                     │
     │                      │                         │                     │
```

## Data Models

### Product Model
```
┌─────────────────────────────────┐
│          Product                │
├─────────────────────────────────┤
│ _id: ObjectId                   │
│ name: String                    │
│ description: String             │
│ price: Number                   │
│ salePrice?: Number              │
│ category: String                │
│ fabric: String                  │
│ images: String[]                │
│ pageType: 'hero'|'home'|'shop'  │
│ featured: Boolean               │
│ sortOrder: Number               │
│ enabled: Boolean                │
│ createdAt: Date                 │
│ updatedAt: Date                 │
└─────────────────────────────────┘
```

### Order Model
```
┌─────────────────────────────────┐
│           Order                 │
├─────────────────────────────────┤
│ _id: ObjectId                   │
│ customerName: String            │
│ customerEmail: String           │
│ customerPhone: String           │
│ shippingAddress: String         │
│ city: String                    │
│ postalCode: String              │
│ items: OrderItem[]              │
│ total: Number                   │
│ status: OrderStatus             │
│ createdAt: Date                 │
│ updatedAt: Date                 │
└─────────────────────────────────┘
         │
         │ has many
         ▼
┌─────────────────────────────────┐
│        OrderItem                │
├─────────────────────────────────┤
│ productId: String               │
│ name: String                    │
│ price: Number                   │
│ quantity: Number                │
│ image: String                   │
└─────────────────────────────────┘
```

### User Model
```
┌─────────────────────────────────┐
│            User                 │
├─────────────────────────────────┤
│ _id: ObjectId                   │
│ username: String (unique)       │
│ password: String (hashed)       │
│ email: String (unique)          │
│ role: 'admin' | 'user'          │
│ createdAt: Date                 │
│ updatedAt: Date                 │
└─────────────────────────────────┘
```

## Technology Stack

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                             │
├─────────────────────────────────────────────────────────────┤
│  Framework:     Vite + React 18                             │
│  Language:      TypeScript                                  │
│  HTTP Client:   Axios                                       │
│  Routing:       React Router v6                            │
│  Styling:       Tailwind CSS                                │
│  Animation:     Framer Motion                               │
│  Icons:         Lucide React                                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                        Backend                              │
├─────────────────────────────────────────────────────────────┤
│  Framework:     Next.js 14 (App Router)                     │
│  Language:      TypeScript                                  │
│  Database:      MongoDB                                     │
│  ODM:           Mongoose                                    │
│  Auth:          JWT (jsonwebtoken)                          │
│  Password:      bcryptjs                                    │
│  Images:        Cloudinary                                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      Infrastructure                         │
├─────────────────────────────────────────────────────────────┤
│  Database:      MongoDB (local or Atlas)                    │
│  Storage:       Cloudinary (images)                         │
│  Deployment:    Vercel (both frontend & backend)            │
│  Version:       Git                                         │
└─────────────────────────────────────────────────────────────┘
```

## Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Security Layers                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Layer 1: CORS                                              │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ Only allow requests from configured frontend URL      │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  Layer 2: JWT Authentication                                │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ Verify token on protected routes                      │ │
│  │ Check token expiry (7 days)                           │ │
│  │ Validate token signature                              │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  Layer 3: Role-Based Access                                 │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ Check user role (admin required for admin routes)     │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  Layer 4: Password Security                                 │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ Hash passwords with bcrypt (10 rounds)                │ │
│  │ Never store plain text passwords                      │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  Layer 5: Input Validation                                  │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ Validate all request data                             │ │
│  │ Sanitize user inputs                                  │ │
│  │ Check required fields                                 │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Production                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Frontend (Vercel)                                          │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ https://sisilay-frontend.vercel.app                   │ │
│  │ - Static build                                         │ │
│  │ - CDN distribution                                     │ │
│  │ - Auto SSL                                             │ │
│  └───────────────────────────────────────────────────────┘ │
│                          │                                  │
│                          │ HTTPS                            │
│                          ▼                                  │
│  Backend (Vercel)                                           │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ https://sisilay-backend.vercel.app                    │ │
│  │ - Serverless functions                                │ │
│  │ - Auto scaling                                         │ │
│  │ - Auto SSL                                             │ │
│  └───────────────────────────────────────────────────────┘ │
│                          │                                  │
│                          │ MongoDB Protocol                 │
│                          ▼                                  │
│  Database (MongoDB Atlas)                                   │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ mongodb+srv://cluster.mongodb.net                     │ │
│  │ - Managed service                                      │ │
│  │ - Auto backups                                         │ │
│  │ - Replication                                          │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

This architecture provides a clean, scalable, and secure separation between your frontend and backend!

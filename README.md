# Sisilay - E-commerce Platform (Separated Architecture)

A modern e-commerce platform for luxury unstitched suits, built with a clean separation between frontend and backend.

## 🏗️ Architecture

This project demonstrates a professional separation of concerns:

- **Frontend**: Vite + React (Client-only, Port 3000)
- **Backend**: Next.js API (Server-only, Port 3001)
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT-based auth system

## 📁 Project Structure

```
├── backend/              # Next.js API Server
│   ├── app/api/         # REST API endpoints
│   ├── lib/             # Utilities (DB, Auth, Cloudinary)
│   ├── models/          # Mongoose schemas
│   └── middleware/      # Authentication middleware
│
├── frontend/            # Vite + React App
│   └── src/
│       ├── components/  # UI components
│       ├── pages/       # React pages
│       └── services/    # API client
│
└── Documentation/       # Complete guides
    ├── INDEX.md        # Start here!
    └── ...             # 7 more guides
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Git

### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/sisilay.git
cd sisilay
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and secrets
npm run dev  # Starts on port 3001
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with backend URL
npm run dev  # Starts on port 3000
```

### 4. Access Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **Admin Login**: http://localhost:3000/login
  - Username: `admin`
  - Password: `password`

## 📚 Documentation

**Start Here**: [Documentation/INDEX.md](./INDEX.md)

### Quick Links
- [Quick Start Guide](./README_SEPARATION.md)
- [Migration Guide](./MIGRATION_GUIDE.md)
- [API Documentation](./API_DOCUMENTATION.md)
- [Architecture Diagrams](./ARCHITECTURE_DIAGRAM.md)
- [Folder Structure](./FOLDER_STRUCTURE.md)

## 🔑 Key Features

### Backend API
- ✅ RESTful API with 11 endpoints
- ✅ JWT authentication
- ✅ MongoDB integration
- ✅ Password hashing (bcrypt)
- ✅ Image upload (Cloudinary)
- ✅ CORS configured
- ✅ TypeScript support

### Frontend
- ✅ Modern React 18
- ✅ Centralized API service
- ✅ Token management
- ✅ Responsive design
- ✅ Tailwind CSS
- ✅ TypeScript support

## 🛠️ Tech Stack

### Frontend
- **Framework**: Vite + React 18
- **Language**: TypeScript
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React

### Backend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password**: bcryptjs
- **Images**: Cloudinary

## 📡 API Endpoints

### Public
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/hero` - Get hero slides
- `POST /api/orders` - Create order
- `POST /api/auth/login` - Admin login

### Admin (JWT Required)
- `GET /api/admin/products` - Get all products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products` - Update product
- `DELETE /api/admin/products` - Delete product
- `GET /api/admin/orders` - Get all orders
- `PATCH /api/admin/orders` - Update order status

## 🔐 Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb://localhost:27017/sisilay
JWT_SECRET=your-super-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001
```

## 🧪 Testing

### Test Backend
```bash
# Test products endpoint
curl http://localhost:3001/api/products

# Test login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}'
```

### Test Frontend
1. Visit http://localhost:3000
2. Browse products
3. Login at /login
4. Test admin dashboard

## 📦 Deployment

### Backend (Vercel)
```bash
cd backend
vercel
```

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
vercel
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Built with modern best practices
- Clean architecture principles
- API-first design
- Production-ready code

## 📞 Support

For detailed documentation, see [Documentation/INDEX.md](./INDEX.md)

For issues and questions, please open an issue on GitHub.

---

**⭐ Star this repo if you find it helpful!**

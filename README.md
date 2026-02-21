# Silsilay - E-commerce Store

A modern, responsive e-commerce platform for luxury unstitched ladies suits built with React, TypeScript, and Vite.

## Features

- 🛍️ **Full E-commerce Functionality**
  - Product browsing with filters (category, price range)
  - Product detail pages with image gallery
  - Shopping cart with persistent storage
  - Checkout process
  - Order management

- 👨‍💼 **Admin Dashboard**
  - Product management (add, edit, delete)
  - Image upload support
  - Price management (regular & sale prices)
  - Order management with status updates
  - Advanced filtering and search

- 🎨 **Modern UI/UX**
  - Responsive design (mobile, tablet, desktop)
  - Smooth animations and hover effects
  - Image lazy loading with fallbacks
  - Clean, luxury aesthetic

- 🔒 **Authentication**
  - Secure admin login
  - Protected admin routes

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API
- **Storage**: LocalStorage (can be migrated to backend)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd silsilay
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout with navbar & footer
│   ├── ProductCard.tsx # Product card component
│   └── SEO.tsx         # SEO meta tags component
├── pages/              # Page components
│   ├── Home.tsx        # Homepage
│   ├── Shop.tsx        # Product listing
│   ├── ProductDetail.tsx # Product detail page
│   ├── Cart.tsx        # Shopping cart
│   ├── Checkout.tsx    # Checkout page
│   ├── Login.tsx       # Admin login
│   └── AdminDashboard.tsx # Admin panel
├── context/            # React Context providers
│   └── CartContext.tsx # Shopping cart state
├── services/           # Business logic
│   └── db.ts          # Mock database (localStorage)
├── types.ts           # TypeScript type definitions
└── vite.config.ts     # Vite configuration

## Admin Access

- **URL**: `/login`
- **Username**: `admin`
- **Password**: `password`

After login, you'll be redirected to `/admin` where you can:
- Manage products (add, edit, delete)
- Upload product images
- Set prices and sale prices
- Manage orders and update status

## Production Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Deploy to Vercel/Netlify

1. Connect your repository to Vercel or Netlify
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy!

### Environment Variables (Optional)

If you plan to connect to a backend API, create a `.env` file:

```
VITE_API_URL=https://your-api-url.com
VITE_CLOUDINARY_URL=your-cloudinary-url
```

## Features in Detail

### Product Management
- Add products with images, prices, categories
- Edit existing products
- Delete products
- Set sale prices for discounts

### Order Management
- View all orders
- Filter by status, date range
- Search by customer name, email, or order ID
- Update order status (Pending, Processing, Shipped, Delivered)

### Shopping Experience
- Browse products by category
- Filter by price range
- View product details with image gallery
- Add to cart
- Secure checkout process

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private - All rights reserved

## Support

For support, email support@silsilay.com or contact via WhatsApp.

---

Built with ❤️ for Silsilay

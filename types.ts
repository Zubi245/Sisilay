// ================= HERO SLIDES =================

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  enabled: boolean;
  sortOrder: number;
  createdAt: string;
}

// ================= PRODUCTS =================

export interface Product {
  id: string;

  // Basic Info
  name: string;
  description: string;
  category: string;        // Lawn, Velvet, Chiffon etc
  fabric: string;

  // Pricing
  price: number;
  salePrice?: number;

  // Images (Uploaded files -> base64 / future cloud URLs)
  images: string[];

  // Page & Visibility Control (Admin Dashboard)
  page: 'home' | 'shop' | 'both';   // jahan product show hoga
  pageType: 'hero' | 'home' | 'shop'; // hero section ya normal
  featured: boolean;                // featured section ke liye
  sortOrder: number;                // homepage sorting priority
  enabled?: boolean;                 // visibility control

  // Meta
  createdAt: string;
}

// ================= CART =================

export interface CartItem extends Product {
  quantity: number;
}

// ================= ORDERS =================

export interface Order {
  id: string;

  // Customer Info
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;

  // Order Items
  items: CartItem[];

  // Pricing
  total: number;

  // Status
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';

  // Meta
  createdAt: string;
}

// ================= USERS =================

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}

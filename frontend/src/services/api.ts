import axios, { AxiosInstance, AxiosError } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('auth_token');
      localStorage.removeItem('sam_fabrics_admin');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Types
export interface Product {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  category: string;
  fabric: string;
  images: string[];
  page: string;
  pageType: 'hero' | 'home' | 'shop';
  featured: boolean;
  sortOrder: number;
  enabled: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Order {
  _id?: string;
  id?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  postalCode: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface HeroSlide {
  _id?: string;
  id?: string;
  title: string;
  subtitle: string;
  image: string;
  sortOrder: number;
  enabled: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// ============ PUBLIC API ============

// Products
export const getProducts = async (params?: {
  category?: string;
  featured?: boolean;
  pageType?: string;
}): Promise<Product[]> => {
  const response = await apiClient.get<ApiResponse<Product[]>>('/api/products', { params });
  return response.data.data || [];
};

export const getProduct = async (id: string): Promise<Product | null> => {
  try {
    const response = await apiClient.get<ApiResponse<Product>>(`/api/products/${id}`);
    return response.data.data || null;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
};

// Hero Slides
export const getHeroSlides = async (): Promise<HeroSlide[]> => {
  const response = await apiClient.get<ApiResponse<HeroSlide[]>>('/api/hero');
  return response.data.data || [];
};

// Orders
export const createOrder = async (order: Omit<Order, '_id' | 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
  const response = await apiClient.post<ApiResponse<Order>>('/api/orders', order);
  if (!response.data.success) {
    throw new Error(response.data.error || 'Failed to create order');
  }
  return response.data.data!;
};

// ============ AUTH API ============

export const login = async (username: string, password: string): Promise<{ token: string; user: any }> => {
  const response = await apiClient.post<ApiResponse<{ token: string; user: any }>>('/api/auth/login', {
    username,
    password,
  });
  
  if (!response.data.success) {
    throw new Error(response.data.error || 'Login failed');
  }

  const { token, user } = response.data.data!;
  
  // Store token
  localStorage.setItem('auth_token', token);
  localStorage.setItem('sam_fabrics_admin', 'true');
  
  return { token, user };
};

export const logout = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('sam_fabrics_admin');
};

// ============ ADMIN API ============

// Admin Products
export const getAdminProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get<ApiResponse<Product[]>>('/api/admin/products');
  return response.data.data || [];
};

export const createProduct = async (product: Omit<Product, '_id' | 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
  const response = await apiClient.post<ApiResponse<Product>>('/api/admin/products', product);
  if (!response.data.success) {
    throw new Error(response.data.error || 'Failed to create product');
  }
  return response.data.data!;
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
  const response = await apiClient.put<ApiResponse<Product>>('/api/admin/products', { id, ...product });
  if (!response.data.success) {
    throw new Error(response.data.error || 'Failed to update product');
  }
  return response.data.data!;
};

export const deleteProduct = async (id: string): Promise<void> => {
  const response = await apiClient.delete<ApiResponse<void>>(`/api/admin/products?id=${id}`);
  if (!response.data.success) {
    throw new Error(response.data.error || 'Failed to delete product');
  }
};

// Admin Orders
export const getAdminOrders = async (): Promise<Order[]> => {
  const response = await apiClient.get<ApiResponse<Order[]>>('/api/admin/orders');
  return response.data.data || [];
};

export const updateOrderStatus = async (id: string, status: Order['status']): Promise<Order> => {
  const response = await apiClient.patch<ApiResponse<Order>>('/api/admin/orders', { id, status });
  if (!response.data.success) {
    throw new Error(response.data.error || 'Failed to update order status');
  }
  return response.data.data!;
};

// Helper to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('auth_token');
};

export default apiClient;

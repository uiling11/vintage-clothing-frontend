export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'USER' | 'SELLER' | 'ADMIN';
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  brand?: string;
  size: string;
  color: string;
  condition: 'NEW_WITH_TAGS' | 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR';
  era?: string;
  status: 'ACTIVE' | 'SOLD';
  categoryId: number;
  category?: Category;
  images?: ProductImage[];
}

export interface ProductImage {
  id: number;
  url: string;
  isPrimary: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  _count?: { products: number };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
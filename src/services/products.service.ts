import api from './api';
import type { Product, PaginatedResponse, ApiResponse } from '@/types';

export interface ProductFilters {
  page?: number;
  limit?: number;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
  size?: string;
  search?: string;
}

export const productsService = {
  async getAll(filters: ProductFilters = {}): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, String(value));
    });
    const response = await api.get<PaginatedResponse<Product>>(`/products?${params}`);
    return response.data;
  },

  async getById(id: number): Promise<Product> {
    const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data.data;
  },

  async create(data: Partial<Product>): Promise<Product> {
    const response = await api.post<ApiResponse<Product>>('/products', data);
    return response.data.data;
  },

  async update(id: number, data: Partial<Product>): Promise<Product> {
    const response = await api.put<ApiResponse<Product>>(`/products/${id}`, data);
    return response.data.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/products/${id}`);
  },
};
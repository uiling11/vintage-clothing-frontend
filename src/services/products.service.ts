import api from './api';
import type { Product, PaginatedResponse } from '@/types';

export interface ProductFilters {
  page?: number;
  limit?: number;
  categoryId?: number;
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
};
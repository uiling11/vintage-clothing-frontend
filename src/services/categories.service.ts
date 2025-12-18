import api from './api';
import type { Category, ApiResponse } from '@/types';

export const categoriesService = {
  async getAll(): Promise<Category[]> {
    const response = await api.get<ApiResponse<Category[]>>('/categories');
    return response.data.data;
  },
};
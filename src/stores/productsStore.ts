import { create } from 'zustand';
import type { Product, Category } from '@/types';
import { productsService, ProductFilters } from '@/services/products.service';
import { categoriesService } from '@/services/categories.service';

interface ProductsState {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  filters: ProductFilters;
  pagination: {
    page: number;
    totalPages: number;
    total: number;
  };
  
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  setFilters: (filters: Partial<ProductFilters>) => void;
  resetFilters: () => void;
  deleteProduct: (id: number) => Promise<void>;
}

const initialFilters: ProductFilters = {
  page: 1,
  limit: 12,
};

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  categories: [],
  loading: false,
  error: null,
  filters: initialFilters,
  pagination: { page: 1, totalPages: 1, total: 0 },

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await productsService.getAll(get().filters);
      set({
        products: response.data,
        pagination: {
          page: response.pagination.page,
          totalPages: response.pagination.totalPages,
          total: response.pagination.total,
        },
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchCategories: async () => {
    try {
      const categories = await categoriesService.getAll();
      set({ categories });
    } catch (error: any) {
      console.error('Error fetching categories:', error);
    }
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
    get().fetchProducts();
  },

  resetFilters: () => {
    set({ filters: initialFilters });
    get().fetchProducts();
  },

  deleteProduct: async (id: number) => {
    try {
      await productsService.delete(id);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },
}));
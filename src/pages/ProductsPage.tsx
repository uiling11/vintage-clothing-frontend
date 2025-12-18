import React, { useEffect, useState } from 'react';
import { Button, Input, Loading } from '@/components/common';
import ProductCard from '@/components/products/ProductCard';
import type { Product, Category } from '@/types';
import { productsService, ProductFilters } from '@/services/products.service';
import { categoriesService } from '@/services/categories.service';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ProductFilters>({ page: 1, limit: 12 });
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    categoriesService.getAll().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    productsService.getAll(filters)
      .then(res => {
        setProducts(res.data);
        setTotalPages(res.pagination.totalPages);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="w-64 hidden md:block">
          <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
            <h3 className="font-semibold mb-4">Фільтри</h3>
            <Input
              placeholder="Пошук..."
              className="mb-4"
              onChange={(e) => setFilters(f => ({ ...f, search: e.target.value, page: 1 }))}
            />
            <h4 className="font-medium mb-2">Категорія</h4>
            <div className="space-y-2">
              <button
                onClick={() => setFilters(f => ({ ...f, categoryId: undefined, page: 1 }))}
                className={`block w-full text-left px-3 py-2 rounded-lg ${!filters.categoryId ? 'bg-primary-100 text-vintage-brown' : 'hover:bg-gray-100'}`}
              >
                Всі
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFilters(f => ({ ...f, categoryId: cat.id, page: 1 }))}
                  className={`block w-full text-left px-3 py-2 rounded-lg ${filters.categoryId === cat.id ? 'bg-primary-100 text-vintage-brown' : 'hover:bg-gray-100'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6">Каталог</h1>
          {loading ? (
            <Loading text="Завантаження..." />
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Товари не знайдено</p>
              <Button variant="outline" className="mt-4" onClick={() => setFilters({ page: 1, limit: 12 })}>
                Скинути
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => <ProductCard key={product.id} product={product} />)}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  <Button variant="outline" disabled={filters.page === 1} onClick={() => setFilters(f => ({ ...f, page: (f.page || 1) - 1 }))}>
                    Назад
                  </Button>
                  <span className="px-4 py-2">{filters.page} / {totalPages}</span>
                  <Button variant="outline" disabled={filters.page === totalPages} onClick={() => setFilters(f => ({ ...f, page: (f.page || 1) + 1 }))}>
                    Далі
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
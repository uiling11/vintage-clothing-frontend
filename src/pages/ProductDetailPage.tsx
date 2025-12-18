import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button, Badge, Loading } from '@/components/common';
import { productsService } from '@/services/products.service';
import { useAuthStore } from '@/stores/authStore';
import type { Product } from '@/types';

const conditionLabels: Record<string, string> = {
  NEW_WITH_TAGS: 'Новий з бірками',
  EXCELLENT: 'Відмінний',
  GOOD: 'Хороший',
  FAIR: 'Задовільний',
  POOR: 'Потребує ремонту',
};

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      productsService.getById(Number(id))
        .then(setProduct)
        .catch(() => toast.error('Товар не знайдено'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <Loading text="Завантаження..." />;
  if (!product) return <div className="text-center py-12">Товар не знайдено</div>;

  const image = product.images?.find(img => img.isPrimary) || product.images?.[0];
  const imageUrl = image?.url || 'https://via.placeholder.com/600x600?text=No+Image';

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-vintage-brown mb-6">
        <ArrowLeft className="w-5 h-5" /> Назад
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
          <img src={imageUrl} alt={product.title} className="w-full h-full object-cover" />
        </div>

        <div>
          <div className="flex gap-2 mb-4">
            <Badge variant={product.status === 'ACTIVE' ? 'success' : 'warning'}>
              {product.status === 'ACTIVE' ? 'В наявності' : 'Продано'}
            </Badge>
            <Badge>{conditionLabels[product.condition]}</Badge>
            {product.era && <Badge>{product.era}</Badge>}
          </div>

          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-vintage-brown">{product.price.toLocaleString()} ₴</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-400 line-through">{product.originalPrice.toLocaleString()} ₴</span>
            )}
          </div>

          <div className="space-y-3 mb-6">
            {product.brand && <p><strong>Бренд:</strong> {product.brand}</p>}
            <p><strong>Розмір:</strong> {product.size}</p>
            <p><strong>Колір:</strong> {product.color}</p>
            {product.material && <p><strong>Матеріал:</strong> {product.material}</p>}
            {product.category && <p><strong>Категорія:</strong> {product.category.name}</p>}
          </div>

          <p className="text-gray-600 mb-8">{product.description}</p>

          {product.status === 'ACTIVE' && (
            <div className="flex gap-4">
              <Button size="lg" className="flex-1" onClick={() => {
                if (!isAuthenticated) {
                  toast.error('Увійдіть, щоб додати в кошик');
                  navigate('/login');
                } else {
                  toast.success('Додано в кошик!');
                }
              }}>
                <ShoppingCart className="w-5 h-5 mr-2" /> В кошик
              </Button>
              <Button size="lg" variant="outline" onClick={() => {
                if (!isAuthenticated) {
                  toast.error('Увійдіть, щоб додати в улюблене');
                } else {
                  toast.success('Додано в улюблене!');
                }
              }}>
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Card, CardImage, CardContent, Badge } from '@/components/common';
import type { Product } from '@/types';

const conditionLabels: Record<string, { label: string; variant: 'success' | 'warning' | 'default' }> = {
  NEW_WITH_TAGS: { label: 'Новий', variant: 'success' },
  EXCELLENT: { label: 'Відмінний', variant: 'success' },
  GOOD: { label: 'Хороший', variant: 'default' },
  FAIR: { label: 'Задовільний', variant: 'warning' },
  POOR: { label: 'Потребує ремонту', variant: 'warning' },
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const condition = conditionLabels[product.condition] || { label: product.condition, variant: 'default' as const };
  const image = product.images?.find(img => img.isPrimary) || product.images?.[0];
  const imageUrl = image?.url || 'https://via.placeholder.com/400x400?text=No+Image';

  return (
    <Card>
      <div className="relative">
        <Link to={`/products/${product.id}`}>
          <CardImage src={imageUrl} alt={product.title} />
        </Link>
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform">
          <Heart className="w-5 h-5 text-gray-400" />
        </button>
        {product.status === 'SOLD' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-xl font-bold">ПРОДАНО</span>
          </div>
        )}
      </div>
      <CardContent>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-medium text-gray-900 hover:text-vintage-brown line-clamp-2 mb-2">{product.title}</h3>
        </Link>
        <div className="flex gap-2 mb-2">
          <Badge variant={condition.variant}>{condition.label}</Badge>
          {product.era && <Badge>{product.era}</Badge>}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-vintage-brown">{product.price.toLocaleString()} ₴</span>
          <span className="text-sm text-gray-500">{product.size}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
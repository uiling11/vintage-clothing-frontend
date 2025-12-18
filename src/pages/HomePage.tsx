import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Leaf } from 'lucide-react';
import { Button, Loading } from '@/components/common';
import ProductCard from '@/components/products/ProductCard';
import type { Product } from '@/types';
import { productsService } from '@/services/products.service';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsService.getAll({ limit: 8 })
      .then(res => setProducts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-100 to-primary-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
              Унікальний вінтажний одяг з історією
            </h1>
            <p className="text-lg text-primary-700 mb-8">
              Відкрийте для себе ексклюзивну колекцію вінтажного одягу.
            </p>
            <div className="flex gap-4">
              <Link to="/products">
                <Button size="lg">Каталог <ArrowRight className="w-5 h-5 ml-2" /></Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">Про нас</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          {[
            { icon: Truck, title: 'Безкоштовна доставка', desc: 'Від 1000 ₴' },
            { icon: Shield, title: 'Гарантія якості', desc: 'Перевіряємо кожну річ' },
            { icon: Leaf, title: 'Еко-свідомий вибір', desc: 'Друге життя речам' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl">
              <div className="p-3 bg-vintage-brown/10 rounded-full">
                <Icon className="w-6 h-6 text-vintage-brown" />
              </div>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Новинки</h2>
            <Link to="/products" className="text-vintage-brown hover:underline flex items-center">
              Всі товари <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          {loading ? (
            <Loading text="Завантаження..." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-vintage-brown text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Готові знайти свій стиль?</h2>
          <p className="mb-8 opacity-90">Приєднуйтесь до спільноти любителів вінтажу</p>
          <Link to="/register">
            <Button variant="secondary" size="lg" className="bg-white text-vintage-brown hover:bg-gray-100">
              Зареєструватися
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
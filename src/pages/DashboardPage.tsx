import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, Heart, Settings, Plus } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/common';

const DashboardPage: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  const menuItems = [
    { to: '/dashboard/orders', icon: ShoppingCart, title: 'Мої замовлення', desc: 'Переглянути історію замовлень' },
    { to: '/favorites', icon: Heart, title: 'Улюблене', desc: 'Збережені товари' },
    { to: '/dashboard/settings', icon: Settings, title: 'Налаштування', desc: 'Редагувати профіль' },
  ];

  const sellerItems = [
    { to: '/dashboard/my-products', icon: Package, title: 'Мої товари', desc: 'Управління товарами' },
    { to: '/dashboard/products/create', icon: Plus, title: 'Додати товар', desc: 'Створити новий товар' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Вітаємо, {user?.firstName}!
        </h1>
        <p className="text-gray-600 mt-2">
          Роль: {user?.role === 'ADMIN' ? 'Адміністратор' : user?.role === 'SELLER' ? 'Продавець' : 'Покупець'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map(({ to, icon: Icon, title, desc }) => (
          <Link
            key={to}
            to={to}
            className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow"
          >
            <Icon className="w-8 h-8 text-vintage-brown mb-4" />
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{desc}</p>
          </Link>
        ))}

        {(user?.role === 'SELLER' || user?.role === 'ADMIN') &&
          sellerItems.map(({ to, icon: Icon, title, desc }) => (
            <Link
              key={to}
              to={to}
              className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow border-2 border-vintage-brown/20"
            >
              <Icon className="w-8 h-8 text-vintage-brown mb-4" />
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </Link>
          ))}
      </div>

      {user?.role === 'ADMIN' && (
        <div className="mt-8 p-6 bg-primary-50 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Адмін панель</h2>
          <div className="flex gap-4">
            <Link to="/admin/users">
              <Button variant="outline">Користувачі</Button>
            </Link>
            <Link to="/admin/products">
              <Button variant="outline">Всі товари</Button>
            </Link>
            <Link to="/admin/orders">
              <Button variant="outline">Всі замовлення</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
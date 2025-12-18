import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, User, LogOut, Menu, X } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/common';
import toast from 'react-hot-toast';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Ви вийшли з акаунту');
    navigate('/');
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="bg-vintage-brown text-white text-sm py-2 text-center">
        🌟 Безкоштовна доставка від 1000 грн
      </div>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBag className="w-8 h-8 text-vintage-brown" />
            <span className="text-2xl font-bold text-vintage-brown">Vintage</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-vintage-brown">Головна</Link>
            <Link to="/products" className="text-gray-700 hover:text-vintage-brown">Каталог</Link>
            <Link to="/about" className="text-gray-700 hover:text-vintage-brown">Про нас</Link>
          </nav>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/favorites" className="p-2 hover:bg-gray-100 rounded-full">
                  <Heart className="w-5 h-5 text-gray-600" />
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full"
                  >
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="hidden lg:block text-sm">{user?.firstName}</span>
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                      <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsUserMenuOpen(false)}>
                        Мій кабінет
                      </Link>
                      <Link to="/dashboard/orders" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsUserMenuOpen(false)}>
                        Замовлення
                      </Link>
                      {(user?.role === 'SELLER' || user?.role === 'ADMIN') && (
                        <Link to="/dashboard/my-products" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsUserMenuOpen(false)}>
                          Мої товари
                        </Link>
                      )}
                      <hr className="my-2" />
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center gap-2">
                        <LogOut className="w-4 h-4" /> Вийти
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login"><Button variant="outline" size="sm">Увійти</Button></Link>
                <Link to="/register"><Button size="sm">Реєстрація</Button></Link>
              </div>
            )}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <Link to="/" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Головна</Link>
            <Link to="/products" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Каталог</Link>
            <Link to="/about" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Про нас</Link>
            {!isAuthenticated && (
              <div className="flex gap-2 pt-4 px-4">
                <Link to="/login" className="flex-1"><Button variant="outline" className="w-full">Увійти</Button></Link>
                <Link to="/register" className="flex-1"><Button className="w-full">Реєстрація</Button></Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import Button from '../common/Button';

interface HeaderProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLogout }) => {
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

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <Button variant="outline" size="sm" onClick={onLogout}>Вийти</Button>
            ) : (
              <>
                <Link to="/login"><Button variant="outline" size="sm">Увійти</Button></Link>
                <Link to="/register"><Button size="sm">Реєстрація</Button></Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import { ShoppingBag } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingBag className="w-8 h-8" />
          <span className="text-2xl font-bold">Vintage</span>
        </div>
        <p className="text-primary-200 mb-8">Унікальний вінтажний одяг з історією.</p>
        <div className="border-t border-primary-700 pt-8 text-center text-primary-300">
          &copy; {new Date().getFullYear()} Vintage Clothing
        </div>
      </div>
    </footer>
  );
};

export default Footer;
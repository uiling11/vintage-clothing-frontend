import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

interface LayoutProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ isAuthenticated, onLogout }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated={isAuthenticated} onLogout={onLogout} />
      <main className="flex-grow"><Outlet /></main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

export default Layout;
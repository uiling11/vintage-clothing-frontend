import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import {
  HomePage,
  ProductsPage,
  ProductDetailPage,
  ProductCreatePage,
  AboutPage,
  NotFoundPage,
  LoginPage,
  RegisterPage,
  DashboardPage,
} from '@/pages';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/auth.service';

const App: React.FC = () => {
  const { isAuthenticated, setUser, logout } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated) {
        try {
          const user = await authService.getMe();
          setUser(user);
        } catch {
          logout();
        }
      }
    };
    checkAuth();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth pages - без Layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Main pages - з Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="about" element={<AboutPage />} />

          {/* Protected routes */}
          <Route path="dashboard" element={
            <ProtectedRoute><DashboardPage /></ProtectedRoute>
          } />
          <Route path="dashboard/products/create" element={
            <ProtectedRoute roles={['SELLER', 'ADMIN']}><ProductCreatePage /></ProtectedRoute>
          } />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
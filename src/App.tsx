import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { HomePage, ProductsPage, AboutPage, NotFoundPage } from '@/pages';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => setIsAuthenticated(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout isAuthenticated={isAuthenticated} onLogout={handleLogout} />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
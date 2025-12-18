import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common';

const NotFoundPage: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center text-center">
    <div>
      <h1 className="text-9xl font-bold text-primary-200">404</h1>
      <h2 className="text-2xl font-bold mt-4">Сторінку не знайдено</h2>
      <p className="text-gray-600 mt-2 mb-8">Ця сторінка не існує</p>
      <Link to="/"><Button>На головну</Button></Link>
    </div>
  </div>
);

export default NotFoundPage;
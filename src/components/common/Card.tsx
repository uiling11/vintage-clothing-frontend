import React from 'react';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow ${className}`}>
    {children}
  </div>
);

export const CardImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <div className="aspect-square overflow-hidden">
    <img src={src} alt={alt} className="w-full h-full object-cover hover:scale-105 transition-transform" />
  </div>
);

export const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-4">{children}</div>
);
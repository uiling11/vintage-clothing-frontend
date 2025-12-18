import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
  children, variant = 'primary', size = 'md', className = '', ...props
}) => {
  const variants = {
    primary: 'bg-vintage-brown text-white hover:bg-primary-800',
    secondary: 'bg-primary-100 text-primary-900 hover:bg-primary-200',
    outline: 'border-2 border-vintage-brown text-vintage-brown hover:bg-vintage-brown hover:text-white',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`inline-flex items-center justify-center font-medium rounded-lg transition-all ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
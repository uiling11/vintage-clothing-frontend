import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import { loginSchema, LoginFormData } from '@/schemas/auth.schema';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/auth.service';
import { Button, FormInput } from '@/components/common';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);
  const from = (location.state as any)?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await authService.login(data);
      login(response.user, response.tokens);
      toast.success(`Вітаємо, ${response.user.firstName}!`);
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Помилка входу');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-vintage-brown">
            <ShoppingBag className="w-10 h-10" />
            <span className="text-3xl font-bold">Vintage</span>
          </Link>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Вхід в акаунт</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <FormInput
            label="Email"
            type="email"
            placeholder="your@email.com"
            register={register('email')}
            error={errors.email?.message}
          />

          <FormInput
            label="Пароль"
            type="password"
            placeholder="••••••••"
            register={register('password')}
            error={errors.password?.message}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Вхід...' : 'Увійти'}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Немає акаунту?{' '}
            <Link to="/register" className="text-vintage-brown hover:underline font-medium">
              Зареєструватися
            </Link>
          </p>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Тестові акаунти:</p>
          <p>admin@vintage.com / password123</p>
          <p>seller@vintage.com / password123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
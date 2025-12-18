import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import { registerSchema, RegisterFormData } from '@/schemas/auth.schema';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/auth.service';
import { Button, FormInput } from '@/components/common';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { confirmPassword, ...registerData } = data;
      const response = await authService.register(registerData);
      login(response.user, response.tokens);
      toast.success('Реєстрація успішна!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Помилка реєстрації');
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
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Реєстрація</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-lg p-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Ім'я"
              placeholder="Іван"
              register={register('firstName')}
              error={errors.firstName?.message}
            />
            <FormInput
              label="Прізвище"
              placeholder="Петренко"
              register={register('lastName')}
              error={errors.lastName?.message}
            />
          </div>

          <FormInput
            label="Email"
            type="email"
            placeholder="your@email.com"
            register={register('email')}
            error={errors.email?.message}
          />

          <FormInput
            label="Телефон (опціонально)"
            placeholder="+380991234567"
            register={register('phone')}
            error={errors.phone?.message}
          />

          <FormInput
            label="Пароль"
            type="password"
            placeholder="••••••••"
            register={register('password')}
            error={errors.password?.message}
          />

          <FormInput
            label="Підтвердіть пароль"
            type="password"
            placeholder="••••••••"
            register={register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Реєстрація...' : 'Зареєструватися'}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Вже маєте акаунт?{' '}
            <Link to="/login" className="text-vintage-brown hover:underline font-medium">
              Увійти
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Невірний формат email'),
  password: z.string().min(6, 'Пароль має містити мінімум 6 символів'),
});

export const registerSchema = z.object({
  email: z.string().email('Невірний формат email'),
  password: z.string().min(6, 'Пароль має містити мінімум 6 символів'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, "Ім'я має містити мінімум 2 символи"),
  lastName: z.string().min(2, 'Прізвище має містити мінімум 2 символи'),
  phone: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Паролі не співпадають',
  path: ['confirmPassword'],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
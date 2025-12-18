import { z } from 'zod';

export const productSchema = z.object({
  title: z.string().min(3, 'Назва має містити мінімум 3 символи'),
  description: z.string().min(10, 'Опис має містити мінімум 10 символів'),
  price: z.number().min(1, 'Ціна має бути більше 0'),
  originalPrice: z.number().optional(),
  brand: z.string().optional(),
  size: z.string().min(1, 'Розмір обов\'язковий'),
  color: z.string().min(1, 'Колір обов\'язковий'),
  material: z.string().optional(),
  condition: z.enum(['NEW_WITH_TAGS', 'EXCELLENT', 'GOOD', 'FAIR', 'POOR']),
  era: z.string().optional(),
  categoryId: z.number().min(1, 'Категорія обов\'язкова'),
});

export type ProductFormData = z.infer<typeof productSchema>;
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { productSchema, ProductFormData } from '@/schemas/product.schema';
import { productsService } from '@/services/products.service';
import { categoriesService } from '@/services/categories.service';
import { Button, FormInput, FormSelect } from '@/components/common';
import type { Category } from '@/types';

const conditionOptions = [
  { value: 'NEW_WITH_TAGS', label: 'Новий з бірками' },
  { value: 'EXCELLENT', label: 'Відмінний' },
  { value: 'GOOD', label: 'Хороший' },
  { value: 'FAIR', label: 'Задовільний' },
  { value: 'POOR', label: 'Потребує ремонту' },
];

const ProductCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    categoriesService.getAll().then(setCategories);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: { condition: 'GOOD' },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      await productsService.create(data);
      toast.success('Товар створено!');
      navigate('/dashboard/my-products');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Помилка створення');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Додати товар</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl bg-white rounded-xl shadow-lg p-8 space-y-6">
        <FormInput
          label="Назва товару"
          placeholder="Вінтажна сукня 70-х"
          register={register('title')}
          error={errors.title?.message}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Опис</label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            rows={4}
            placeholder="Детальний опис товару..."
            {...register('description')}
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Ціна (₴)"
            type="number"
            placeholder="1500"
            register={register('price', { valueAsNumber: true })}
            error={errors.price?.message}
          />
          <FormInput
            label="Стара ціна (₴)"
            type="number"
            placeholder="2000"
            register={register('originalPrice', { valueAsNumber: true })}
            error={errors.originalPrice?.message}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Розмір"
            placeholder="M"
            register={register('size')}
            error={errors.size?.message}
          />
          <FormInput
            label="Колір"
            placeholder="Бежевий"
            register={register('color')}
            error={errors.color?.message}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Бренд"
            placeholder="Christian Dior"
            register={register('brand')}
          />
          <FormInput
            label="Матеріал"
            placeholder="Шовк"
            register={register('material')}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormSelect
            label="Стан"
            options={conditionOptions}
            register={register('condition')}
            error={errors.condition?.message}
          />
          <FormSelect
            label="Категорія"
            options={categories.map(c => ({ value: c.id, label: c.name }))}
            register={register('categoryId', { valueAsNumber: true })}
            error={errors.categoryId?.message}
            placeholder="Оберіть категорію"
          />
        </div>

        <FormInput
          label="Епоха/Десятиліття"
          placeholder="70s"
          register={register('era')}
        />

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Створення...' : 'Створити товар'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Скасувати
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductCreatePage;
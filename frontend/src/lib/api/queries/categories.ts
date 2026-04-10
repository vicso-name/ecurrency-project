import { fetchFromStrapi } from '@/lib/strapi';
import type { CategoryData } from '@/types/strapi/category';

type CategoriesResponse = {
  data: CategoryData[];
};

export async function getCategories(): Promise<CategoryData[]> {
  const response = (await fetchFromStrapi('/api/categories')) as CategoriesResponse;

  return response.data ?? [];
}
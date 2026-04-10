import { fetchFromStrapi } from '@/lib/strapi';
import type { ArticleData } from '@/types/strapi/article';

type ArticlesResponse = {
  data: ArticleData[];
};

type GetArticlesParams = {
  search?: string;
  categories?: string[];
};

export async function getArticles(params: GetArticlesParams = {}): Promise<ArticleData[]> {
  const search = params.search?.trim() || '';
  const categories = (params.categories || []).map((item) => item.trim()).filter(Boolean);

  const queryParts: string[] = [
    'populate[featuredImage]=true',
    'populate[category]=true',
    'sort[0]=publishedDate:desc',
    'sort[1]=publishedAt:desc',
    'pagination[pageSize]=100',
  ];

  if (search) {
    queryParts.push(`filters[Title][$containsi]=${encodeURIComponent(search)}`);
  }

  if (categories.length === 1) {
    queryParts.push(`filters[category][slug][$eq]=${encodeURIComponent(categories[0])}`);
  }

  if (categories.length > 1) {
    categories.forEach((category, index) => {
      queryParts.push(
        `filters[$or][${index}][category][slug][$eq]=${encodeURIComponent(category)}`
      );
    });
  }

  const path = `/api/articles?${queryParts.join('&')}`;
  const response = (await fetchFromStrapi(path)) as ArticlesResponse;

  return response.data ?? [];
}
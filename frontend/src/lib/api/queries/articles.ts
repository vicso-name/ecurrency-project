import { fetchFromStrapi } from '@/lib/strapi';

export type StrapiArticle = {
  id: number;
  documentId: string;
  Title: string;
  slug: string;
  Excerpt: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

type StrapiArticlesResponse = {
  data: StrapiArticle[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export async function getArticles(): Promise<StrapiArticle[]> {
  const response = await fetchFromStrapi('/api/articles');
  const typedResponse = response as StrapiArticlesResponse;

  return typedResponse.data ?? [];
}
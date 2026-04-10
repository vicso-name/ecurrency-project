import type { CategoryData } from '@/types/strapi/category';

export type ArticleFeaturedImage = {
  id?: number;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
};

export type ArticleData = {
  id: number;
  documentId: string;
  Title: string;
  slug: string;
  Excerpt?: string;
  content?: string;
  publishedDate?: string;
  publishedAt?: string;
  featuredImage?: ArticleFeaturedImage | null;
  category?: CategoryData | null;
};
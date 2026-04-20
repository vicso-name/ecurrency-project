import type { MetadataRoute } from 'next';
import { getArticles } from '@/lib/api/queries/articles';
import { getLegalPages } from '@/lib/api/queries/legal-page';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ecurrency.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    '',
    '/blog',
    '/ecosystem',
    '/developers',
    '/ecr',
    '/technology',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const articles = await getArticles({});
    articlePages = articles.map((article) => ({
      url: `${BASE_URL}/blog/${article.slug}`,
      lastModified: new Date(article.publishedAt || article.publishedDate || ''),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));
  } catch {
    // silently skip if Strapi unavailable during build
  }

  let legalPages: MetadataRoute.Sitemap = [];
  try {
    const legals = await getLegalPages();
    legalPages = legals.map((page) => ({
      url: `${BASE_URL}/legal/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    }));
  } catch {
    // silently skip
  }

  return [...staticPages, ...articlePages, ...legalPages];
}
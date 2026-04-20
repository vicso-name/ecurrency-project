import { fetchFromStrapi } from '@/lib/strapi';
import type { BlogPageData } from '@/types/strapi/blog-page';

type BlogPageResponse = {
  data: BlogPageData;
};

export async function getBlogPage(): Promise<BlogPageData | null> {
  const response = (await fetchFromStrapi(
    '/api/blog-page?populate[subscribe]=true&populate[seo][populate][seoImage]=true'
  )) as BlogPageResponse;

  return response.data ?? null;
}
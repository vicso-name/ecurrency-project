import { fetchFromStrapi } from '@/lib/strapi';
import type { LegalPageData } from '@/types/strapi/legal-page';

type LegalPagesResponse = {
  data: LegalPageData[];
};

export async function getLegalPageBySlug(slug: string): Promise<LegalPageData | null> {
  const path = `/api/legal-pages?filters[slug][$eq]=${encodeURIComponent(slug)}`;
  const response = (await fetchFromStrapi(path)) as LegalPagesResponse;
  return response.data?.[0] ?? null;
}
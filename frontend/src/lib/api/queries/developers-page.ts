import { fetchFromStrapi } from '@/lib/strapi';
import type { DevelopersPageData } from '@/types/strapi/developers-page';

type DevelopersPageResponse = { data: DevelopersPageData };

export async function getDevelopersPage(): Promise<DevelopersPageData | null> {
  const response = (await fetchFromStrapi(
    '/api/developers-page?populate[hero][populate][card]=true'
  )) as DevelopersPageResponse;
  return response.data ?? null;
}
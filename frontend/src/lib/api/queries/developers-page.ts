import { fetchFromStrapi } from '@/lib/strapi';
import type { DevelopersPageData } from '@/types/strapi/developers-page';

type DevelopersPageResponse = { data: DevelopersPageData };

export async function getDevelopersPage(): Promise<DevelopersPageData | null> {
  const params = [
    'populate[hero][populate][card]=true',
    'populate[opportunities][populate][cards][populate][icon]=true',
    'populate[tools][populate][cards]=true',
  ].join('&');

  const response = (await fetchFromStrapi(
    `/api/developers-page?${params}`
  )) as DevelopersPageResponse;
  return response.data ?? null;
}
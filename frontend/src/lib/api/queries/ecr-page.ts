import { fetchFromStrapi } from '@/lib/strapi';
import type { EcrPageData } from '@/types/strapi/ecr-page';

type EcrPageResponse = { data: EcrPageData };

export async function getEcrPage(): Promise<EcrPageData | null> {
  const response = (await fetchFromStrapi(
    '/api/ecr-page?populate[hero][populate][card]=true'
  )) as EcrPageResponse;
  return response.data ?? null;
}
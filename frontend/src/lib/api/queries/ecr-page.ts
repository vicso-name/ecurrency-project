import { fetchFromStrapi } from '@/lib/strapi';
import type { EcrPageData } from '@/types/strapi/ecr-page';

type EcrPageResponse = { data: EcrPageData };

export async function getEcrPage(): Promise<EcrPageData | null> {
  const params = [
    'populate[hero][populate][card]=true',
    'populate[usedFor][populate][cards][populate][icon]=true',
  ].join('&');

  const response = (await fetchFromStrapi(
    `/api/ecr-page?${params}`
  )) as EcrPageResponse;
  return response.data ?? null;
}
import { fetchFromStrapi } from '@/lib/strapi';
import type { EcosystemPageData } from '@/types/strapi/ecosystem-page';

type EcosystemPageResponse = { data: EcosystemPageData };

export async function getEcosystemPage(): Promise<EcosystemPageData | null> {
  const params = [
    'populate[hero][populate][card]=true',
    'populate[usedFor][populate][cards][populate][icon]=true',
    'populate[community][populate][cards][populate][icon]=true',
  ].join('&');

  const response = (await fetchFromStrapi(
    `/api/ecosystem-page?${params}`
  )) as EcosystemPageResponse;
  return response.data ?? null;
}
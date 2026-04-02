import { fetchFromStrapi } from '@/lib/strapi';
import type { GlobalData } from '@/types/strapi/global';

type GlobalResponse = {
  data: GlobalData;
};

export async function getGlobalData(): Promise<GlobalData | null> {
  const response = (await fetchFromStrapi(
    '/api/global?populate[headerLogo]=true&populate[headerNavigation][populate][children]=true&populate[headerCta]=true'
  )) as GlobalResponse;

  return response.data ?? null;
}
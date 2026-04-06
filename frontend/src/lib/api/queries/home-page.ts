import { fetchFromStrapi } from '@/lib/strapi';
import type { HomePageData } from '@/types/strapi/home-page';

type HomePageResponse = {
  data: HomePageData;
};

export async function getHomePage(): Promise<HomePageData | null> {
  const response = (await fetchFromStrapi(
    '/api/home-page?populate[hero]=true&populate[blockQuote]=true'
  )) as HomePageResponse;

  return response.data ?? null;
}
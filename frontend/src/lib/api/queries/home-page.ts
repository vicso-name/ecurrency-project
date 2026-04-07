import { fetchFromStrapi } from '@/lib/strapi';
import type { HomePageData } from '@/types/strapi/home-page';

type HomePageResponse = {
  data: HomePageData;
};

export async function getHomePage(): Promise<HomePageData | null> {
  const response = (await fetchFromStrapi(
    '/api/home-page?populate[hero]=true&populate[blockQuote]=true&populate[blockchainDesigned][populate][tabs][populate][previewImage]=true&populate[blockchainDesigned][populate][tabs][populate][featureCards][populate][icon]=true&populate[blockchainArchitecture][populate][cards][populate][icon]=true&populate[usedFor][populate][cards][populate][icon]=true'
  )) as HomePageResponse;

  return response.data ?? null;
}
import { fetchFromStrapi } from '@/lib/strapi';
import type { HomePageData } from '@/types/strapi/home-page';

type HomePageResponse = {
  data: HomePageData;
};

const populateParams = [
  'populate[hero]=true',
  'populate[blockQuote]=true',
  'populate[blockchainDesigned][populate][tabs][populate][previewImage]=true',
  'populate[blockchainDesigned][populate][tabs][populate][featureCards][populate][icon]=true',
  'populate[blockchainArchitecture][populate][cards][populate][icon]=true',
  'populate[usedFor][populate][cards][populate][icon]=true',
  'populate[economicLayer][populate][coinImage]=true',
  'populate[projectOverview][populate][icon]=true',
  'populate[startExploring][populate][cards][populate][backgroundImage]=true',
  'populate[paymentSystems][populate][cards]=true',
  'populate[toolsInfrastructure][populate][tabs][populate][previewImage]=true',
  'populate[toolsInfrastructure][populate][socialLinks][populate][icon]=true',
].join('&');

export async function getHomePage(): Promise<HomePageData | null> {
  const response = (await fetchFromStrapi(
    `/api/home-page?${populateParams}`
  )) as HomePageResponse;

  return response.data ?? null;
}
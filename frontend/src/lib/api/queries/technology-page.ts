import { fetchFromStrapi } from '@/lib/strapi';
import type { TechnologyPageData } from '@/types/strapi/technology-page';

type TechnologyPageResponse = { data: TechnologyPageData };

export async function getTechnologyPage(): Promise<TechnologyPageData | null> {
  const params = [
    'populate[hero][populate][card]=true',
    'populate[features][populate][cards][populate][icon]=true',
    'populate[TransactionModel][populate][steps]=true',
    'populate[TransactionModel][populate][benefits][populate][tags]=true',
  ].join('&');

  const response = (await fetchFromStrapi(
    `/api/technology-page?${params}`
  )) as TechnologyPageResponse;
  return response.data ?? null;
}
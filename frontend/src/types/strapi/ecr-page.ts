import type { PageHero } from './page-hero';
import type { HomePageUsedFor } from './home-page';
import { StrapiSeo } from './seo';

export type EcrPageData = {
  id: number;
  documentId: string;
  hero?: PageHero | null;
  usedFor?: HomePageUsedFor | null;
  seo?: StrapiSeo | null;
};
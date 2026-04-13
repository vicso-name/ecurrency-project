import type { PageHero } from './page-hero';
import type { HomePageUsedFor } from './home-page';

export type EcrPageData = {
  id: number;
  documentId: string;
  hero?: PageHero | null;
  usedFor?: HomePageUsedFor | null;
};
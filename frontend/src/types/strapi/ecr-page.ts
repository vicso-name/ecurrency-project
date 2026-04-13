import type { PageHero } from './page-hero';

export type EcrPageData = {
  id: number;
  documentId: string;
  hero?: PageHero | null;
};
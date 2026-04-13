import type { PageHero } from './page-hero';

export type DevelopersPageData = {
  id: number;
  documentId: string;
  hero?: PageHero | null;
};
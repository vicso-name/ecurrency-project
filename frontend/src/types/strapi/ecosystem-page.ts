import type { PageHero } from './page-hero';
import type { HomePageUsedFor } from './home-page';
import { StrapiSeo } from './seo';

export type CommunityCard = {
  id: number;
  title?: string;
  text: string;
  icon?: {
    id?: number;
    url: string;
    alternativeText?: string | null;
    width?: number;
    height?: number;
  } | null;
};

export type CommunitySection = {
  id: number;
  title: string;
  cards?: CommunityCard[];
  primaryButtonLabel?: string;
  primaryButtonHref?: string;
  secondaryButtonLabel?: string;
  secondaryButtonHref?: string;
};

export type EcosystemPageData = {
  id: number;
  documentId: string;
  hero?: PageHero | null;
  usedFor?: HomePageUsedFor | null;
  community?: CommunitySection | null;
  seo?: StrapiSeo | null;
};
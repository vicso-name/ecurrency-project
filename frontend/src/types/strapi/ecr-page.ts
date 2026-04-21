import type { PageHero } from './page-hero';
import type { HomePageUsedFor, HomePageBlockchainArchitecture } from './home-page';
import { StrapiSeo } from './seo';

export type EcrUseCasesCard = {
  id: number;
  text: string;
};

export type EcrUseCasesSection = {
  id: number;
  title?: string;
  subtitle?: string;
  cards?: EcrUseCasesCard[];
  primaryButtonLabel?: string;
  primaryButtonHref?: string;
  secondaryButtonLabel?: string;
  secondaryButtonHref?: string;
};

export type EcrPageData = {
  id: number;
  documentId: string;
  hero?: PageHero | null;
  blockchainArchitecture?: HomePageBlockchainArchitecture | null;
  usedFor?: HomePageUsedFor | null;
  useCases?: EcrUseCasesSection | null;
  seo?: StrapiSeo | null;
};
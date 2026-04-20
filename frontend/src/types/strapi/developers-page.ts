import type { PageHero } from './page-hero';
import { StrapiSeo } from './seo';

export type OpportunityCard = {
  id: number;
  title: string;
  sizeVariant: 'tall' | 'small' | 'wide';
  icon?: {
    id?: number;
    url: string;
    alternativeText?: string | null;
    width?: number;
    height?: number;
  } | null;
};

export type OpportunitiesSection = {
  id: number;
  title: string;
  cards?: OpportunityCard[];
};

export type DevelopersPageData = {
  id: number;
  documentId: string;
  hero?: PageHero | null;
  opportunities?: OpportunitiesSection | null;
  tools?: ToolsSection | null;
  seo?: StrapiSeo | null;
};

export type ToolCard = {
  id: number;
  title: string;
  buttonLabel: string;
  buttonHref?: string;
  showTopDash?: boolean;
  showBottomDash?: boolean;
};

export type ToolsSection = {
  id: number;
  title: string;
  cards?: ToolCard[];
  ctaLabel?: string;
  ctaHref?: string;
};
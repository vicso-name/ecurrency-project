import type { PageHero } from './page-hero';

export type TechnologyFeatureCard = {
  id: number;
  title: string;
  icon?: {
    id?: number;
    url: string;
    alternativeText?: string | null;
    width?: number;
    height?: number;
  } | null;
};

export type TechnologyFeaturesSection = {
  id: number;
  title: string;
  cards?: TechnologyFeatureCard[];
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type TechnologyPageData = {
  id: number;
  documentId: string;
  hero?: PageHero | null;
  features?: TechnologyFeaturesSection | null;
  TransactionModel?: SmartContractsSection | null;
};

export type SmartContractStep = {
  id: number;
  text: string;
};

export type SmartContractTag = {
  id: number;
  label: string;
};

export type SmartContractBenefit = {
  id: number;
  text: string;
  tags?: SmartContractTag[];
};

export type SmartContractsSection = {
  id: number;
  title: string;
  subtitle?: string;
  howItWorksTitle: string;
  steps?: SmartContractStep[];
  benefitsTitle: string;
  benefits?: SmartContractBenefit[];
  ctaLabel?: string;
  ctaHref?: string;
};
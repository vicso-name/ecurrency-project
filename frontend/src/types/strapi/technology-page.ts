import { ToolsSection } from './developers-page';
import { HomePageStartExploring, HomePageUsedFor } from './home-page';
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
  consensus?: ConsensusSection | null;
  clientSideSmartContracts?: SmartContractsSection | null;
  postQuantumCryptography?: SmartContractsSection | null;
  infrastructure?: InfrastructureSection | null;
  architectureMatters?: HomePageStartExploring | null;
  useCases?: HomePageUsedFor | null;
  nextSteps?: ToolsSection | null;
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

export type ConsensusCard = {
  id: number;
  text: string;
  icon?: {
    id?: number;
    url: string;
    alternativeText?: string | null;
    width?: number;
    height?: number;
  } | null;
};

export type ConsensusSection = {
  id: number;
  title: string;
  subtitle?: string;
  rowTitle?: string;
  cards?: ConsensusCard[];
  ctaLabel?: string;
  ctaHref?: string;
};

export type InfrastructureCard = {
  id: number;
  text: string;
};

export type InfrastructureSection = {
  id: number;
  title: string;
  subtitle?: string;
  cards?: InfrastructureCard[];
  bottomText?: string;
  ctaLabel?: string;
  ctaHref?: string;
};
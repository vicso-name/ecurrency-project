export type HomePageHero = {
  id: number;
  title: string;
  subtitle?: string;
  primaryButtonLabel?: string;
  primaryButtonHref?: string;
  secondaryButtonLabel?: string;
  secondaryButtonHref?: string;
};

export type HomePageBlockQuote = {
  id: number;
  text: string;
};

export type BlockchainDesignedFeatureCard = {
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

export type BlockchainDesignedTab = {
  id: number;
  tabNumber: number;
  title: string;
  description: string;
  learnMoreLabel?: string;
  learnMoreHref?: string;
  previewImage?: {
    id?: number;
    url: string;
    alternativeText?: string | null;
    width?: number;
    height?: number;
  } | null;
  featureCards?: BlockchainDesignedFeatureCard[];
};

export type HomePageBlockchainDesigned = {
  id: number;
  tabs?: BlockchainDesignedTab[];
  bottomCtaLabel?: string;
  bottomCtaHref?: string;
};

export type HomePageData = {
  id: number;
  documentId: string;
  hero?: HomePageHero | null;
  blockQuote?: HomePageBlockQuote | null;
  blockchainDesigned?: HomePageBlockchainDesigned | null;
};
import { StrapiSeo } from "./seo";

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

export type BlockchainDesignedLink = {
  id: number;
  label: string;
  href: string;
  openInNewTab?: boolean | null;
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
  links?: BlockchainDesignedLink[];
};

export type BlockchainArchitectureCard = {
  id: number;
  title: string;
  subtitle: string;
  sizeVariant: 'large' | 'small';
  icon?: {
    id?: number;
    url: string;
    alternativeText?: string | null;
    width?: number;
    height?: number;
  } | null;
};

export type HomePageBlockchainArchitecture = {
  bottomCtaOpenInNewTab: boolean | null | undefined;
  id: number;
  preTitle?: string;
  title: string;
  subTitle?: string;
  cards?: BlockchainArchitectureCard[];
  bottomCtaLabel?: string;
  bottomCtaHref?: string;
};

export type HomePageData = {
  id: number;
  documentId: string;
  hero?: HomePageHero | null;
  blockQuote?: HomePageBlockQuote | null;
  blockchainDesigned?: HomePageBlockchainDesigned | null;
  blockchainArchitecture?: HomePageBlockchainArchitecture | null;
  usedFor?: HomePageUsedFor | null;
  economicLayer?: HomePageEconomicLayer | null;
  projectOverview?: HomePageProjectOverview | null;
  startExploring?: HomePageStartExploring | null;
  paymentSystems?: HomePagePaymentSystems | null;
  toolsInfrastructure?: HomePageToolsInfrastructure | null;
  seo?: StrapiSeo | null;
};

export type UsedForCard = {
  id: number;
  title: string;
  orderNumber: string;
  icon?: {
    id?: number;
    url: string;
    alternativeText?: string | null;
    width?: number;
    height?: number;
  } | null;
};

export type HomePageUsedFor = {
  id: number;
  preTitle?: string;
  title?: string;
  cards?: UsedForCard[];
  primaryButtonLabel?: string;
  primaryButtonHref?: string;
  secondaryButtonLabel?: string;
  secondaryButtonHref?: string;
  showButtons?: boolean;
};

export type HomePageEconomicLayer = {
  buttonOpenInNewTab?: boolean | null;
  id: number;
  title: string;
  subtitle?: string;
  buttonLabel?: string;
  buttonHref?: string;
  coinImage?: {
    id?: number;
    url: string;
    alternativeText?: string | null;
    width?: number;
    height?: number;
  } | null;
};

export type HomePageProjectOverview = {
  id: number;
  title: string;
  subtitle?: string;
  icon?: {
    id?: number;
    url: string;
    alternativeText?: string | null;
    width?: number;
    height?: number;
  } | null;
};

export type StartExploringCard = {
  id: number;
  title: string;
  subtitle?: string;
  backgroundImage?: {
    id?: number;
    url: string;
    alternativeText?: string | null;
    width?: number;
    height?: number;
  } | null;
};

export type StartExploringLink = {
  openInNewTab: boolean | null | undefined;
  id: number;
  label: string;
  href: string;
};

export type HomePageStartExploring = {
  id: number;
  title: string;
  subtitle?: string;
  cards?: StartExploringCard[];
  description?: string;
  linksTitle?: string;
  links?: StartExploringLink[];
  bottomText?: string;
};

export type PaymentSystemsCard = {
  id: number;
  title: string;
  orderNumber: string;
};

export type HomePagePaymentSystems = {
  id: number;
  title: string;
  subtitle?: string;
  cards?: PaymentSystemsCard[];
  bottomCtaLabel?: string;
  bottomCtaHref?: string;
};

export type ToolsInfrastructureTab = {
  id: number;
  label: string;
  previewImage: {
    url: string;
    alternativeText?: string | null;
  };
  buttons?: ToolsInfrastructureButton[];
};

export type ToolsInfrastructureButton = {
  id: number;
  label: string;
  subLabel?: string | null;
  href?: string;
  variant: 'primary' | 'secondary';
  icon?: {
    url: string;
    alternativeText?: string | null;
  } | null;
};

export type HomePageToolsInfrastructure = {
  id: number;
  title: string;
  subtitle?: string;
  tabs: ToolsInfrastructureTab[];
};
export type InnerHeroCard = {
  id: number;
  description: string;
  buttonLabel?: string;
  buttonHref?: string;
  openInNewTab?: boolean | null;
};

export type PageHero = {
  id: number;
  title: string;
  subtitle?: string;
  card?: InnerHeroCard | null;
  showWalletBadge?: boolean;
  showExtensionBadge?: boolean;
};
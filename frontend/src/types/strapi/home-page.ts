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

export type HomePageData = {
  id: number;
  documentId: string;
  hero?: HomePageHero | null;
  blockQuote?: HomePageBlockQuote | null;
};
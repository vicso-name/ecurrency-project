export type StrapiSeo = {
  id: number;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: {
    id?: number;
    url: string;
    alternativeText?: string | null;
    width?: number;
    height?: number;
  } | null;
};
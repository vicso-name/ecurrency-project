import { StrapiSeo } from "./seo";

export type LegalPageData = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  seo?: StrapiSeo | null;
};
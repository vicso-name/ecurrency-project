import { StrapiSeo } from "./seo";

export type BlogPageSubscribe = {
  id: number;
  title: string;
  buttonLabel: string;
  placeholder?: string;
};

export type BlogPageData = {
  id: number;
  documentId: string;
  title: string;
  subtitle?: string;
  searchPlaceholder?: string;
  categoryPlaceholder?: string;
  clearAllLabel?: string;
  loadMoreLabel?: string;
  subscribe?: BlogPageSubscribe | null;
  seo?: StrapiSeo | null;
};
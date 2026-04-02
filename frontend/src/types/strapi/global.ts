import type { StrapiImage } from '@/types/strapi/shared';

export type NavLinkChild = {
  id: number;
  label: string;
  href: string;
};

export type NavLink = {
  id: number;
  label: string;
  href: string;
  hasChildren: boolean;
  children?: NavLinkChild[];
};

export type HeaderCta = {
  id: number;
  label: string;
  href: string;
};

export type GlobalData = {
  id: number;
  documentId: string;
  siteName?: string;
  headerLogo?: StrapiImage | null;
  headerNavigation?: NavLink[];
  headerCta?: HeaderCta | null;
};
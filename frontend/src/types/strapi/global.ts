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

export type FooterContact = {
  id: number;
  label: string;
  href?: string;
  iconType: 'email' | 'location' | 'officeTime';
};

export type FooterColumnLink = {
  id: number;
  label: string;
  href?: string;
  targetBlank?: boolean;
};

export type FooterColumn = {
  id: number;
  title: string;
  links?: FooterColumnLink[];
};

export type FooterBottomLink = {
  id: number;
  label: string;
  href?: string;
  targetBlank?: boolean;
};

export type GlobalData = {
  id: number;
  documentId: string;
  siteName?: string;
  headerLogo?: StrapiImage | null;
  headerNavigation?: NavLink[];
  headerCta?: HeaderCta | null;

  footerLogo?: StrapiImage | null;
  footerContacts?: FooterContact[];
  footerColumns?: FooterColumn[];
  footerBottomLinks?: FooterBottomLink[];
  footerCopyright?: string;
};
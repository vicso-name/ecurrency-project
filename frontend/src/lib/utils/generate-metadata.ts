import type { Metadata } from 'next';
import type { StrapiSeo } from '@/types/strapi/seo';
import { getStrapiMediaUrl } from '@/lib/utils/get-strapi-media-url';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ecurrency.org';
const SITE_NAME = 'eCurrency';

type GenerateMetadataParams = {
  seo?: StrapiSeo | null;
  fallbackTitle: string;
  fallbackDescription?: string;
  path?: string;
};

export function buildMetadata({
  seo,
  fallbackTitle,
  fallbackDescription = '',
  path = '',
}: GenerateMetadataParams): Metadata {
  const title = seo?.seoTitle || fallbackTitle;
  const description = seo?.seoDescription || fallbackDescription;
  const imageUrl = seo?.seoImage?.url ? getStrapiMediaUrl(seo.seoImage.url) : undefined;
  const url = `${BASE_URL}${path}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      ...(imageUrl && {
        images: [{ url: imageUrl, width: seo?.seoImage?.width, height: seo?.seoImage?.height }],
      }),
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
    alternates: {
      canonical: url,
    },
  };
}
export function getStrapiMediaUrl(url?: string | null) {
  if (!url) {
    return '';
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || '';

  return `${baseUrl}${url}`;
}
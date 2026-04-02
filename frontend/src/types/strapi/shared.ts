export type StrapiImageFormat = {
  url: string;
  width: number;
  height: number;
};

export type StrapiImage = {
  id?: number;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
};
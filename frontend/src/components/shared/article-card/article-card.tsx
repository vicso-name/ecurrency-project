import Image from 'next/image';
import Link from 'next/link';
import type { ArticleData } from '@/types/strapi/article';
import { getStrapiMediaUrl } from '@/lib/utils/get-strapi-media-url';
import { formatDate } from '@/lib/utils/format-date';

type ArticleCardProps = {
  article: ArticleData;
};

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="8.5" stroke="#EC0000" />
      <path
        d="M11.6941 8.72341C10.4685 9.97276 9.22616 11.2388 7.9505 12.5381C7.71704 12.2965 7.50026 12.0717 7.29182 11.8551C7.24179 11.8051 7.19177 11.7468 7.12507 11.7135C6.98332 11.6302 7.01668 11.5469 7.11673 11.4553C7.45857 11.1222 7.79208 10.7807 8.13392 10.4475C8.19229 10.3892 8.26733 10.3392 8.32569 10.2809C8.80928 9.79785 9.29286 9.31477 9.78478 8.83168C9.8098 8.8067 9.83481 8.77338 9.89317 8.71508C8.926 7.7739 7.95883 6.84105 7 5.91653C7.35018 5.58337 7.66701 5.28353 7.95883 5.00035C9.18447 6.21638 10.4435 7.48239 11.6941 8.72341Z"
        fill="#EC0000"
      />
    </svg>
  );
}

export function ArticleCard({ article }: ArticleCardProps) {
  const imageUrl = getStrapiMediaUrl(article.featuredImage?.url);
  const date = article.publishedDate || article.publishedAt;

  return (
    <Link href={`/blog/${article.slug}`} className="group block">
      <article
        className="flex h-full flex-col rounded-[18px] border border-[#E8E8E8] bg-white p-[20px]"
        style={{
          boxShadow: '0 3px 112.1px 4px rgba(0, 0, 0, 0.04)',
          backdropFilter: 'blur(1.8px)',
        }}
      >
        {/* Image */}
        <div className="mb-6 aspect-[4/3] overflow-hidden rounded-[12px] bg-[#F2F2F2]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={article.featuredImage?.alternativeText || article.Title}
              width={400}
              height={300}
              unoptimized
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : null}
        </div>

        {/* Title */}
        <h3 className="mb-2 [font-family:var(--font-manrope)] text-[18px] font-semibold leading-[24px] tracking-[-0.5px] text-[#0F1324]">
          {article.Title}
        </h3>

        {/* Date + Arrow */}
        <div className="mt-auto flex items-center justify-between pt-2">
          {date ? (
            <span className="[font-family:var(--font-manrope)] text-[14px] font-normal leading-[20px] text-[rgba(15,19,36,0.40)]">
              {formatDate(date)}
            </span>
          ) : null}
          <ArrowIcon />
        </div>
      </article>
    </Link>
  );
}
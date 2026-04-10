'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { getStrapiMediaUrl } from '@/lib/utils/get-strapi-media-url';
import type { ArticleData } from '@/types/strapi/article';
import type { BlogPageData } from '@/types/strapi/blog-page';

type BlogListProps = {
  articles: ArticleData[];
  blogPage: BlogPageData | null;
};

const INITIAL_VISIBLE = 9;
const LOAD_MORE_STEP = 3;

const BUTTON_GRADIENT =
  'radial-gradient(60.21% 66.41% at 47.91% -7.5%, rgba(240, 88, 88, 0.40) 0%, rgba(255, 255, 255, 0.05) 79.27%, rgba(255, 255, 255, 0) 100%)';

const BUTTON_GRADIENT_HOVER = `${BUTTON_GRADIENT}, rgba(236, 0, 0, 0.04)`;

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
      <circle cx="13" cy="13" r="12.5" transform="rotate(-90 13 13)" stroke="#EC0000" strokeOpacity="0.14" />
      <path
        d="M11.3125 17.875L16.1875 13L11.3125 8.125"
        stroke="#EC0000"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatBlogDate(date?: string) {
  if (!date) {
    return '';
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString('en-GB').replace(/\//g, '.');
}

function LoadMoreButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex w-[222px] cursor-pointer items-center justify-center gap-1 rounded-[100px] border border-[#DE3737] px-[30px] pb-2 pt-[6px] text-center text-[16px] font-normal leading-9 capitalize text-[#EC0000] shadow-[0_0_7px_0_rgba(227,64,57,0.20)] transition-colors duration-200"
      style={{
        background: hovered ? BUTTON_GRADIENT_HOVER : BUTTON_GRADIENT,
      }}
    >
      {label}
    </button>
  );
}

export function BlogList({ articles, blogPage }: BlogListProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const visibleArticles = useMemo(() => {
    return articles.slice(0, visibleCount);
  }, [articles, visibleCount]);

  const hasMore = visibleCount < articles.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_STEP, articles.length));
  };

  if (articles.length === 0) {
    return (
      <div className="col-span-full rounded-[18px] border border-[#E8E8E8] bg-white p-10 text-center text-[16px] text-[rgba(0,0,0,0.56)]">
        No articles found.
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleArticles.map((article) => {
          const imageUrl = getStrapiMediaUrl(article.featuredImage?.url);

          return (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="block rounded-[18px] border border-[#E8E8E8] bg-white p-4 shadow-[0_3px_112.1px_4px_rgba(0,0,0,0.04)] backdrop-blur-[1.8px] transition-transform duration-200 hover:-translate-y-[2px]"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={article.featuredImage?.alternativeText || article.Title || 'Article image'}
                  className="mb-6 h-[240px] w-full rounded-[18px] object-cover"
                />
              ) : (
                <div className="mb-6 h-[240px] w-full rounded-[18px] bg-[rgba(32,32,32,0.04)]" />
              )}

              <h2 className="mb-7 line-clamp-2 min-h-[56px] text-[22px] leading-7 font-semibold text-black">
                {article.Title || 'Untitled article'}
              </h2>

              <div className="flex items-center justify-between gap-4">
                <span className="text-[16px] leading-6 font-medium text-[rgba(0,0,0,0.51)]">
                  {formatBlogDate(article.publishedDate)}
                </span>
                <ArrowIcon />
              </div>
            </Link>
          );
        })}
      </div>

      {hasMore ? (
        <div className="mt-12 flex justify-center">
          <LoadMoreButton
            label={blogPage?.loadMoreLabel || 'Load More'}
            onClick={handleLoadMore}
          />
        </div>
      ) : null}
    </>
  );
}
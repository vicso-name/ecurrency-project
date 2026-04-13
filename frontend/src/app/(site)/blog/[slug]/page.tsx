import { notFound } from 'next/navigation';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getArticleBySlug, getRelevantArticles } from '@/lib/api/queries/articles';
import { getStrapiMediaUrl } from '@/lib/utils/get-strapi-media-url';
import { formatDate } from '@/lib/utils/format-date';
import { ArticleCard } from '@/components/shared/article-card/article-card';
import { ShareBlock } from '@/components/shared/share-block/share-block';
import { OutlineButton } from '@/components/ui/outline-button/outline-button';

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function ClockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 5.83333V10H14.1667M10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10C17.5 14.1421 14.1421 17.5 10 17.5Z"
        stroke="#EC0000"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DotSeparator() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="3" height="3" viewBox="0 0 3 3" fill="none">
      <circle cx="1.5" cy="1.5" r="1.5" fill="#0F1324" />
    </svg>
  );
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  const [article, relevantArticles] = await Promise.all([
    getArticleBySlug(slug),
    getRelevantArticles(slug, 3),
  ]);

  if (!article) {
    notFound();
  }

  const imageUrl = getStrapiMediaUrl(article.featuredImage?.url);
  const date = article.publishedDate || article.publishedAt;
  const readingTime = article.content ? calculateReadingTime(article.content) : null;

  return (
    <main className="px-4 pb-24 pt-[100px] md:pt-[140px]">
      {/* Hero */}
      <div className="mx-auto max-w-[808px] text-center">
        <h1 className="[font-family:var(--font-manrope)] text-[36px] font-semibold leading-[100%] tracking-[-1.5px] text-[#0F1324] md:text-[48px] md:tracking-[-2px] lg:text-[64px] lg:tracking-[-2.56px]">
          {article.Title}
        </h1>

        {/* Meta: reading time + date */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {readingTime && (
            <>
              <ClockIcon />
              <span className="[font-family:var(--font-manrope)] text-[16px] font-normal leading-[20px] text-[rgba(15,19,36,0.60)]">
                {readingTime} min. for reading
              </span>
            </>
          )}
          {readingTime && date && <DotSeparator />}
          {date && (
            <span className="[font-family:var(--font-manrope)] text-[16px] font-normal leading-[20px] text-[rgba(15,19,36,0.60)]">
              {formatDate(date)}
            </span>
          )}
        </div>

        {/* Featured image */}
        {imageUrl && (
          <div className="mt-10 overflow-hidden rounded-[16px] md:max-h-[440px]">
            <Image
              src={imageUrl}
              alt={article.featuredImage?.alternativeText || article.Title}
              width={808}
              height={440}
              unoptimized
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mx-auto mt-[40px] max-w-[618px] md:mt-[60px]">
        {/* Excerpt */}
        {article.Excerpt && (
          <p className="mb-[40px] [font-family:var(--font-manrope)] text-[22px] font-semibold leading-[126%] tracking-[-1.12px] text-[#0F1324] md:mb-[60px] md:text-[28px]">
            {article.Excerpt}
          </p>
        )}

        {/* Markdown content */}
        {article.content && (
          <div className="article-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
          </div>
        )}

        {/* Share */}
        <div className="mt-[40px] flex justify-center md:mt-[60px]">
          <ShareBlock title={article.Title} />
        </div>
      </div>

      {/* Relevant Articles */}
      {relevantArticles.length > 0 && (
        <div className="mx-auto mt-[80px] max-w-[1200px] md:mt-[120px]">
          <h2 className="mb-[40px] text-center [font-family:var(--font-manrope)] text-[36px] font-semibold leading-[100%] tracking-[-1.5px] text-[#0F1324] md:mb-[60px] md:text-[48px] md:tracking-[-1.92px]">
            Relevant Articles
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relevantArticles.map((relArticle) => (
              <ArticleCard key={relArticle.id} article={relArticle} />
            ))}
          </div>

          <div className="mt-[40px] flex justify-center md:mt-[60px]">
            <OutlineButton href="/blog" label="Show More" />
          </div>
        </div>
      )}
    </main>
  );
}
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

  return (
    <main className="px-4 pb-24 pt-[100px] md:pt-[140px]">
      {/* Hero */}
      <div className="mx-auto max-w-[808px] text-center">
        <h1 className="[font-family:var(--font-manrope)] text-[36px] font-semibold leading-[100%] tracking-[-1.5px] text-[#0F1324] md:text-[48px] md:tracking-[-2px] lg:text-[64px] lg:tracking-[-2.56px]">
          {article.Title}
        </h1>

        {/* Meta: date */}
        {date && (
          <div className="mt-4 flex items-center justify-center">
            <span className="[font-family:var(--font-manrope)] text-[16px] font-normal leading-[20px] text-[rgba(15,19,36,0.60)]">
              {formatDate(date)}
            </span>
          </div>
        )}

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
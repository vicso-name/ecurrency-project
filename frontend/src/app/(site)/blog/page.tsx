import { getArticles } from '@/lib/api/queries/articles';
import { getBlogPage } from '@/lib/api/queries/blog-page';
import { getCategories } from '@/lib/api/queries/categories';
import { BlogFilters } from '@/components/sections/blog/blog-filters/blog-filters';
import { BlogList } from '@/components/sections/blog/blog-list/blog-list';
import { SubscribeSection } from '@/components/sections/blog/subscribe-section/subscribe-section';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/utils/generate-metadata';

export async function generateMetadata(): Promise<Metadata> {
  const blogPage = await getBlogPage();
  return buildMetadata({
    seo: blogPage?.seo,
    fallbackTitle: 'Blog — eCurrency',
    path: '/blog',
  });
}

type BlogPageProps = {
  searchParams?: Promise<{
    search?: string;
    categories?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const search = resolvedSearchParams.search?.trim() || '';

  const selectedCategories =
    resolvedSearchParams.categories
      ?.split(',')
      .map((item) => item.trim())
      .filter(Boolean) || [];

  const [blogPage, categories, articles] = await Promise.all([
    getBlogPage(),
    getCategories(),
    getArticles({
      search,
      categories: selectedCategories,
    }),
  ]);

  return (
    <main className="px-4 pb-24 pt-[100px] md:pt-[160px]">



      <div className="mx-auto max-w-[1360px]">
        <section className="text-center">
          <h1 className="text-[48px] leading-[104%] font-semibold tracking-[-2px] text-[#202020] md:text-[64px] md:tracking-[-3px] xl:text-[80px] xl:tracking-[-4px]">
            {blogPage?.title || 'Blog'}
          </h1>

          {blogPage?.subtitle ? (
            <p className="mx-auto mt-6 max-w-[403px] text-[16px] leading-6 font-normal tracking-[-0.4px] text-[rgba(32,32,32,0.56)]">
              {blogPage.subtitle}
            </p>
          ) : null}

          <BlogFilters categories={categories} blogPage={blogPage} />
        </section>

        <section className="mt-16">
          <BlogList articles={articles} blogPage={blogPage} />
        </section>
        <SubscribeSection data={blogPage?.subscribe} />       
      </div>
    </main>
  );
}
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getLegalPageBySlug } from '@/lib/api/queries/legal-page';

type LegalPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LegalPage({ params }: LegalPageProps) {
  const { slug } = await params;
  const page = await getLegalPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <main className="px-4 pb-24 pt-[100px] md:pt-[140px]">
      <div className="mx-auto max-w-[808px] text-center">
        <h1 className="[font-family:var(--font-manrope)] text-[36px] font-semibold leading-[100%] tracking-[-1.5px] text-[#0F1324] md:text-[48px] md:tracking-[-2px] lg:text-[64px] lg:tracking-[-2.56px]">
          {page.title}
        </h1>
      </div>

      <div className="mx-auto mt-[40px] max-w-[618px] md:mt-[60px]">
        <div className="article-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{page.content}</ReactMarkdown>
        </div>
      </div>
    </main>
  );
}
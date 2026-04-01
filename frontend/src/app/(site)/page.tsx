import { getArticles, type StrapiArticle } from '@/lib/api/queries/articles';

export default async function HomePage() {
  let articles: StrapiArticle[] = [];
  let errorMessage = '';

  try {
    articles = await getArticles();
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : 'Unknown error while fetching Strapi data';
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-8 text-4xl font-bold">Next.js + Strapi connection test</h1>

      {errorMessage ? (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
          {errorMessage}
        </div>
      ) : null}

      {!errorMessage && articles.length === 0 ? <p>No articles found.</p> : null}

      <div className="space-y-6">
        {articles.map((article) => (
          <article key={article.id} className="rounded-xl border p-6 shadow-sm">
            <h2 className="mb-2 text-2xl font-semibold">{article.Title}</h2>
            <p className="mb-3 text-sm text-gray-500">Slug: {article.slug}</p>
            <p className="text-base leading-7">{article.Excerpt}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
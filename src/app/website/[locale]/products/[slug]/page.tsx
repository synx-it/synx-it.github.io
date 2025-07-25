import { getArticle, getSortedArticles, markdownToHtml } from "@/lib/articles";
import { notFound } from "next/navigation";
import { i18n, type SupportedLocale } from "@/i18n";

export async function generateStaticParams() {
  const paths = await Promise.all(
    (i18n.locales as SupportedLocale[]).map(async (locale) => {
      const articles = await getSortedArticles("products", locale);
      return articles.map((article) => ({
        locale,
        slug: article.slug,
      }));
    })
  );

  return paths.flat();
}

export const dynamicParams = false; // No fallback: 404 for unknown locales

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string; locale: SupportedLocale }>;
}) {
  const { locale, slug } = await params;
  const article = await getArticle("products", slug, locale);

  if (!article) {
    notFound();
  }

  const contentHtml = await markdownToHtml(article.content);

  return (
    <div className="container mx-auto px-4 py-20 md:py-32">
      <article className="mx-auto">
        <h1>{article.frontmatter.title}</h1>
        <p className="text-gray-600">
          {new Date(article.frontmatter.date).toLocaleDateString()}
        </p>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </div>
  );
}

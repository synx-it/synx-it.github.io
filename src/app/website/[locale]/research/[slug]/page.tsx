import { getArticle, getSortedArticles, markdownToHtml } from "@/lib/articles";
import { notFound } from "next/navigation";
import { SupportedLocale } from "@/i18n";

export async function generateStaticParams() {
  const locales: SupportedLocale[] = ["en", "it"];
  const paths = await Promise.all(
    locales.map(async (locale) => {
      const articles = await getSortedArticles("research", locale);
      return articles.map((article) => ({
        locale: locale,
        slug: article.slug,
      }));
    })
  );

  return paths.flat();
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string; locale: SupportedLocale }>;
}) {
  const { locale, slug } = await params;
  const article = await getArticle("research", slug, locale);

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

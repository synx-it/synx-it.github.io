import { getSortedArticles } from "@/lib/articles";
import Image from "next/image";
import Link from "next/link";
import { i18n, type SupportedLocale } from "@/i18n";
import { t } from "@/i18n";
import { Metadata } from "next";

// Generate static params for all supported locales
export function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    locale,
  }));
}

export const dynamicParams = false;

// This is a server component that fetches data
async function ArticlesPageContent({ locale }: { locale: SupportedLocale }) {
  // Fetch all articles in parallel
  const [productArticles, researchArticles] = await Promise.all([
    getSortedArticles("products", locale),
    getSortedArticles("research", locale),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-6 md:px-12 py-8 md:py-12">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-slate-700 font-medium">
            <li className="text-slate-900 font-bold">
              {t(locale, "articles.title")}
            </li>
          </ol>
        </nav>



        {/* Products Section */}
        {productArticles.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-slate-900 hover:text-primary transition-colors cursor-pointer group">
                <a href={`/${locale}/products`} className="flex items-center group">
                  {t(locale, "articles.products")}
                  <svg className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </h2>
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {productArticles.length}{" "}
                {productArticles.length === 1
                  ? t(locale, "articles.countSingular")
                  : t(locale, "articles.countPlural")}
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productArticles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  type="product"
                  locale={locale}
                />
              ))}
            </div>
          </section>
        )}

        {/* Research Section */}
        {researchArticles.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-slate-900 hover:text-primary transition-colors cursor-pointer group">
                <a href={`/${locale}/research`} className="flex items-center group">
                  {t(locale, "articles.research")}
                  <svg className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </h2>
              <div className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium">
                {researchArticles.length}{" "}
                {researchArticles.length === 1
                  ? t(locale, "articles.countSingular")
                  : t(locale, "articles.countPlural")}
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {researchArticles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  type="research"
                  locale={locale}
                />
              ))}
            </div>
          </section>
        )}

        {productArticles.length === 0 && researchArticles.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-12 h-12 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {t(locale, "articles.empty.title")}
            </h3>
            <p className="text-slate-600">
              {t(locale, "articles.empty.description")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

interface Article {
  slug: string;
  frontmatter: {
    title: string;
    description?: string;
    date: string;
    image?: string;
    author?: string;
  };
}

interface ArticleCardProps {
  article: Article;
  type: "product" | "research";
  locale: SupportedLocale;
}

function ArticleCard({ article, type, locale }: ArticleCardProps) {




  return (
    <Link
      href={`/${locale}/${type === "product" ? "products" : type}/${
        article.slug
      }`}
      className="group block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
        {article.frontmatter.image && (
          <Image
            src={`/${article.frontmatter.image}`}
            alt={article.frontmatter.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
          {article.frontmatter.title}
        </h3>

        {article.frontmatter.description && (
          <p className="text-slate-600 text-sm mb-4 line-clamp-3">
            {article.frontmatter.description}
          </p>
        )}

        <div className="space-y-3">
          {article.frontmatter.author && (
            <div className="flex items-center text-xs text-slate-500">
              <span className="font-medium">{t(locale, "articles.by")}:</span>
              <span className="ml-1">{article.frontmatter.author}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-slate-500">
              <span className="text-xs">
                {t(locale, "articles.published")}:
              </span>
              <time className="font-medium" dateTime={article.frontmatter.date}>
                {new Date(article.frontmatter.date).toLocaleDateString(
                  locale === "it" ? "it-IT" : "en-US",
                  {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
              </time>
            </div>
            <span className="text-primary font-medium group-hover:translate-x-1 transition-transform">
              {t(locale, "articles.readMore")} →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// SEO Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SupportedLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const title = t(locale, "articles.title");
  const description = t(locale, "articles.description");

  return {
    title,
    description,
    keywords: [
      "biomedical research",
      "AI healthcare",
      "machine learning",
      "medical innovation",
      "synx articles",
      "healthcare technology",
      "biomedical AI",
      "research insights",
      "product innovations",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/${locale}/articles`,
      images: [
        {
          url: `${baseUrl}/logo_bg.png`,
          width: 1200,
          height: 630,
          alt: "SynX Articles",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/logo_bg.png`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/articles`,
      languages: {
        en: `${baseUrl}/en/articles`,
        it: `${baseUrl}/it/articles`,
      },
    },
  };
}

// This is the main page component
export default async function Page({
  params,
}: {
  params: Promise<{ locale: SupportedLocale }>;
}) {
  const { locale } = await params;
  return <ArticlesPageContent locale={locale} />;
}

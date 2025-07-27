import { getSortedArticles } from "@/lib/articles";
import Image from "next/image";
import Link from "next/link";
import { i18n, type SupportedLocale } from "@/i18n";
import { t } from "@/i18n";
import { Metadata } from "next";

// SEO Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SupportedLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const title = t(locale, "research.title");
  const description = t(locale, "research.description");

  return {
    title,
    description,
    keywords: [
      "biomedical research",
      "AI research",
      "machine learning research",
      "medical research",
      "synx research",
      "healthcare research",
      "biomedical AI",
      "research insights",
      "medical innovation",
      "biotech research",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/${locale}/research`,
      images: [
        {
          url: `${baseUrl}/logo_bg.png`,
          width: 1200,
          height: 630,
          alt: title,
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
      canonical: `${baseUrl}/${locale}/research`,
    },
  };
}

// This is the main page component
export default async function ResearchPage({
  params,
}: {
  params: Promise<{ locale: SupportedLocale }>;
}) {
  const { locale } = await params;

  const researchArticles = await getSortedArticles("research", locale);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-6 md:px-12 py-8 md:py-12">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-slate-700 font-medium">
            <li>
              <a
                href={`/${locale}/articles`}
                className="hover:text-primary transition-colors"
              >
                {t(locale, "articles.title")}
              </a>
            </li>
            <li>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li className="text-slate-900 font-bold">{t(locale, "caseStudies.research.title")}</li>
          </ol>
        </nav>

        {researchArticles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                locale={locale}
              />
            ))}
          </div>
        ) : (
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
  locale: SupportedLocale;
}

function ArticleCard({ article, locale }: ArticleCardProps) {
  return (
    <Link
      href={`/${locale}/research/${article.slug}`}
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
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-secondary transition-colors">
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
              <span>
                {t(locale, "articles.by")} {article.frontmatter.author}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between">
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

            <span className="text-secondary font-medium group-hover:translate-x-1 transition-transform">
              {t(locale, "articles.readMore")} →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export const dynamicParams = false;

// Generate static params for all supported locales
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    locale,
  }));
}

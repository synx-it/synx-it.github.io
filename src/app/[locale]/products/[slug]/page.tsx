import { getArticle, getSortedArticles, markdownToHtml } from "@/lib/articles";
import { notFound } from "next/navigation";
import { i18n, type SupportedLocale } from "@/i18n";
import { Metadata } from "next";

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

// SEO Metadata for individual product articles
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SupportedLocale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const article = await getArticle("products", slug, locale);
  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  const title = article.frontmatter.title;
  const description =
    article.frontmatter.description ||
    `Learn about ${article.frontmatter.title} and how SynX is advancing biomedical innovation through AI and machine learning.`;
  const imageUrl = article.frontmatter.image
    ? `${baseUrl}/${article.frontmatter.image}`
    : `${baseUrl}/logo_bg.png`;

  return {
    title,
    description: String(description),
    keywords: [
      "biomedical AI",
      "healthcare innovation",
      "machine learning",
      "medical technology",
      "synx product",
      "biomedical research",
      "AI healthcare",
      "healthcare technology",
      "medical innovation",
      "synx solutions",
    ],
    openGraph: {
      title,
      description: String(description),
      type: "article",
      url: `${baseUrl}/${locale}/products/${slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime: new Date(article.frontmatter.date).toISOString(),
      modifiedTime: new Date(article.frontmatter.date).toISOString(),
      section: "Products",
      tags: ["biomedical AI", "healthcare", "innovation"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: String(description),
      images: [imageUrl],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/products/${slug}`,
    },
  };
}

// This is the main page component
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: SupportedLocale; slug: string }>;
}) {
  const { locale, slug } = await params;

  const article = await getArticle("products", slug, locale);
  if (!article) {
    notFound();
  }

  const contentHtml = await markdownToHtml(article.content);

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.frontmatter.title,
    description: article.frontmatter.description,
    image: article.frontmatter.image
      ? `/${article.frontmatter.image}`
      : "/logo_bg.png",
    datePublished: article.frontmatter.date,
    dateModified: article.frontmatter.date,
    author: {
      "@type": "Person",
      name: String(article.frontmatter.author || "SynX Team"),
    },
    publisher: {
      "@type": "Organization",
      name: "SynX",
      logo: {
        "@type": "ImageObject",
        url: "/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/website/${locale}/products/${slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto px-6 md:px-12 py-8 md:py-12">
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-slate-700 font-medium">
            <li>
              <a href={`/website/${locale}/articles`} className="hover:text-primary transition-colors">
                All Articles
              </a>
            </li>
            <li>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li>
              <a href={`/website/${locale}/products`} className="hover:text-primary transition-colors">
                Products
              </a>
            </li>
            <li>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li className="text-slate-900 font-bold truncate max-w-xs">
              {article.frontmatter.title}
            </li>
          </ol>
        </nav>
        
        <article className="mx-auto max-w-4xl bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Article Header */}
          <header className="mb-8 pb-8 border-b border-slate-200">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                Product
              </span>
              <span>•</span>
              <time dateTime={article.frontmatter.date}>
                {new Date(article.frontmatter.date).toLocaleDateString(
                  locale === "it" ? "it-IT" : "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </time>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
              {article.frontmatter.title}
            </h1>

            {article.frontmatter.description && (
              <p className="text-xl text-slate-600 leading-relaxed">
                {article.frontmatter.description}
              </p>
            )}
          </header>

          {/* Article Content */}
          <div
            className="prose prose-lg prose-slate max-w-none 
                       prose-headings:font-bold prose-headings:text-slate-900
                       prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
                       prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
                       prose-p:text-lg prose-p:leading-relaxed prose-p:text-slate-700
                       prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                       prose-strong:text-slate-900 prose-strong:font-semibold
                       prose-ul:text-slate-700 prose-ul:leading-relaxed
                       prose-ol:text-slate-700 prose-ol:leading-relaxed
                       prose-blockquote:border-l-primary prose-blockquote:bg-slate-50
                       prose-code:bg-slate-100 prose-code:text-slate-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                       prose-pre:bg-slate-900 prose-pre:text-slate-100"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>
      </div>
    </div>
  );
}

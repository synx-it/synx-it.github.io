import React from "react";
import { t, SupportedLocale } from "../i18n";

import Link from "next/link";

import { Article } from "../lib/articles";

interface CaseStudiesProps {
  locale: SupportedLocale;
  productArticles: Article[];
  researchArticles: Article[];
}

const CaseStudies: React.FC<CaseStudiesProps> = ({
  locale,
  productArticles,
  researchArticles,
}) => {

  const renderArticle = (
    article: Article,
    category: "products" | "research"
  ) => (
    <Link href={`/${locale}/${category}/${article.slug}`} key={article.slug}>
      <div className="group bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 p-8 transition-all duration-300 hover:shadow-2xl hover:border-primary/30 hover:-translate-y-2 flex flex-col h-full cursor-pointer overflow-hidden">
        <div className="flex items-start justify-between mb-6">
          <span
            className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
              category === "products"
                ? "bg-blue-50 text-blue-700 border border-blue-200"
                : "bg-purple-50 text-purple-700 border border-purple-200"
            }`}
          >
            {category === "products"
              ? t(locale, "caseStudies.products.badge")
              : t(locale, "caseStudies.research.badge")}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors duration-300">
          {article.frontmatter.title}
        </h3>
        <p className="text-slate-600 text-base leading-relaxed flex-grow mb-6">
          {article.frontmatter.summary}
        </p>
        <div className="flex items-center text-sm font-medium group-hover:text-primary transition-colors duration-300">
          <span className="mr-1">{t(locale, "caseStudies.readMore")}</span>
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );

  return (
    <section
      id="case-studies"
      className="py-20 md:py-32 bg-slate-50"
      style={{ scrollMarginTop: "100px" }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tighter mb-4">
            {t(locale, "caseStudies.title")}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t(locale, "caseStudies.description")}
          </p>
        </div>

        {/* Products Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-secondary-foreground tracking-tighter mb-8 text-center">
            {t(locale, "caseStudies.products.title")} ({productArticles.length})
          </h3>
          {productArticles.length === 0 ? (
            <div className="text-center text-gray-500">
              <p>No products available</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 text-left">
              {productArticles.map((article) =>
                renderArticle(article, "products")
              )}
            </div>
          )}
        </div>

        {/* Research Section */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-secondary-foreground tracking-tighter mb-8 text-center">
            {t(locale, "caseStudies.research.title")}
          </h3>
          <div className="grid md:grid-cols-1 gap-8 text-left justify-center">
            <div className="max-w-2xl mx-auto">
              {researchArticles.map((article) =>
                renderArticle(article, "research")
              )}
            </div>
          </div>
        </div>

        {/* View All Articles CTA */}
        <div className="max-w-5xl mx-auto mt-16 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              {t(locale, "caseStudies.viewAll.title")}
            </h3>
            <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
              {t(locale, "caseStudies.viewAll.description")}
            </p>
            <Link
              href={`/${locale}/articles`}
              className="inline-flex items-center bg-primary text-white hover:bg-tertiary transition-colors font-semibold text-lg px-8 py-4 rounded-full"
            >
              {t(locale, "caseStudies.viewAll.button")}
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;

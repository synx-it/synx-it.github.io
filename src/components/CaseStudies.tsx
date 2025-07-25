import React from 'react';
import { t, SupportedLocale } from '../i18n';

import { Briefcase, Lightbulb } from 'lucide-react';
import Link from 'next/link';

import { Article } from '../lib/articles';

interface CaseStudiesProps {
  locale: SupportedLocale;
  productArticles: Article[];
  researchArticles: Article[];
}

const CaseStudies: React.FC<CaseStudiesProps> = ({ locale, productArticles, researchArticles }) => {

  const renderArticle = (article: Article, category: 'products' | 'research', icon: React.ReactNode) => (
    <Link href={`/website/${locale}/${category}/${article.slug}`} key={article.slug}>
      <div className="bg-white rounded-lg border border-gray-200 p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full cursor-pointer">
        <div className="w-8 h-8 text-primary mb-4">{icon}</div>
        <h3 className="text-2xl font-bold text-secondary-foreground mb-2">{article.frontmatter.title}</h3>
        <p className="text-lg text-gray-700">{article.frontmatter.summary}</p>
      </div>
    </Link>
  );

  return (
    <section id="case-studies" className="py-20 md:py-32 bg-slate-50" style={{ scrollMarginTop: '100px' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tighter mb-4">{t(locale, 'caseStudies.title')}</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t(locale, 'caseStudies.description')}
          </p>
        </div>

        {/* Products Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-secondary-foreground tracking-tighter mb-8 text-center">{t(locale, 'caseStudies.products.title')}</h3>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {productArticles.map((article) => renderArticle(article, 'products', <Briefcase />))}
          </div>
        </div>

        {/* Research Section */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-secondary-foreground tracking-tighter mb-8 text-center">{t(locale, 'caseStudies.research.title')}</h3>
          <div className="grid md:grid-cols-1 gap-8 text-left justify-center">
            <div className="max-w-2xl mx-auto">
              {researchArticles.map((article) => renderArticle(article, 'research', <Lightbulb />))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;

import React from 'react';
import { t, SupportedLocale } from '../i18n';
import { Briefcase, Lightbulb, Target } from 'lucide-react';

interface CaseStudiesProps {
  locale: SupportedLocale;
}

const CaseStudies: React.FC<CaseStudiesProps> = ({ locale }) => {
  return (
    <section id="case-studies" className="py-20 md:py-32 bg-slate-50" style={{ scrollMarginTop: '100px' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tighter mb-4">{t(locale, 'caseStudies.title')}</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t(locale, 'caseStudies.description')}
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-left">
          {/* Case Study 1 */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <Briefcase className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-2xl font-bold text-secondary-foreground mb-2">{t(locale, 'caseStudies.study1.title')}</h3>
            <p className="text-lg text-gray-700">{t(locale, 'caseStudies.study1.description')}</p>
          </div>
          {/* Case Study 2 */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <Lightbulb className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-2xl font-bold text-secondary-foreground mb-2">{t(locale, 'caseStudies.study2.title')}</h3>
            <p className="text-lg text-gray-700">{t(locale, 'caseStudies.study2.description')}</p>
          </div>
          {/* Case Study 3 */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <Target className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-2xl font-bold text-secondary-foreground mb-2">{t(locale, 'caseStudies.study3.title')}</h3>
            <p className="text-lg text-gray-700">{t(locale, 'caseStudies.study3.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;

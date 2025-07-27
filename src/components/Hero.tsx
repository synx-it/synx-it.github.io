import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { t, SupportedLocale } from '../i18n';


interface HeroProps {
  locale: SupportedLocale;
}

const Hero: React.FC<HeroProps> = ({ locale = 'en' }) => {
  return (
    <section className="relative h-screen flex items-center justify-center text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/0e0eec45-d359-4338-98e7-562ad6638e9f.png`}
          alt="Hero Background"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="container px-4 py-16 text-center relative z-10 flex flex-col items-center justify-center animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
          {t(locale, 'hero.title')}
        </h1>
        <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto mb-8">
          {t(locale, 'hero.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <a href="#case-studies" className="bg-primary text-white hover:bg-tertiary transition-colors font-semibold text-lg px-10 py-3 rounded-full">
            {t(locale, 'hero.cta')}
          </a>
          <Link 
            href={`/${locale}/articles`}
            className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors font-semibold text-lg px-10 py-3 rounded-full"
          >
            {t(locale, 'hero.browseArticles')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

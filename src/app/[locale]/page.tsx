import { getSortedArticles } from "@/lib/articles";
import Hero from "@/components/Hero";
import CaseStudies from "@/components/CaseStudies";
import Contact from "@/components/Contact";
import { i18n, type SupportedLocale } from "@/i18n";
import { Metadata } from "next";
import { t } from "@/i18n";

// Generate static params for all supported locales
export function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    locale,
  }));
}

export const dynamicParams = false; // No fallback: 404 for unknown locales

// This is a server component that fetches data
async function HomePageContent({ locale }: { locale: SupportedLocale }) {
  // Fetch data in parallel
  const [productArticles, researchArticles] = await Promise.all([
    getSortedArticles("products", locale),
    getSortedArticles("research", locale),
  ]);

  const slicedProducts = productArticles.slice(0, 2);
  const slicedResearch = researchArticles.slice(0, 1);

  return (
    <>
      <Hero locale={locale} />
      <CaseStudies
        locale={locale}
        productArticles={slicedProducts}
        researchArticles={slicedResearch}
      />
      <Contact locale={locale} />
    </>
  );
}

// SEO Metadata for homepage
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: SupportedLocale }> 
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH || '';
  
  return {
    title: t(locale, 'hero.title'),
    description: t(locale, 'hero.subtitle'),
    keywords: [
      'SynX',
      'biomedical AI',
      'healthcare innovation',
      'machine learning',
      'medical technology',
      'AI healthcare',
      'biomedical research',
      'healthcare solutions',
      'medical AI',
      'biomedical engineering',
      'healthcare technology',
      'AI medical devices',
      'biomedical innovation',
      'healthcare transformation'
    ],
    openGraph: {
      title: t(locale, 'hero.title'),
      description: t(locale, 'hero.subtitle'),
      type: 'website',
      url: `${baseUrl}/${locale}`,
      images: [
        {
          url: `${baseUrl}/logo_bg.png`,
          width: 1200,
          height: 630,
          alt: 'SynX - Biomedical AI Innovation',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t(locale, 'hero.title'),
      description: t(locale, 'hero.subtitle'),
      images: [`${baseUrl}/logo_bg.png`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'en': `${baseUrl}/en`,
        'it': `${baseUrl}/it`,
      },
    },
  };
}

// This is the main page component
export const revalidate = 60; // Revalidate every 60 seconds

export default async function Page({
  params,
}: {
  params: Promise<{ locale: SupportedLocale }>;
}) {
  const { locale } = await params;
  return <HomePageContent locale={locale} />;
}

import { getSortedArticles } from "@/lib/articles";
import Hero from "@/components/Hero";
import CaseStudies from "@/components/CaseStudies";
import Contact from "@/components/Contact";
import { i18n, type SupportedLocale } from "@/i18n";

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

// This is the main page component
export default async function Page({
  params,
}: {
  params: Promise<{ locale: SupportedLocale }>;
}) {
  const { locale } = await params;
  return <HomePageContent locale={locale} />;
}

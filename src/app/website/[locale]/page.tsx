import { getSortedArticles } from "@/lib/articles";
import Hero from "@/components/Hero";
import CaseStudies from "@/components/CaseStudies";
import Contact from "@/components/Contact";
import type { SupportedLocale } from "@/i18n";

export default async function Home({
  params,
}: {
  params: { locale: SupportedLocale };
}) {
  const { locale } = await params;
  const productArticles = await getSortedArticles("products", locale);
  const researchArticles = await getSortedArticles("research", locale);
  
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

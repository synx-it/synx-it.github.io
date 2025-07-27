import { MetadataRoute } from 'next';
import { i18n } from '@/i18n';
import { getSortedArticles } from '@/lib/articles';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://synx-it.github.io/website';
  
  // Get all articles for dynamic URLs
  const allArticles = await Promise.all(
    (i18n.locales as Array<'en' | 'it'>).map(async (locale) => {
      const [products, research] = await Promise.all([
        getSortedArticles('products', locale),
        getSortedArticles('research', locale)
      ]);
      
      return {
        locale,
        products: products.map(article => ({
          slug: article.slug,
          lastModified: new Date(article.frontmatter.date || Date.now())
        })),
        research: research.map(article => ({
          slug: article.slug,
          lastModified: new Date(article.frontmatter.date || Date.now())
        }))
      };
    })
  );

  const sitemap: MetadataRoute.Sitemap = [];

  // Add homepage URLs for each locale
  i18n.locales.forEach(locale => {
    sitemap.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    });
  });

  // Add articles listing page URLs
  i18n.locales.forEach(locale => {
    sitemap.push({
      url: `${baseUrl}/${locale}/articles`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  });

  // Add individual product and research articles
  allArticles.forEach(({ locale, products, research }) => {
    // Product articles
    products.forEach(({ slug, lastModified }) => {
      sitemap.push({
        url: `${baseUrl}/${locale}/products/${slug}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });

    // Research articles
    research.forEach(({ slug, lastModified }) => {
      sitemap.push({
        url: `${baseUrl}/${locale}/research/${slug}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });
  });

  return sitemap;
}

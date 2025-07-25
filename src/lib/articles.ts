import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export interface Article {
  slug: string;
  frontmatter: {
    [key: string]: string | number | boolean;
    title: string;
    date: string;
    summary: string;
    lang: 'en' | 'it';
  };
  content: string;
}

export async function getSortedArticles(category: 'products' | 'research', locale: 'en' | 'it'): Promise<Article[]> {
  const categoryDirectory = path.join(contentDirectory, locale, category);
  
  try {
    const fileNames = await fs.readdir(categoryDirectory);
    const allArticlesData = await Promise.all(
      fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(async fileName => {
          const slug = fileName.replace(/\.md$/, '');
          const fullPath = path.join(categoryDirectory, fileName);
          const fileContents = await fs.readFile(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          return {
            slug,
            frontmatter: data as Article['frontmatter'],
            content,
          };
        })
    );

    return allArticlesData.sort((a, b) => {
      if (a.frontmatter.date < b.frontmatter.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch {
    // If the directory doesn't exist, return an empty array
    return [];
  }
}

export async function getArticle(category: 'products' | 'research', slug: string, locale: 'en' | 'it'): Promise<Article | undefined> {
  const filePath = path.join(contentDirectory, locale, category, `${slug}.md`);

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data as Article['frontmatter'],
      content,
    };
  } catch {
    // If the file doesn't exist, return undefined
    return undefined;
  }
}

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

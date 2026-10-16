import { MetadataRoute } from 'next';
import { flatDocsNavigation } from '@/features/docs/config/docs-navigation.config';
import { allParserSlugs } from '@/features/docs/data/parsers.data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://paramsync.dev';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/playground`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/use-cases`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const parserRoutes: MetadataRoute.Sitemap = allParserSlugs.map((slug) => ({
    url: `${baseUrl}/docs/parsers/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const docNavRoutes: MetadataRoute.Sitemap = flatDocsNavigation
    .filter((item) => !item.href.startsWith('http') && !item.href.includes('/parsers/'))
    .map((item) => ({
      url: `${baseUrl}${item.href}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  return [...staticRoutes, ...parserRoutes, ...docNavRoutes];
}

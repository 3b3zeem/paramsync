import { Metadata } from 'next';
import { RecipesDocView } from '@/features/docs/views/RecipesDocView';
import { JsonLd } from '@/components/shared/JsonLd';

export const metadata: Metadata = {
  title: 'Integration Recipes',
  description: 'Production integration recipes for paramsync: TanStack Query, React Server Components (RSC), and URL-driven modal routing.',
  alternates: { canonical: 'https://paramsync.dev/docs/recipes' },
  openGraph: {
    title: 'Integration Recipes | paramsync',
    description: 'Production recipes for TanStack Query, RSC, and URL-driven modal routing in Next.js.',
    url: 'https://paramsync.dev/docs/recipes',
    siteName: 'paramsync',
    type: 'article',
    images: [
      {
        url: 'https://paramsync.dev/api/og?title=Integration%20Recipes&category=Recipes&desc=Production%20recipes%20for%20TanStack%20Query%2C%20React%20Server%20Components%2C%20and%20modal%20routing.',
        width: 1200,
        height: 630,
        alt: 'Integration Recipes - paramsync',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Integration Recipes | paramsync',
    description: 'Production integration recipes for paramsync with TanStack Query and RSC.',
    images: [
      'https://paramsync.dev/api/og?title=Integration%20Recipes&category=Recipes&desc=Production%20recipes%20for%20TanStack%20Query%2C%20React%20Server%20Components%2C%20and%20modal%20routing.',
    ],
    creator: '@paramsync',
  },
};

export default function RecipesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'paramsync Integration Recipes',
    description: 'Practical recipes for combining paramsync with Next.js App Router and TanStack Query.',
    url: 'https://paramsync.dev/docs/recipes',
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <RecipesDocView />
    </>
  );
}

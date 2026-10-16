import { Metadata } from 'next';
import { UseCasesView } from '@/features/use-cases/views/UseCasesView';
import { JsonLd } from '@/components/shared/JsonLd';

export const metadata: Metadata = {
  title: 'Real-World Recipes & Use Cases',
  description:
    'Explore production recipes and design patterns using paramsync: e-commerce product grids, data tables, and analytics filter drawers.',
  alternates: {
    canonical: 'https://paramsync.dev/use-cases',
  },
  openGraph: {
    title: 'Real-World Recipes & Use Cases | paramsync',
    description: 'Production recipes for e-commerce, data tables, and analytics filter drawers in Next.js.',
    url: 'https://paramsync.dev/use-cases',
    siteName: 'paramsync',
    type: 'website',
    images: [
      {
        url: 'https://paramsync.dev/api/og?title=Real-World%20Use%20Cases&category=Showcase&desc=Production%20recipes%20for%20e-commerce%20catalogs%2C%20data%20tables%2C%20and%20analytics%20filter%20drawers.',
        width: 1200,
        height: 630,
        alt: 'Real-World Use Cases - paramsync',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Real-World Recipes & Use Cases | paramsync',
    description: 'Production patterns and real-world recipes for paramsync in Next.js.',
    images: [
      'https://paramsync.dev/api/og?title=Real-World%20Use%20Cases&category=Showcase&desc=Production%20recipes%20for%20e-commerce%20catalogs%2C%20data%20tables%2C%20and%20analytics%20filter%20drawers.',
    ],
    creator: '@paramsync',
  },
};

export default function UseCasesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'paramsync Real-World Recipes & Use Cases',
    url: 'https://paramsync.dev/use-cases',
    description: 'Collection of production recipes for URL query state management in Next.js.',
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <UseCasesView />
    </>
  );
}

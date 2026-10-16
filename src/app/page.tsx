import { Metadata } from 'next';
import { HomeView } from '@/features/home/views/HomeView';
import { JsonLd } from '@/components/shared/JsonLd';

export const metadata: Metadata = {
  title: 'paramsync | Type-Safe URL Query State Manager for Next.js',
  description:
    'Zero-overhead, type-safe URL Search Parameters state manager for React 18+ and Next.js App Router applications with 0ms typing latency, Clean URL policy, and atomic batch transitions.',
  alternates: {
    canonical: 'https://paramsync.dev',
  },
  openGraph: {
    title: 'paramsync | Type-Safe URL Query State Manager for Next.js',
    description:
      'Zero-overhead, type-safe URL Search Parameters state manager with 0ms typing latency, Clean URL policy, and atomic batch transitions.',
    url: 'https://paramsync.dev',
    siteName: 'paramsync',
    type: 'website',
    images: [
      {
        url: 'https://paramsync.dev/api/og?title=paramsync&category=Open%20Source%20Library&desc=Type-Safe%20URL%20Query%20State%20Manager%20for%20Next.js%20and%20React%20with%200ms%20typing%20latency%20and%20Clean%20URL%20policy.',
        width: 1200,
        height: 630,
        alt: 'paramsync - Type-Safe URL Query State Manager for Next.js',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'paramsync | Type-Safe URL Query State Manager for Next.js',
    description:
      'Zero-overhead, type-safe URL Search Parameters state manager for React 18+ and Next.js.',
    images: [
      'https://paramsync.dev/api/og?title=paramsync&category=Open%20Source%20Library&desc=Type-Safe%20URL%20Query%20State%20Manager%20for%20Next.js%20and%20React%20with%200ms%20typing%20latency%20and%20Clean%20URL%20policy.',
    ],
    creator: '@paramsync',
  },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'paramsync',
        url: 'https://paramsync.dev',
        description: 'Type-Safe URL Query State Manager for Next.js and React',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://paramsync.dev/docs?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'paramsync',
        operatingSystem: 'Any',
        applicationCategory: 'DeveloperApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Zero-overhead, type-safe URL Search Parameters state manager for React 18+ and Next.js App Router applications.',
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <HomeView />
    </>
  );
}

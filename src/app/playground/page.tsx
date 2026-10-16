import { Metadata } from 'next';
import { PlaygroundView } from '@/features/playground/views/PlaygroundView';
import { JsonLd } from '@/components/shared/JsonLd';

export const metadata: Metadata = {
  title: 'Interactive Playground',
  description:
    'Live interactive sandbox demonstrating real-time URL state synchronization, Clean URL purging, keystroke debouncing, and batch drawer commits in Next.js.',
  alternates: {
    canonical: 'https://paramsync.dev/playground',
  },
  openGraph: {
    title: 'Interactive Playground | paramsync',
    description:
      'Test real-time parameter synchronization, debounce delays, and batch navigation updates in Next.js.',
    url: 'https://paramsync.dev/playground',
    siteName: 'paramsync',
    type: 'website',
    images: [
      {
        url: 'https://paramsync.dev/api/og?title=Interactive%20Playground&category=Interactive%20Demo&desc=Live%20sandbox%20demonstrating%20real-time%20URL%20state%20synchronization%2C%20Clean%20URL%20policy%2C%20and%20batch%20commits.',
        width: 1200,
        height: 630,
        alt: 'Interactive Playground - paramsync',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interactive Playground | paramsync',
    description: 'Zero-overhead Next.js URL Search Params sandbox.',
    images: [
      'https://paramsync.dev/api/og?title=Interactive%20Playground&category=Interactive%20Demo&desc=Live%20sandbox%20demonstrating%20real-time%20URL%20state%20synchronization%2C%20Clean%20URL%20policy%2C%20and%20batch%20commits.',
    ],
    creator: '@paramsync',
  },
};

export default function PlaygroundPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'paramsync Interactive Playground',
    url: 'https://paramsync.dev/playground',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    description: 'Interactive sandbox for testing Next.js type-safe URL query state management.',
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PlaygroundView />
    </>
  );
}

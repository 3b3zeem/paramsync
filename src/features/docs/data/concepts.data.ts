export interface ConceptDocItem {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  keyTakeaways: string[];
  codeSnippet: string;
  deepDiveSections?: {
    heading: string;
    content: string;
  }[];
}

export const conceptsData: Record<string, ConceptDocItem> = {
  'clean-url-policy': {
    slug: 'clean-url-policy',
    title: 'Clean URL Policy',
    summary: 'The automatic parameter omission engine keeping Next.js query strings clean, human-readable, and SEO canonical.',
    problem:
      'Standard Next.js applications using manual URLSearchParams serialize empty strings (?q=), empty lists (?tags=), and initial default parameters (?page=1&status=all). This creates unsightly URLs, ruins link sharing, harms SEO canonical parity, and pollutes analytics attribution dashboards.',
    solution:
      'paramsync enforces a strict Clean URL Policy by default. Any parameter whose state value equals its registered default, is an empty string (""), an empty array ([]), or null/undefined is purged immediately from the query string without altering internal component state.',
    keyTakeaways: [
      'Canonical URLs: Root views remain /products rather than /products?q=&page=1.',
      'Automatic Purge: Resetting a controlled input to empty string deletes the key from the URL instantly.',
      'Deep Equality Comparison: Arrays and objects are checked via areValuesEqual() against parser defaults.',
      'Zero Typing Lag: Controlled inputs update React state immediately while background URL updates reflect the clean policy.',
    ],
    codeSnippet: `'use client';

import { useQueryState, parseAsString, parseAsArray, parseAsInteger } from 'paramsync';

export function CleanFilterBar() {
  // Omitted from URL when search is ""
  const [search, setSearch] = useQueryState('q', parseAsString.withDefault(''));

  // Omitted from URL when categories is []
  const [categories, setCategories] = useQueryState('cat', parseAsArray(parseAsString));

  // Omitted from URL when page is 1
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  // Result when defaults are set: https://paramsync.dev/products (100% Clean)
  // Result when filtering: https://paramsync.dev/products?q=shoes&cat=running&page=2
  return <div>...</div>;
}`,
    deepDiveSections: [
      {
        heading: 'Clean URL Decision Matrix',
        content:
          '1. value === "" (empty string) => Key removed from URL.\n2. value === defaultValue => Key removed from URL.\n3. Array.isArray(value) && value.length === 0 => Key removed from URL.\n4. value === null || value === undefined => Key removed from URL.',
      },
    ],
  },

  'suspense-boundaries': {
    slug: 'suspense-boundaries',
    title: 'Suspense Boundaries & Gotchas',
    summary: 'Ensuring Next.js App Router static optimization and preventing hydration mismatches when reading URL state.',
    problem:
      'In Next.js App Router, using hooks that access client-side search parameters (such as useSearchParams() or useQueryState()) directly inside a page causes Next.js to de-optimize static generation (SSG) and opt into dynamic client-side rendering for the entire route unless wrapped in a React Suspense boundary.',
    solution:
      'Always wrap components that call useQueryState or useBatchQueryParams inside a <Suspense fallback={...}> boundary, or place the Suspense boundary at the parent route level. This permits Next.js to statically optimize the outer shell while streaming or hydrating the query-driven component.',
    keyTakeaways: [
      'Preserves Next.js static page generation and Turbo prefetching.',
      'Prevents SSR hydration mismatch errors.',
      'Provides instantaneous loading skeleton fallback while search params initialize.',
    ],
    codeSnippet: `// app/catalog/page.tsx
import { Suspense } from 'react';
import { CatalogFeed } from '@/features/catalog/components/CatalogFeed';

export default function CatalogPage() {
  return (
    <main>
      <h1>Product Catalog</h1>
      {/* Required Suspense boundary for useQueryState */}
      <Suspense fallback={<div>Loading filters...</div>}>
        <CatalogFeed />
      </Suspense>
    </main>
  );
}`,
  },

  'stale-page-prevention': {
    slug: 'stale-page-prevention',
    title: 'Stale Page Prevention',
    summary: 'Techniques for preventing orphaned pagination states when filter criteria are modified.',
    problem:
      'A user browses to page 7 of an e-commerce catalog (?page=7). They then type a specific search keyword "mechanical keyboard" which only returns 3 products (1 single page of results). If the page state remains 7, the catalog displays a blank "No products found" error despite matching products existing on page 1.',
    solution:
      'paramsync makes page index resets effortless. Because parseAsInteger.withDefault(1) purges page=1 from the URL under the Clean URL Policy, calling setPage(1) whenever filter criteria change resets internal state and keeps the URL completely clean.',
    keyTakeaways: [
      'Always reset page to 1 whenever search, categories, or price bounds change.',
      'Under the Clean URL Policy, page=1 is automatically deleted from the URL.',
      'Use useBatchQueryParams to reset page and apply multiple filters in a single atomic history tick.',
    ],
    codeSnippet: `'use client';

import { useQueryState, parseAsString, parseAsInteger } from 'paramsync';

export function ProductCatalog() {
  const [search, setSearch] = useQueryState('q', parseAsString.withDefault(''));
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  const handleFilterChange = (newSearchTerm: string) => {
    // Reset page back to 1 (automatically cleans ?page from URL)
    if (page > 1) {
      setPage(1);
    }
    setSearch(newSearchTerm);
  };

  return <input value={search} onChange={(e) => handleFilterChange(e.target.value)} />;
}`,
  },
};

export const allConceptSlugs = Object.keys(conceptsData);

'use client';

import React from 'react';
import { CodeBlock } from '@/components/shared/CodeBlock';

const SAMPLE_CODE = `'use client';

import { useQueryState, parseAsString, parseAsArray, parseAsInteger } from 'paramsync';

export function CatalogFilters() {
  // 1. Debounced live search with 0ms input feedback
  const [search, setSearch] = useQueryState('q', parseAsString.withDefault(''), {
    debounceMs: 300,
  });

  // 2. Type-safe array of categories (omitted from URL when empty)
  const [categories, setCategories] = useQueryState(
    'categories',
    parseAsArray(parseAsString)
  );

  // 3. Auto-cleans from URL when equal to default 1
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setPage(1); // Auto-reset page on search
          setSearch(e.target.value);
        }}
        placeholder="Filter catalog..."
      />
    </div>
  );
}`;

export function HomeCodePreview() {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-16 bg-white dark:bg-[#23272f] border-b border-zinc-200 dark:border-[#323846] transition-colors">
      <div className="max-w-4xl mx-auto mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Developer-First API
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            Works like <code className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-zinc-100 dark:bg-[#191b21] px-1.5 py-0.5 rounded border border-zinc-200 dark:border-[#383f4e]">useState</code>, but seamlessly bound to URL query state.
          </p>
        </div>
        <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          TypeScript 5+ &bull; Zero boilerplate
        </span>
      </div>

      <div className="max-w-4xl mx-auto">
        <CodeBlock
          code={SAMPLE_CODE}
          language="tsx"
          filename="CatalogFilters.tsx"
        />
      </div>
    </section>
  );
}

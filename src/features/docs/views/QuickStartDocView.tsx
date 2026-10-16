'use client';

import React from 'react';
import { DocsPaginationFooter } from '../components/DocsPaginationFooter';
import { CodeBlock } from '@/components/shared/CodeBlock';
import { ShareFeatureButton } from '@/components/shared/ShareFeatureButton';

export function QuickStartDocView() {
  return (
    <article className="w-full py-6 sm:py-10 px-2 sm:px-4 md:px-6 lg:px-8">
      <header className="border-b border-zinc-200 dark:border-[#323846] pb-8 mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
            <span>paramsync</span>
            <span>&gt;</span>
            <span className="text-zinc-700 dark:text-zinc-300">quick-start</span>
          </div>

          <ShareFeatureButton
            title="Quick Start Tutorial"
            description="Learn how to bind query parameters to React state in under 5 minutes."
            url="https://paramsync.dev/docs/quick-start"
            category="Getting Started"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Quick Start Tutorial
        </h1>
        <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
          Learn how to bind query parameters to React state with zero typing latency in under 5 minutes.
        </p>
      </header>

      {/* Step 1 */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
          Step 1: Import useQueryState and Parsers
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
          Import <code className="font-mono text-blue-600 dark:text-blue-400 bg-zinc-100 dark:bg-[#191b21] px-1.5 py-0.5 rounded border border-zinc-200 dark:border-[#383f4e]">useQueryState</code> along with the built-in parser that matches your data type:
        </p>
        <CodeBlock
          code={`'use client';\n\nimport { useQueryState, parseAsString, parseAsInteger } from 'paramsync';`}
          language="tsx"
        />
      </section>

      {/* Step 2 */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
          Step 2: Create a Debounced Search Input
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
          Pass <code className="font-mono text-emerald-600 dark:text-emerald-400 bg-zinc-100 dark:bg-[#191b21] px-1.5 py-0.5 rounded border border-zinc-200 dark:border-[#383f4e]">&#123; debounceMs: 300 &#125;</code> to debounce URL updates while keeping local input state 100% instantaneous:
        </p>
        <CodeBlock
          code={`const [search, setSearch] = useQueryState(\n  'q',\n  parseAsString.withDefault(''),\n  { debounceMs: 300 }\n);`}
          language="tsx"
        />
      </section>

      {/* Step 3 */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
          Step 3: Add Pagination with Auto-Reset
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
          Reset page back to 1 when the search query changes so users don&apos;t end up on an empty page:
        </p>
        <CodeBlock
          code={`const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));\n\nconst handleSearch = (newVal: string) => {\n  setPage(1); // Cleans ?page from URL\n  setSearch(newVal);\n};`}
          language="tsx"
        />
      </section>

      {/* Full Working Component */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
          Complete Working Component
        </h2>
        <CodeBlock
          code={`'use client';

import { useQueryState, parseAsString, parseAsInteger } from 'paramsync';

export default function SearchFeed() {
  const [search, setSearch] = useQueryState(
    'q',
    parseAsString.withDefault(''),
    { debounceMs: 300 }
  );

  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
        placeholder="Filter results..."
      />

      <div className="flex items-center gap-2">
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}`}
          language="tsx"
          filename="SearchFeed.tsx"
        />
      </section>

      <DocsPaginationFooter customPath="/docs/quick-start" />
    </article>
  );
}

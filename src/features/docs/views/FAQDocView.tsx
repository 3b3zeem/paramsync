'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { DocsPaginationFooter } from '../components/DocsPaginationFooter';
import { ShareFeatureButton } from '@/components/shared/ShareFeatureButton';

interface FAQItem {
  id: string;
  category: 'General' | 'Architecture' | 'Performance' | 'Integration';
  q: string;
  a: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'diff-nuqs',
    category: 'General',
    q: 'How is paramsync different from nuqs or other query managers?',
    a: 'paramsync is designed specifically for Next.js App Router with native React 18/19 transition integration and zero wrapper boilerplate. Key differentiators include automatic Clean URL policy (empty strings, empty arrays, and defaults are purged automatically without leaving dangling query artifacts), 0ms typing responsiveness via independent input caching, atomic batch transitions across multi-filter flows without multiple history events, and strict bidirectional type validation.',
  },
  {
    id: 'suspense-boundary',
    category: 'Architecture',
    q: 'Why wrap client components reading query state in <Suspense>?',
    a: 'In Next.js App Router, reading search parameters on the client (via useSearchParams or useQueryState) de-optimizes page rendering if executed outside a <Suspense> boundary, causing Next.js to opt out of static prerendering for the parent route. Wrapping the specific client component that consumes query state inside a <Suspense> boundary ensures the rest of your page shell remains statically optimized or streamable.',
  },
  {
    id: 'rsc-compatibility',
    category: 'Architecture',
    q: 'Does paramsync work with React Server Components (RSC) and Route Handlers?',
    a: 'Yes. All parsers (parseAsString, parseAsInteger, parseAsArray, etc.) are pure JavaScript functions with zero browser or DOM runtime dependencies. You can import and invoke them directly in Server Components, Middleware, or Route Handlers to validate, narrow, and sanitize searchParams before rendering server markup.',
  },
  {
    id: 'typing-debounce',
    category: 'Performance',
    q: 'How do I debounce keystrokes on live search inputs without typing lag?',
    a: 'Pass { debounceMs: 300 } as an option to useQueryState. paramsync maintains an internal synchronous React state that updates immediately on every keystroke (0ms typing latency) while debouncing the browser URL update and subsequent router transitions in the background.',
  },
  {
    id: 'browser-history',
    category: 'Performance',
    q: 'How does paramsync prevent polluting the browser back/forward history?',
    a: 'By default, useQueryState uses history: "replace" when updating search parameters during live inputs and interactive filters, ensuring rapid updates do not create dozens of unwanted history entries. For deliberate navigation steps (such as pagination clicks or tab changes), you can configure { history: "push" }.',
  },
  {
    id: 'invalid-url-params',
    category: 'Architecture',
    q: 'What happens if a user enters an invalid or malformed value in the URL?',
    a: 'paramsync parsers enforce strict runtime validation. If a query value fails parsing (for example ?page=abc for an integer parser, or an unrecognized enum value), the parser discards the invalid value and gracefully falls back to your configured .withDefault() fallback. It will never crash or throw an unhandled runtime error.',
  },
  {
    id: 'batch-transitions',
    category: 'Integration',
    q: 'How do I update multiple query parameters atomically in a single transition?',
    a: 'Use the useBatchQueryParams hook. It allows you to stage multiple parameter changes—such as applying 5 drawer filters simultaneously—and commit them in a single atomic Next.js navigation transition. This prevents intermediate inconsistent URL states and eliminates duplicate server round-trips.',
  },
  {
    id: 'nextjs-turbopack',
    category: 'Integration',
    q: 'Is paramsync compatible with Turbopack, Next.js 14, and Next.js 15?',
    a: 'Yes. paramsync is strictly packaged with modern ESM and CJS exports, is 100% tree-shakeable, and is tested against Next.js 14, Next.js 15, React 19, and the Turbopack bundler without requiring any experimental flags.',
  },
];

type CategoryFilter = 'All' | 'General' | 'Architecture' | 'Performance' | 'Integration';

export function FAQDocView() {
  // First item open by default
  const [openIds, setOpenIds] = useState<Set<string>>(new Set([FAQ_ITEMS[0].id]));
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');

  const filteredItems = activeCategory === 'All'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter((item) => item.category === activeCategory);

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setOpenIds(new Set(filteredItems.map((item) => item.id)));
  };

  const collapseAll = () => {
    setOpenIds(new Set());
  };

  return (
    <article className="w-full py-6 sm:py-10 px-2 sm:px-4 md:px-6 lg:px-8">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-[#323846] pb-8 mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
            <span>paramsync</span>
            <span>&gt;</span>
            <span className="text-zinc-700 dark:text-zinc-300">faq</span>
          </div>

          <ShareFeatureButton
            title="Frequently Asked Questions"
            description="Answers to architectural, performance, and integration questions about paramsync."
            url="https://paramsync.dev/docs/faq"
            category="FAQ & Troubleshooting"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
          Answers to architectural, performance, and integration questions about paramsync.
        </p>
      </header>

      {/* Filter and Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {(['All', 'General', 'Architecture', 'Performance', 'Integration'] as CategoryFilter[]).map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-md text-xs font-mono transition-colors border ${
                  isActive
                    ? 'border-blue-600 bg-blue-600 text-white font-medium'
                    : 'border-zinc-200 dark:border-[#323846] bg-white dark:bg-[#23272f] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-500'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Expand / Collapse All */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <button
            type="button"
            onClick={expandAll}
            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
          >
            Expand all
          </button>
          <span className="text-zinc-300 dark:text-zinc-700">|</span>
          <button
            type="button"
            onClick={collapseAll}
            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
          >
            Collapse all
          </button>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3 mb-12">
        {filteredItems.map((item) => {
          const isOpen = openIds.has(item.id);

          return (
            <div
              key={item.id}
              className={`rounded-xl border transition-colors overflow-hidden ${
                isOpen
                  ? 'border-blue-500/40 dark:border-blue-500/40 bg-zinc-50/50 dark:bg-[#23272f]'
                  : 'border-zinc-200 dark:border-[#323846] bg-white dark:bg-[#23272f]/70 hover:border-zinc-300 dark:hover:border-zinc-600'
              }`}
            >
              {/* Accordion Trigger Header */}
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left cursor-pointer select-none group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="shrink-0 w-6 h-6 rounded-md bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <HelpCircle className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.q}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded border border-zinc-200 dark:border-[#383f4e] bg-zinc-50 dark:bg-[#191b21] text-zinc-500 dark:text-zinc-400">
                    {item.category}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 dark:text-zinc-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Accordion Expandable Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-1 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-100 dark:border-[#2a303c] mt-1 pl-13">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Pagination Footer */}
      <DocsPaginationFooter customPath="/docs/faq" />
    </article>
  );
}

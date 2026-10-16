'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { ComparisonItem } from '../types/home.types';

const COMPARISON_ITEMS: ComparisonItem[] = [
  {
    category: 'Typing Performance',
    highlight: '0ms Feedback',
    vanilla: 'Stutters typing keystrokes by re-rendering on every router push.',
    paramsync: 'Local React state updates in 0ms while URL push is debounced.',
  },
  {
    category: 'Type System',
    highlight: 'Strict Runtime',
    vanilla: 'Returns raw string | null requiring manual parsing.',
    paramsync: 'Automatic type casting for numbers, booleans, arrays, ranges, and sort.',
  },
  {
    category: 'URL Cleanliness',
    highlight: 'Canonical SEO',
    vanilla: 'Pollutes URLs with ?q=&page=1&filter=.',
    paramsync: 'Default and empty parameters are automatically removed from query string.',
  },
  {
    category: 'Batch Operations',
    highlight: 'Single Navigation',
    vanilla: 'Updating 5 inputs generates 5 router transitions and history bloat.',
    paramsync: 'Stage 10+ changes in a filter drawer and commit atomically in one step.',
  },
];

export function HomeComparison() {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-16 bg-zinc-50 dark:bg-[#191b21] text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-[#2a2f3a] transition-colors">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-3">
          Why paramsync vs Vanilla Next.js?
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Standard Next.js <code className="font-mono text-xs text-zinc-800 dark:text-zinc-200 bg-zinc-200/70 dark:bg-[#23272f] px-1 py-0.5 rounded border border-zinc-300 dark:border-[#383f4e]">useSearchParams()</code> is low-level and read-only. paramsync solves all modern URL state challenges out-of-the-box.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {COMPARISON_ITEMS.map((item) => (
          <div
            key={item.category}
            className="p-5 rounded-xl border border-zinc-200 dark:border-[#323846] bg-white dark:bg-[#23272f] flex flex-col justify-between shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  {item.category}
                </span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                  {item.highlight}
                </span>
              </div>
              <div className="space-y-2 mt-3 text-xs">
                <div className="flex items-start gap-2 text-rose-700 dark:text-rose-300">
                  <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500 dark:text-rose-400" />
                  <span>
                    <strong>Vanilla Next.js:</strong> {item.vanilla}
                  </span>
                </div>
                <div className="flex items-start gap-2 text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500 dark:text-emerald-400" />
                  <span>
                    <strong>paramsync:</strong> {item.paramsync}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick CTA inside section 4 */}
      <div className="mt-12 text-center">
        <Link
          href="/playground"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-semibold text-sm hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm"
        >
          <span>Try Interactive Sandbox</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

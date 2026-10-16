'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Copy, Zap, ShieldCheck, Layers, CheckCircle2, XCircle } from 'lucide-react';
import { CodeBlock } from '@/components/shared/CodeBlock';

type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

const INSTALL_COMMANDS: Record<PackageManager, string> = {
  npm: 'npm install paramsync',
  pnpm: 'pnpm add paramsync',
  yarn: 'yarn add paramsync',
  bun: 'bun add paramsync',
};

export function HomeView() {
  const [pm, setPm] = useState<PackageManager>('npm');
  const [copied, setCopied] = useState(false);

  const currentCommand = INSTALL_COMMANDS[pm];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="w-full">
      {/* SECTION 1: HERO -> COLOR #23272f */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 pt-16 sm:pt-24 pb-16 text-center bg-white dark:bg-[#23272f] border-b border-zinc-200 dark:border-[#323846] transition-colors">
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white max-w-4xl mx-auto leading-[1.15]">
          Type-Safe URL Query State Manager for Next.js
        </h1>

        <p className="mt-6 text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Zero typing lag, automated Clean URL parameter purging, and atomic batch transitions
          engineered specifically for modern Next.js App Router applications.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/playground"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-medium text-sm hover:opacity-90 transition-opacity shadow-xs"
          >
            <span>Interactive Playground</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/docs/parsers/parse-as-string"
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-zinc-300 dark:border-[#383f4e] bg-white dark:bg-[#191b21] text-zinc-700 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-[#2a303d] font-medium text-sm transition-colors shadow-2xs"
          >
            Read Documentation
          </Link>
        </div>

        {/* Subtle Install Command Card */}
        <div className="mt-7 max-w-md mx-auto rounded-lg border border-zinc-200 dark:border-[#383f4e] bg-zinc-50/90 dark:bg-[#191b21] p-1.5 shadow-xs">
          <div className="flex items-center justify-between gap-2 px-1 pb-1.5 border-b border-zinc-200 dark:border-[#2a2f3a]">
            {/* Package Manager Switcher Tabs */}
            <div className="flex items-center gap-1">
              {(['npm', 'pnpm', 'yarn', 'bun'] as PackageManager[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setPm(tab)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                    pm === tab
                      ? 'bg-white dark:bg-[#23272f] text-zinc-900 dark:text-white border border-zinc-200 dark:border-[#383f4e] font-medium shadow-2xs'
                      : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-400 uppercase tracking-wider pr-1">
              v1.0.3
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 px-2.5 py-1.5 font-mono text-xs">
            <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-200 min-w-0">
              <span className="text-zinc-400 select-none">$</span>
              <span className="truncate">{currentCommand}</span>
            </div>

            <button
              onClick={handleCopy}
              title="Copy installation command"
              className="flex items-center gap-1 px-2 py-0.5 rounded text-xs font-sans text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-[#23272f] transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 text-[11px]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: FEATURE PILLARS -> COLOR #191b21 */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-16 bg-zinc-50 dark:bg-[#191b21] text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-[#2a2f3a] transition-colors">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-3">
            Engineered for Production Velocity
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Eliminates typing stutter, hydration desynchronization, and cluttered URLs with three core architectural pillars.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: 0ms Input Latency */}
          <div className="p-6 rounded-xl border border-zinc-200 dark:border-[#323846] bg-white dark:bg-[#23272f] hover:border-zinc-400 dark:hover:border-zinc-400 transition-all flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              </div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                0ms Input Latency
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Controlled inputs update local React state instantaneously with zero typing lag,
                while browser URL synchronization is debounced asynchronously in the background.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-[#323846] text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <span className="text-amber-500 dark:text-amber-400">&bull;</span>
              <span>debounceMs: 300 by default</span>
            </div>
          </div>

          {/* Pillar 2: Clean URL Policy */}
          <div className="p-6 rounded-xl border border-zinc-200 dark:border-[#323846] bg-white dark:bg-[#23272f] hover:border-zinc-400 dark:hover:border-zinc-400 transition-all flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
              </div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Clean URL Policy
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Default values, empty strings <code className="text-zinc-800 dark:text-zinc-200 font-mono text-xs bg-zinc-100 dark:bg-[#191b21] px-1 py-0.5 rounded">&quot;&quot;</code>, and empty arrays{' '}
                <code className="text-zinc-800 dark:text-zinc-200 font-mono text-xs bg-zinc-100 dark:bg-[#191b21] px-1 py-0.5 rounded">[]</code> are automatically purged from the query string, preserving canonical SEO links.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-[#323846] text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <span className="text-emerald-500 dark:text-emerald-400">&bull;</span>
              <span>Zero query string pollution</span>
            </div>
          </div>

          {/* Pillar 3: Atomic Batch Transitions */}
          <div className="p-6 rounded-xl border border-zinc-200 dark:border-[#323846] bg-white dark:bg-[#23272f] hover:border-zinc-400 dark:hover:border-zinc-400 transition-all flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              </div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Atomic Batch Transitions
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Filter drawers and slide-overs commit updates across 10+ query parameters in a single, unified Next.js navigation transition without history bloat.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-[#323846] text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <span className="text-blue-500 dark:text-blue-400">&bull;</span>
              <span>1 history entry per commit</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: DEVELOPER API CODE -> COLOR #23272f */}
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
            code={`'use client';

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
}`}
            language="tsx"
            filename="CatalogFilters.tsx"
          />
        </div>
      </section>

      {/* SECTION 4: ARCHITECTURAL COMPARISON -> COLOR #191b21 */}
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
          {/* Item 1 */}
          <div className="p-5 rounded-xl border border-zinc-200 dark:border-[#323846] bg-white dark:bg-[#23272f] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Typing Performance</span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">0ms Feedback</span>
              </div>
              <div className="space-y-2 mt-3 text-xs">
                <div className="flex items-start gap-2 text-rose-700 dark:text-rose-300">
                  <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500 dark:text-rose-400" />
                  <span><strong>Vanilla Next.js:</strong> Stutters typing keystrokes by re-rendering on every router push.</span>
                </div>
                <div className="flex items-start gap-2 text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500 dark:text-emerald-400" />
                  <span><strong>paramsync:</strong> Local React state updates in 0ms while URL push is debounced.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="p-5 rounded-xl border border-zinc-200 dark:border-[#323846] bg-white dark:bg-[#23272f] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Type System</span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">Strict Runtime</span>
              </div>
              <div className="space-y-2 mt-3 text-xs">
                <div className="flex items-start gap-2 text-rose-700 dark:text-rose-300">
                  <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500 dark:text-rose-400" />
                  <span><strong>Vanilla Next.js:</strong> Returns raw <code className="text-zinc-700 dark:text-zinc-200 font-mono">string | null</code> requiring manual parsing.</span>
                </div>
                <div className="flex items-start gap-2 text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500 dark:text-emerald-400" />
                  <span><strong>paramsync:</strong> Automatic type casting for numbers, booleans, arrays, ranges, and sort.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Item 3 */}
          <div className="p-5 rounded-xl border border-zinc-200 dark:border-[#323846] bg-white dark:bg-[#23272f] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">URL Cleanliness</span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">Canonical SEO</span>
              </div>
              <div className="space-y-2 mt-3 text-xs">
                <div className="flex items-start gap-2 text-rose-700 dark:text-rose-300">
                  <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500 dark:text-rose-400" />
                  <span><strong>Vanilla Next.js:</strong> Pollutes URLs with <code className="text-zinc-700 dark:text-zinc-200 font-mono">?q=&amp;page=1&amp;filter=</code>.</span>
                </div>
                <div className="flex items-start gap-2 text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500 dark:text-emerald-400" />
                  <span><strong>paramsync:</strong> Default and empty parameters are automatically removed from query string.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Item 4 */}
          <div className="p-5 rounded-xl border border-zinc-200 dark:border-[#323846] bg-white dark:bg-[#23272f] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Batch Operations</span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">Single Navigation</span>
              </div>
              <div className="space-y-2 mt-3 text-xs">
                <div className="flex items-start gap-2 text-rose-700 dark:text-rose-300">
                  <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500 dark:text-rose-400" />
                  <span><strong>Vanilla Next.js:</strong> Updating 5 inputs generates 5 router transitions and history bloat.</span>
                </div>
                <div className="flex items-start gap-2 text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500 dark:text-emerald-400" />
                  <span><strong>paramsync:</strong> Stage 10+ changes in a filter drawer and commit atomically in one step.</span>
                </div>
              </div>
            </div>
          </div>
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
    </div>
  );
}

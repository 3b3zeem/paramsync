'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, Terminal, ShieldCheck, Zap } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full border-t border-zinc-200 dark:border-[#2a2f3a] bg-zinc-50/70 dark:bg-[#191b21] mt-auto text-zinc-600 dark:text-zinc-400">
      {/* Main Multi-Column Section */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Col 1 & 2: Brand, Purpose & Badges */}
          <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-6">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <Logo className="w-12 h-12" />
            </Link>

            <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-sm">
              Type-safe URL Search Parameters state manager engineered specifically for React 18+ and Next.js App Router.
              Delivers 0ms input latency, automatic Clean URL parameter purging, and atomic batch transitions.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px]">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-zinc-200 dark:border-[#363c4a] bg-white dark:bg-[#292e39] text-zinc-700 dark:text-zinc-300">
                <Zap className="w-3 h-3 text-amber-500" />
                <span>0ms Latency</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-zinc-200 dark:border-[#363c4a] bg-white dark:bg-[#292e39] text-zinc-700 dark:text-zinc-300">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>Clean URL Policy</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-zinc-200 dark:border-[#363c4a] bg-white dark:bg-[#292e39] text-zinc-700 dark:text-zinc-300">
                <Terminal className="w-3 h-3 text-blue-500" />
                <span>App Router Ready</span>
              </span>
            </div>

            {/* Version & Ecosystem Badges */}
            <div className="flex items-center gap-3 pt-2 text-xs font-mono">
              <a
                href="https://www.npmjs.com/package/paramsync"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-zinc-200 dark:border-[#363c4a] bg-white dark:bg-[#292e39] text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <span>npm</span>
                <span className="text-zinc-400 dark:text-zinc-500">v1.0.4</span>
              </a>
              <a
                href="https://github.com/3b3zeem/paramsync-lib"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-zinc-200 dark:border-[#363c4a] bg-white dark:bg-[#292e39] text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <GithubIcon className="w-3 h-3" />
                <span>GitHub</span>
              </a>
              <span className="text-zinc-400 dark:text-zinc-600 text-xs">MIT License</span>
            </div>
          </div>

          {/* Col 3: Documentation Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Documentation
            </h3>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <Link href="/docs" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/docs/installation" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  Installation
                </Link>
              </li>
              <li>
                <Link href="/docs/quick-start" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  Quick Start Tutorial
                </Link>
              </li>
              <li>
                <Link href="/docs/concepts/clean-url-policy" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  Clean URL Policy
                </Link>
              </li>
              <li>
                <Link href="/docs/concepts/suspense-boundaries" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  Suspense Boundaries
                </Link>
              </li>
              <li>
                <Link href="/docs/faq" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  FAQ & Troubleshooting
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Parsers Reference */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Parsers API
            </h3>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link href="/docs/parsers/parse-as-string" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  parseAsString
                </Link>
              </li>
              <li>
                <Link href="/docs/parsers/parse-as-integer" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  parseAsInteger
                </Link>
              </li>
              <li>
                <Link href="/docs/parsers/parse-as-float" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  parseAsFloat
                </Link>
              </li>
              <li>
                <Link href="/docs/parsers/parse-as-boolean" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  parseAsBoolean
                </Link>
              </li>
              <li>
                <Link href="/docs/parsers/parse-as-array" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  parseAsArray
                </Link>
              </li>
              <li>
                <Link href="/docs/parsers/parse-as-number-range" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  parseAsNumberRange
                </Link>
              </li>
              <li>
                <Link href="/docs/parsers/create-parser" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  createParser (Custom)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Tools & Resources */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Ecosystem
            </h3>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <Link href="/playground" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1.5">
                  <span>Interactive Sandbox</span>
                  <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300">
                    Live
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/use-cases" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  Real-World Use Cases
                </Link>
              </li>
              <li>
                <Link href="/docs/hooks/use-query-state" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  useQueryState Hook
                </Link>
              </li>
              <li>
                <Link href="/docs/hooks/use-batch-query-params" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  useBatchQueryParams Hook
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/3b3zeem/paramsync-lib/issues"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  Report an Issue
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sub-footer Bottom Bar */}
      <div className="w-full border-t border-zinc-200 dark:border-[#2a2f3a] bg-white/50 dark:bg-[#15171c] py-4">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-zinc-800 dark:text-zinc-200 font-medium">paramsync</span>
            <span>&copy; {new Date().getFullYear()}</span>
            <span>&bull;</span>
            <span>Released under MIT License</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="inline-flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Production Ready</span>
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

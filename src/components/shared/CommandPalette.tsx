'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Hash, BookOpen, Code2, Sparkles, ArrowRight, CornerDownLeft } from 'lucide-react';

export interface SearchItem {
  id: string;
  title: string;
  href: string;
  category: 'Parsers' | 'Hooks' | 'Guides' | 'Tools';
  description: string;
  keywords?: string[];
}

export const SEARCH_INDEX: SearchItem[] = [
  // Parsers
  {
    id: 'parser-string',
    title: 'parseAsString',
    href: '/docs/parsers/parse-as-string',
    category: 'Parsers',
    description: 'Text inputs, search keywords, tab keys, and single-value query parameters',
    keywords: ['string', 'text', 'input', 'search', 'query', 'tab'],
  },
  {
    id: 'parser-integer',
    title: 'parseAsInteger',
    href: '/docs/parsers/parse-as-integer',
    category: 'Parsers',
    description: 'Strict integer numbers for pagination indices, limits, and counters',
    keywords: ['integer', 'int', 'number', 'page', 'pagination', 'limit', 'count'],
  },
  {
    id: 'parser-float',
    title: 'parseAsFloat',
    href: '/docs/parsers/parse-as-float',
    category: 'Parsers',
    description: 'Floating-point decimals for ratings, coordinates, and percentages',
    keywords: ['float', 'decimal', 'double', 'rating', 'star', 'coordinates'],
  },
  {
    id: 'parser-boolean',
    title: 'parseAsBoolean',
    href: '/docs/parsers/parse-as-boolean',
    category: 'Parsers',
    description: 'Toggle switches, stock availability, and binary URL flags',
    keywords: ['boolean', 'bool', 'toggle', 'switch', 'checkbox', 'flag'],
  },
  {
    id: 'parser-array',
    title: 'parseAsArray',
    href: '/docs/parsers/parse-as-array',
    category: 'Parsers',
    description: 'Delimited lists for category chips, tag selectors, and multi-checkboxes',
    keywords: ['array', 'list', 'tags', 'chips', 'categories', 'multi', 'delimiter', 'comma'],
  },
  {
    id: 'parser-number-range',
    title: 'parseAsNumberRange',
    href: '/docs/parsers/parse-as-number-range',
    category: 'Parsers',
    description: 'Dual-thumb price sliders and numeric range bounds (min-max)',
    keywords: ['range', 'number range', 'price', 'slider', 'min', 'max', 'bounds'],
  },
  {
    id: 'parser-sort',
    title: 'parseAsSort',
    href: '/docs/parsers/parse-as-sort',
    category: 'Parsers',
    description: 'Column and order sorting for feeds and data grids (field.order)',
    keywords: ['sort', 'order', 'asc', 'desc', 'table', 'grid', 'column'],
  },
  {
    id: 'parser-create',
    title: 'createParser',
    href: '/docs/parsers/create-parser',
    category: 'Parsers',
    description: 'Build custom domain-specific parsers with custom validation & serialization',
    keywords: ['custom', 'createParser', 'validator', 'serializer', 'zod'],
  },

  // Hooks
  {
    id: 'hook-query-state',
    title: 'useQueryState',
    href: '/docs/hooks/use-query-state',
    category: 'Hooks',
    description: 'Individual reactive state hook with 0ms typing lag and debounced URL updates',
    keywords: ['hook', 'useQueryState', 'debounce', 'state', '0ms', 'latency'],
  },
  {
    id: 'hook-batch-params',
    title: 'useBatchQueryParams',
    href: '/docs/hooks/use-batch-query-params',
    category: 'Hooks',
    description: 'Atomic multi-parameter updates for filter drawers and reset-all actions',
    keywords: ['batch', 'atomic', 'drawer', 'filters', 'commit', 'staging', 'useBatchQueryParams'],
  },

  // Guides & Concepts
  {
    id: 'guide-overview',
    title: 'Documentation Overview',
    href: '/docs',
    category: 'Guides',
    description: 'Introduction to paramsync and zero-overhead URL state management',
    keywords: ['overview', 'intro', 'start', 'paramsync', 'nextjs'],
  },
  {
    id: 'guide-install',
    title: 'Installation Guide',
    href: '/docs/installation',
    category: 'Guides',
    description: 'Install paramsync with npm, pnpm, yarn, or bun in Next.js App Router',
    keywords: ['install', 'npm', 'pnpm', 'yarn', 'bun', 'setup'],
  },
  {
    id: 'guide-quick-start',
    title: 'Quick Start Tutorial',
    href: '/docs/quick-start',
    category: 'Guides',
    description: 'Step-by-step tutorial building a live reactive search and pagination bar',
    keywords: ['quick start', 'tutorial', 'search bar', 'pagination', 'example'],
  },
  {
    id: 'guide-clean-url',
    title: 'Clean URL Policy',
    href: '/docs/concepts/clean-url-policy',
    category: 'Guides',
    description: 'Automatic parameter purging matrix for defaults, empty strings, and empty arrays',
    keywords: ['clean url', 'purge', 'default', 'empty', 'canonical', 'seo'],
  },
  {
    id: 'guide-suspense',
    title: 'Suspense Boundaries & Gotchas',
    href: '/docs/concepts/suspense-boundaries',
    category: 'Guides',
    description: 'Avoiding SSR hydration mismatch and Next.js App Router static de-optimizations',
    keywords: ['suspense', 'hydration', 'ssr', 'deopt', 'static', 'boundary'],
  },
  {
    id: 'guide-faq',
    title: 'FAQ & Troubleshooting',
    href: '/docs/faq',
    category: 'Guides',
    description: 'Common questions, debugging tips, and migration from alternative libraries',
    keywords: ['faq', 'questions', 'nuqs', 're-renders', 'troubleshooting'],
  },

  // Interactive Tools
  {
    id: 'tool-playground',
    title: 'Interactive Playground',
    href: '/playground',
    category: 'Tools',
    description: 'Real-time sandbox testing 0ms input debounce, Clean URL purging, and batch staging',
    keywords: ['playground', 'sandbox', 'demo', 'simulation', 'browser bar', 'test'],
  },
  {
    id: 'tool-use-cases',
    title: 'Real-World Use Cases',
    href: '/use-cases',
    category: 'Tools',
    description: 'Production recipes: E-commerce filters, analytics dashboards, and data tables',
    keywords: ['use cases', 'recipes', 'ecommerce', 'analytics', 'dashboard', 'showcase'],
  },
];

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Filter items based on query
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Default recommended / popular items
      return SEARCH_INDEX.slice(0, 8);
    }

    return SEARCH_INDEX.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      const matchKeywords = item.keywords?.some((k) => k.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchCategory || matchKeywords;
    });
  }, [query]);

  // Reset selected index when filtered list changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems]);

  const handleSelect = useCallback(
    (item: SearchItem) => {
      onClose();
      router.push(item.href);
    },
    [onClose, router]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredItems, handleSelect, onClose]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector('[data-active="true"]') as HTMLElement | null;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  const getCategoryBadge = (category: SearchItem['category']) => {
    switch (category) {
      case 'Parsers':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'Hooks':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Guides':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'Tools':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-800';
    }
  };

  const getCategoryIcon = (category: SearchItem['category']) => {
    switch (category) {
      case 'Parsers':
        return <Code2 className="w-3.5 h-3.5 text-blue-500" />;
      case 'Hooks':
        return <Hash className="w-3.5 h-3.5 text-emerald-500" />;
      case 'Guides':
        return <BookOpen className="w-3.5 h-3.5 text-purple-500" />;
      case 'Tools':
        return <Sparkles className="w-3.5 h-3.5 text-amber-500" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 select-none">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/50 dark:bg-black/60 backdrop-blur-xs"
          />

          {/* Command Palette Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative w-full max-w-2xl rounded-xl border border-zinc-200 dark:border-[#363c4a] bg-white dark:bg-[#1b1d24] shadow-2xl overflow-hidden z-10 flex flex-col font-sans"
          >
            {/* Top Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-200 dark:border-[#2d3340] bg-zinc-50/50 dark:bg-[#16181f]">
              <Search className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search parsers, hooks, concepts, or guides..."
                className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 rounded text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-[#292e39] rounded border border-zinc-200 dark:border-[#363c4a]">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div ref={listRef} className="max-h-[450px] overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-xs text-zinc-500">
                  <p>No results found for &ldquo;<span className="text-zinc-800 dark:text-zinc-200 font-mono">{query}</span>&rdquo;</p>
                  <p className="mt-1 text-zinc-400">Try searching for &quot;string&quot;, &quot;batch&quot;, or &quot;debounce&quot;</p>
                </div>
              ) : (
                <>
                  {!query && (
                    <div className="px-3 pt-1 pb-1 text-[10px] font-mono font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                      Quick Suggestions
                    </div>
                  )}
                  {filteredItems.map((item, index) => {
                    const isSelected = index === selectedIndex;
                    return (
                      <div
                        key={item.id}
                        data-active={isSelected}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`group flex items-center justify-between px-3 py-2.5 rounded-lg text-xs cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-zinc-100 dark:bg-[#292e39] text-zinc-950 dark:text-white'
                            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-[#242833]'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-2">
                          <div className="shrink-0">{getCategoryIcon(item.category)}</div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-medium text-[13px] text-zinc-900 dark:text-zinc-100">
                                {item.title}
                              </span>
                              <span
                                className={`text-[10px] px-1.5 py-0.2 rounded border font-sans ${getCategoryBadge(
                                  item.category
                                )}`}
                              >
                                {item.category}
                              </span>
                            </div>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center text-zinc-400 dark:text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          {isSelected ? (
                            <CornerDownLeft className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-300" />
                          ) : (
                            <ArrowRight className="w-3.5 h-3.5" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            {/* Bottom Keyboard Navigation Hints */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-zinc-200 dark:border-[#2d3340] bg-zinc-50/80 dark:bg-[#16181f] text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-zinc-200/60 dark:bg-[#292e39] border border-zinc-300 dark:border-[#363c4a] text-[10px]">
                    ↑
                  </kbd>
                  <kbd className="px-1 py-0.5 rounded bg-zinc-200/60 dark:bg-[#292e39] border border-zinc-300 dark:border-[#363c4a] text-[10px]">
                    ↓
                  </kbd>
                  <span className="ml-0.5">navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-zinc-200/60 dark:bg-[#292e39] border border-zinc-300 dark:border-[#363c4a] text-[10px]">
                    ↵
                  </kbd>
                  <span className="ml-0.5">select</span>
                </span>
              </div>
              <span className="text-[10px] text-zinc-400">paramsync search</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

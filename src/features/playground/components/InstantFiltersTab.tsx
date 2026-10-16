'use client';

import React from 'react';
import {
  useQueryState,
  parseAsString,
  parseAsInteger,
  parseAsBoolean,
  parseAsArray,
  parseAsNumberRange,
  parseAsSort,
} from 'paramsync';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const CATEGORIES = ['Keyboards', 'Monitors', 'Audio', 'Laptops', 'Desk Setup', 'Cables'];
const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured.asc' },
  { label: 'Price: Low to High', value: 'price.asc' },
  { label: 'Price: High to Low', value: 'price.desc' },
  { label: 'Rating: Highest', value: 'rating.desc' },
];

export function InstantFiltersTab() {
  // 1. Search Query (debounced 300ms for zero typing lag)
  const [search, setSearch, , isSearchPending] = useQueryState(
    'q',
    parseAsString.withDefault(''),
    { debounceMs: 300 }
  );

  // 2. Multi-select Categories (parseAsArray)
  const [categories, setCategories] = useQueryState(
    'categories',
    parseAsArray(parseAsString)
  );

  // 3. Price Range (parseAsNumberRange: min: 0, max: 1500)
  const [price, setPrice] = useQueryState(
    'price',
    parseAsNumberRange(0, 1500)
  );

  // 4. Sort (parseAsSort)
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsSort<string>('featured', 'asc')
  );

  // 5. In-Stock Only (parseAsBoolean)
  const [inStock, setInStock] = useQueryState(
    'inStock',
    parseAsBoolean.withDefault(false)
  );

  // 6. Pagination Index (parseAsInteger)
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1)
  );

  // Handler for category toggle with auto-reset to page 1
  const toggleCategory = (cat: string) => {
    if (page > 1) setPage(1);
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSearchChange = (val: string) => {
    if (page > 1) setPage(1);
    setSearch(val);
  };

  const handlePriceMaxChange = (maxVal: number) => {
    if (page > 1) setPage(1);
    setPrice((prev) => ({ ...prev, max: maxVal }));
  };

  const handleSortChange = (combined: string) => {
    if (page > 1) setPage(1);
    const [field, order] = combined.split('.') as [string, 'asc' | 'desc'];
    setSort({ field, order });
  };

  const handleInStockToggle = (checked: boolean) => {
    if (page > 1) setPage(1);
    setInStock(checked);
  };

  return (
    <div className="space-y-6">
      {/* 1. Live Search Input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="playground-search"
            className="text-xs font-mono font-medium text-zinc-300 uppercase tracking-wider"
          >
            Live Search (300ms Debounced)
          </label>
          <span className="text-[11px] font-mono text-zinc-500">
            {isSearchPending ? (
              <span className="text-amber-400 font-medium animate-pulse">Typing (debouncing URL)...</span>
            ) : (
              '0ms local feedback'
            )}
          </span>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="playground-search"
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search products (e.g. Mechanical Keyboard)..."
            className="w-full pl-9 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-700 transition-colors"
          />
        </div>
      </div>

      {/* 2. Category Multi-Select Chips (parseAsArray with Framer Motion) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-mono font-medium text-zinc-300 uppercase tracking-wider">
            Categories (<code className="text-zinc-400">parseAsArray</code>)
          </label>
          <span className="text-[11px] font-mono text-zinc-500">
            {categories.length > 0 ? `${categories.length} selected` : 'None selected (purged)'}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = categories.includes(cat);
            return (
              <motion.button
                key={cat}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleCategory(cat)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-colors border select-none ${
                  isSelected
                    ? 'bg-zinc-100 text-zinc-950 border-zinc-100 font-semibold shadow-sm'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <AnimatePresence>
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Check className="w-3.5 h-3.5 text-zinc-950" />
                    </motion.span>
                  )}
                </AnimatePresence>
                <span>{cat}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 3. Price Range Slider (parseAsNumberRange) */}
      <div className="p-4 rounded-lg border border-zinc-800/80 bg-zinc-900/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-medium text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
            Max Price (<code className="text-zinc-400">parseAsNumberRange</code>)
          </span>
          <motion.span
            key={price.max}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="font-mono text-xs text-blue-400 font-semibold"
          >
            ${price.min} &mdash; ${price.max}
          </motion.span>
        </div>
        <input
          type="range"
          min={0}
          max={1500}
          step={50}
          value={price.max}
          onChange={(e) => handlePriceMaxChange(Number(e.target.value))}
          className="w-full accent-blue-600 bg-zinc-800 cursor-pointer h-1.5 rounded-lg"
        />
        <div className="flex justify-between text-[11px] font-mono text-zinc-500 mt-1">
          <span>$0 (default min)</span>
          <span>$1500 (default max)</span>
        </div>
      </div>

      {/* 4. Sort & In-Stock Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Sort Dropdown */}
        <div>
          <label
            htmlFor="playground-sort"
            className="block text-xs font-mono font-medium text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-1.5"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
            Sort Order (<code className="text-zinc-400">parseAsSort</code>)
          </label>
          <select
            id="playground-sort"
            value={`${sort.field}.${sort.order}`}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-600 font-mono"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* In-Stock Switch */}
        <div className="flex flex-col justify-end">
          <label className="flex items-center justify-between p-2.5 rounded-lg border border-zinc-800/80 bg-zinc-900/30 cursor-pointer select-none hover:bg-zinc-900/50 transition-colors">
            <div className="flex flex-col">
              <span className="text-xs font-mono font-medium text-zinc-200 uppercase tracking-wider">
                In Stock Only
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">
                parseAsBoolean.withDefault(false)
              </span>
            </div>
            <div
              onClick={() => handleInStockToggle(!inStock)}
              className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                inStock ? 'bg-blue-600' : 'bg-zinc-800'
              }`}
            >
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`w-4 h-4 rounded-full bg-white shadow-md ${
                  inStock ? 'ml-auto' : ''
                }`}
              />
            </div>
          </label>
        </div>
      </div>

      {/* 5. Pagination Controls (parseAsInteger) */}
      <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-mono text-zinc-400">Page:</span>
          <motion.span
            key={page}
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-100 font-semibold"
          >
            {page}
          </motion.span>
          {page === 1 && (
            <span className="text-[11px] font-mono text-zinc-600 italic">
              (default index purged from URL)
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900 text-xs font-mono text-zinc-300 hover:text-white hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Prev
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => setPage((p) => p + 1)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900 text-xs font-mono text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            Next
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

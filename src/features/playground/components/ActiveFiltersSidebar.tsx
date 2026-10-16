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
import {
  Search,
  X,
  SlidersHorizontal,
  Layers,
  ArrowRight,
  Check,
  Filter,
} from 'lucide-react';

interface CategoryOption {
  id: string;
  label: string;
  count: number;
}

const CATEGORIES: CategoryOption[] = [
  { id: 'footwear', label: 'Footwear', count: 4 },
  { id: 'electronics', label: 'Electronics', count: 8 },
  { id: 'audio', label: 'Audio', count: 5 },
  { id: 'accessories', label: 'Accessories', count: 2 },
];

const SORT_OPTIONS = [
  { label: 'Price: Low to High', value: 'price.asc' },
  { label: 'Price: High to Low', value: 'price.desc' },
  { label: 'Newest First', value: 'createdAt.desc' },
  { label: 'Rating: Highest', value: 'rating.desc' },
];

interface ActiveFiltersSidebarProps {
  onOpenDrawer: () => void;
}

export function ActiveFiltersSidebar({ onOpenDrawer }: ActiveFiltersSidebarProps) {
  // 1. Search with 300ms debounce
  const [search, setSearch, , isSearchPending] = useQueryState(
    'q',
    parseAsString.withDefault(''),
    { debounceMs: 300 }
  );

  // 2. Categories array (parseAsArray)
  const [categories, setCategories] = useQueryState(
    'category',
    parseAsArray(parseAsString)
  );

  // 3. Price range (parseAsNumberRange)
  const [price, setPrice] = useQueryState(
    'price',
    parseAsNumberRange(0, 1000)
  );

  // 4. In-Stock Only (parseAsBoolean)
  const [inStock, setInStock] = useQueryState(
    'inStock',
    parseAsBoolean.withDefault(false)
  );

  // 5. Sort Order (parseAsSort)
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsSort<string>('price', 'asc')
  );

  // 6. Page index (parseAsInteger)
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1)
  );

  // Helper to reset page index on any filter alteration
  const resetPageIfFiltered = () => {
    if (page > 1) {
      setPage(1);
    }
  };

  const handleSearchChange = (val: string) => {
    resetPageIfFiltered();
    setSearch(val);
  };

  const toggleCategory = (catId: string) => {
    resetPageIfFiltered();
    setCategories((prev) =>
      prev.includes(catId) ? prev.filter((c) => c !== catId) : [...prev, catId]
    );
  };

  const handleMinPriceChange = (val: number) => {
    resetPageIfFiltered();
    setPrice((prev) => ({ ...prev, min: Math.min(val, prev.max) }));
  };

  const handleMaxPriceChange = (val: number) => {
    resetPageIfFiltered();
    setPrice((prev) => ({ ...prev, max: Math.max(val, prev.min) }));
  };

  const handleSortChange = (combined: string) => {
    resetPageIfFiltered();
    const [field, order] = combined.split('.') as [string, 'asc' | 'desc'];
    setSort({ field, order });
  };

  const handleInStockToggle = () => {
    resetPageIfFiltered();
    setInStock(!inStock);
  };

  return (
    <div className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 space-y-6">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Active Filters
          </h2>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400">
          Synced to URL
        </span>
      </div>

      {/* 1. Search Keyword with 300ms debounce badge */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="sidebar-search"
            className="text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300"
          >
            Search Keyword
          </label>
          <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-900/60 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400">
            <span
              className={`w-1.5 h-1.5 rounded-full bg-blue-500 ${
                isSearchPending ? 'animate-ping' : ''
              }`}
            />
            300ms debounce
          </span>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-400 dark:text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="sidebar-search"
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-8 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-mono text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 focus:border-zinc-400 dark:focus:border-zinc-700 transition-colors"
          />
          {search && (
            <button
              type="button"
              onClick={() => handleSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Category Multi-Value Array */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300">
            Category
          </span>
          <span className="text-[11px] font-mono text-zinc-500">
            Multi-value array
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = categories.includes(cat.id);
            return (
              <motion.button
                key={cat.id}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-colors border select-none ${
                  isSelected
                    ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-900 dark:border-zinc-100 font-semibold shadow-xs'
                    : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-200'
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
                      <Check className="w-3.5 h-3.5 text-white dark:text-zinc-950 stroke-[3]" />
                    </motion.span>
                  )}
                </AnimatePresence>
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1 rounded ${
                    isSelected ? 'bg-zinc-800 dark:bg-zinc-300 text-zinc-100 dark:text-zinc-900 font-bold' : 'text-zinc-400 dark:text-zinc-600'
                  }`}
                >
                  {cat.count}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 3. Price Range ($) with min/max inputs + range slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300">
            Price Range ($)
          </span>
          <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold">
            ${price.min} &mdash; ${price.max}
          </span>
        </div>

        {/* Min / Max Inputs */}
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1 text-xs font-mono text-zinc-700 dark:text-zinc-300">
            <span className="text-zinc-400 dark:text-zinc-500 mr-1">$</span>
            <input
              type="number"
              min={0}
              max={1000}
              value={price.min}
              onChange={(e) => handleMinPriceChange(Number(e.target.value))}
              className="w-full bg-transparent focus:outline-none text-zinc-900 dark:text-zinc-100"
            />
          </div>
          <span className="text-zinc-400 dark:text-zinc-600 text-xs font-mono">to</span>
          <div className="flex-1 flex items-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1 text-xs font-mono text-zinc-700 dark:text-zinc-300">
            <span className="text-zinc-400 dark:text-zinc-500 mr-1">$</span>
            <input
              type="number"
              min={0}
              max={1000}
              value={price.max}
              onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
              className="w-full bg-transparent focus:outline-none text-zinc-900 dark:text-zinc-100"
            />
          </div>
        </div>

        {/* Dual Slider bar */}
        <div className="space-y-1">
          <input
            type="range"
            min={0}
            max={1000}
            step={25}
            value={price.max}
            onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
            className="w-full accent-blue-600 bg-zinc-200 dark:bg-zinc-800 cursor-pointer h-1.5 rounded-lg"
          />
        </div>
      </div>

      {/* 4. In-Stock Only Switch */}
      <div className="pt-2">
        <label className="flex items-center justify-between p-3 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/40 cursor-pointer select-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60 transition-colors">
          <div className="flex flex-col">
            <span className="text-xs font-mono font-medium text-zinc-800 dark:text-zinc-200">
              In-Stock Only
            </span>
            <span className="text-[11px] text-zinc-500 font-mono">
              Exclude backorders
            </span>
          </div>

          <div
            onClick={handleInStockToggle}
            className={`w-10 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
              inStock ? 'bg-blue-600' : 'bg-zinc-300 dark:bg-zinc-800'
            }`}
          >
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className={`w-4 h-4 rounded-full bg-white shadow-xs ${
                inStock ? 'ml-auto' : ''
              }`}
            />
          </div>
        </label>
      </div>

      {/* 5. Sort Order Dropdown */}
      <div>
        <label
          htmlFor="sidebar-sort-select"
          className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-2"
        >
          Sort Order
        </label>
        <select
          id="sidebar-sort-select"
          value={`${sort.field}.${sort.order}`}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 font-mono"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* 6. Batch Transaction Drawer Staging Card */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800/90 bg-zinc-50/70 dark:bg-zinc-900/30 p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-mono font-semibold text-zinc-800 dark:text-zinc-200">
            Batch Transaction Drawer
          </span>
        </div>
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Simulates postponing URL updates until user hits &quot;Apply&quot;.
        </p>
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenDrawer}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-mono text-zinc-800 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <span>Open Staging Drawer</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </div>
  );
}

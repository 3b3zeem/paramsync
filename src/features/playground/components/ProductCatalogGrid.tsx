'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  useQueryState,
  parseAsString,
  parseAsInteger,
  parseAsBoolean,
  parseAsArray,
  parseAsNumberRange,
  parseAsSort,
} from 'paramsync';
import { PRODUCTS_DATA, Product } from '../data/products.data';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ChevronLeft, ChevronRight, CheckSquare, Square, PackageSearch } from 'lucide-react';

const ITEMS_PER_PAGE = 6;

export function ProductCatalogGrid() {
  // Query parameters read from URL
  const [search, , , isSearchPending] = useQueryState('q', parseAsString.withDefault(''));
  const [categories] = useQueryState('category', parseAsArray(parseAsString));
  const [price] = useQueryState('price', parseAsNumberRange(0, 1000));
  const [inStock] = useQueryState('inStock', parseAsBoolean.withDefault(false));
  const [sort] = useQueryState('sort', parseAsSort<string>('price', 'asc'));
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  // Local card selection state for interactive demo feel
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  const toggleSelectProduct = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // Real filtering logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      // 1. Search keyword
      if (search) {
        const query = search.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }

      // 2. Categories
      if (categories.length > 0) {
        if (!categories.includes(product.category)) return false;
      }

      // 3. Price Range
      if (product.price < price.min || product.price > price.max) {
        return false;
      }

      // 4. In Stock
      if (inStock && !product.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      // 5. Sorting
      if (sort.field === 'price') {
        return sort.order === 'asc' ? a.price - b.price : b.price - a.price;
      }
      if (sort.field === 'rating') {
        return sort.order === 'asc' ? a.rating - b.rating : b.rating - a.rating;
      }
      return 0;
    });
  }, [search, categories, price, inStock, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  // Paginated slice
  const displayedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  return (
    <div className="w-full space-y-5">
      {/* Feed Status Header */}
      <div className="flex items-center justify-between pb-1 select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 font-mono">
            Showing {filteredProducts.length} matching product{filteredProducts.length === 1 ? '' : 's'}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <Zap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          {isSearchPending ? (
            <span className="text-amber-500 dark:text-amber-400">Sync: Debouncing...</span>
          ) : (
            <span className="text-zinc-500 dark:text-zinc-400">
              Sync: <strong className="text-zinc-800 dark:text-zinc-200 font-medium">Synchronized (0ms latency)</strong>
            </span>
          )}
        </div>
      </div>

      {/* Product Cards Grid (3 Columns) */}
      {displayedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {displayedProducts.map((prod) => {
              const isSelected = selectedProductIds.includes(prod.id);

              return (
                <motion.div
                  key={prod.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className={`group rounded-xl border bg-white dark:bg-zinc-950/80 overflow-hidden flex flex-col justify-between transition-colors shadow-xs ${
                    isSelected ? 'border-blue-600 dark:border-blue-500' : 'border-zinc-200 dark:border-zinc-800/90 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  {/* Card Image Area with Badges */}
                  <div>
                    <div className="relative w-full h-44 bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                      {/* Code Tag Badge */}
                      <span className="absolute top-2.5 left-2.5 z-10 font-mono text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700/80 bg-white/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-200 backdrop-blur-xs">
                        {prod.code}
                      </span>

                      {/* In Stock Badge */}
                      <span
                        className={`absolute top-2.5 right-2.5 z-10 font-mono text-[10px] font-medium px-2 py-0.5 rounded border backdrop-blur-xs ${
                          prod.inStock
                            ? 'border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/90 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300'
                            : 'border-zinc-200 dark:border-zinc-700/80 bg-zinc-100/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400'
                        }`}
                      >
                        {prod.inStock ? 'In Stock' : 'Backorder'}
                      </span>

                      {/* Image Preview */}
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                        loading="lazy"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                          {prod.categoryLabel}
                        </span>
                        <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                          ${prod.price.toFixed(2)}
                        </span>
                      </div>

                      <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                        {prod.name}
                      </h4>

                      <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                        {prod.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-800/70 bg-zinc-50 dark:bg-zinc-900/20 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
                      paramsync:bound
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleSelectProduct(prod.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-colors border ${
                        isSelected
                          ? 'bg-blue-600 border-blue-500 text-white font-medium'
                          : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <CheckSquare className="w-3.5 h-3.5" />
                          <span>Selected</span>
                        </>
                      ) : (
                        <>
                          <Square className="w-3.5 h-3.5" />
                          <span>Select</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        <div className="py-20 text-center rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 p-8 space-y-3">
          <PackageSearch className="w-8 h-8 text-zinc-400 dark:text-zinc-500 mx-auto" />
          <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            No products match active filter criteria
          </h4>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Try adjusting your search query, expanding the price range slider, or clearing categories.
          </p>
        </div>
      )}

      {/* Pagination Bar */}
      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 select-none">
        <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <span>Page {currentPage} of {totalPages}</span>{' '}
          <span className="text-zinc-400 dark:text-zinc-600 italic">
            (Auto-resets to page 1 on filter alteration)
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-xs">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setPage(Math.max(1, currentPage - 1))}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            const isCurrent = p === currentPage;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={`w-7 h-7 rounded-md font-medium flex items-center justify-center transition-colors border ${
                  isCurrent
                    ? 'bg-blue-600 text-white border-blue-500 shadow-xs'
                    : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                {p}
              </button>
            );
          })}

          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import {
  useBatchQueryParams,
  parseAsArray,
  parseAsString,
  parseAsNumberRange,
} from 'paramsync';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SlidersHorizontal,
  X,
  Check,
  RotateCcw,
  Layers,
  ArrowRight,
} from 'lucide-react';

const BATCH_CATEGORIES = ['Monitors', 'Keyboards', 'Audio', 'Laptops', 'Desk Setup'];

export function BatchDrawerTab() {
  const { setBatchParams, resetAllParams, isPending } = useBatchQueryParams();

  const [isOpen, setIsOpen] = useState(false);

  // Local draft states (not committed to URL until user clicks Apply)
  const [draftSearch, setDraftSearch] = useState('');
  const [draftCategories, setDraftCategories] = useState<string[]>(['Keyboards']);
  const [draftMaxPrice, setDraftMaxPrice] = useState(600);
  const [draftInStock, setDraftInStock] = useState(true);

  // Commit draft state in a single Next.js navigation transition
  const handleApplyBatch = () => {
    setBatchParams({
      q: draftSearch || null, // null removes it if empty
      categories: {
        value: draftCategories,
        parser: parseAsArray(parseAsString),
      },
      price: {
        value: { min: 0, max: draftMaxPrice },
        parser: parseAsNumberRange(0, 1500),
      },
      inStock: draftInStock ? 'true' : null,
      page: null, // Auto-reset page back to 1
    });
    setIsOpen(false);
  };

  const handleResetAll = () => {
    resetAllParams();
    setDraftSearch('');
    setDraftCategories([]);
    setDraftMaxPrice(1500);
    setDraftInStock(false);
    setIsOpen(false);
  };

  const toggleCategory = (cat: string) => {
    setDraftCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-5">
        <div className="flex items-center gap-2 mb-2 text-zinc-100 font-medium">
          <Layers className="w-4 h-4 text-blue-400" />
          <span>Atomic Batch Commit Pattern (`useBatchQueryParams`)</span>
        </div>
        <p className="text-sm text-zinc-400 leading-relaxed">
          Standard Next.js applications update URL parameters one by one, triggering multiple
          re-renders and history entries. With <code className="text-zinc-200 font-mono">useBatchQueryParams</code>,
          you can collect any number of filter criteria inside a drawer or modal and commit them
          atomically in a <strong>single navigation transition</strong>.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-100 text-zinc-950 font-medium text-sm hover:bg-white transition-colors shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Open Filter Drawer</span>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleResetAll}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 font-mono text-xs hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All URL Params</span>
          </motion.button>
        </div>
      </div>

      {/* Code Showcase Preview */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs text-zinc-300">
        <div className="text-zinc-500 mb-2 font-sans text-xs">
          Atomic Batch Update Code:
        </div>
        <pre className="overflow-x-auto text-zinc-300">
{`const { setBatchParams, resetAllParams } = useBatchQueryParams();

// Updates 4 parameters in 1 single router transition:
setBatchParams({
  q: draftSearch,
  categories: { value: draftCategories, parser: parseAsArray(parseAsString) },
  price: { value: { min: 0, max: draftMaxPrice }, parser: parseAsNumberRange(0, 1500) },
  page: null, // removes 'page' key from URL (resets to page 1)
});`}
        </pre>
      </div>

      {/* Slide-over Drawer with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex justify-end"
          >
            {/* Backdrop Fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-over Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 350 }}
              className="relative z-10 w-full max-w-md bg-zinc-950 border-l border-zinc-800 h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                  <div>
                    <h3 className="text-base font-semibold text-zinc-100">
                      Filter Drawer (Draft Mode)
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Changes here do NOT touch the URL until applied.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                    aria-label="Close drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Draft Controls */}
                <div className="py-6 space-y-6">
                  {/* Draft Search */}
                  <div>
                    <label className="block text-xs font-mono font-medium text-zinc-300 uppercase tracking-wider mb-2">
                      Keyword Filter
                    </label>
                    <input
                      type="text"
                      value={draftSearch}
                      onChange={(e) => setDraftSearch(e.target.value)}
                      placeholder="e.g. Ergonomic"
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                    />
                  </div>

                  {/* Draft Categories */}
                  <div>
                    <label className="block text-xs font-mono font-medium text-zinc-300 uppercase tracking-wider mb-2">
                      Categories Multi-Select
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {BATCH_CATEGORIES.map((cat) => {
                        const isSelected = draftCategories.includes(cat);
                        return (
                          <motion.button
                            key={cat}
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => toggleCategory(cat)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-colors border select-none ${
                              isSelected
                                ? 'bg-zinc-100 text-zinc-900 border-zinc-100 font-semibold'
                                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 text-zinc-900" />}
                            <span>{cat}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Draft Price */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-medium text-zinc-300 uppercase tracking-wider">
                        Maximum Price Limit
                      </span>
                      <span className="font-mono text-xs text-blue-400 font-semibold">
                        ${draftMaxPrice}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={100}
                      max={1500}
                      step={50}
                      value={draftMaxPrice}
                      onChange={(e) => setDraftMaxPrice(Number(e.target.value))}
                      className="w-full accent-blue-600 bg-zinc-800 cursor-pointer h-1.5 rounded-lg"
                    />
                  </div>

                  {/* Draft In-Stock */}
                  <div>
                    <label className="flex items-center justify-between p-3 rounded-lg border border-zinc-800 bg-zinc-900/40 cursor-pointer">
                      <span className="text-xs font-mono font-medium text-zinc-200 uppercase tracking-wider">
                        In Stock Only
                      </span>
                      <input
                        type="checkbox"
                        checked={draftInStock}
                        onChange={(e) => setDraftInStock(e.target.checked)}
                        className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-0 cursor-pointer"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-zinc-800 flex items-center gap-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleApplyBatch}
                  disabled={isPending}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors shadow-sm disabled:opacity-50"
                >
                  <span>Apply All (1 Transition)</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="py-2.5 px-4 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200 text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

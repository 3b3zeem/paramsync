"use client";

import React, { useState } from "react";
import {
  useBatchQueryParams,
  parseAsArray,
  parseAsString,
  parseAsNumberRange,
} from "paramsync";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight, RotateCcw, Layers } from "lucide-react";

interface BatchStagingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  { id: "footwear", label: "Footwear" },
  { id: "electronics", label: "Electronics" },
  { id: "audio", label: "Audio" },
  { id: "accessories", label: "Accessories" },
];

export function BatchStagingDrawer({
  isOpen,
  onClose,
}: BatchStagingDrawerProps) {
  const { setBatchParams, resetAllParams, isPending } = useBatchQueryParams();

  // Local staged values
  const [stagedSearch, setStagedSearch] = useState("shoes");
  const [stagedCategories, setStagedCategories] = useState<string[]>([
    "footwear",
  ]);
  const [stagedMinPrice, setStagedMinPrice] = useState(100);
  const [stagedMaxPrice, setStagedMaxPrice] = useState(500);
  const [stagedInStock, setStagedInStock] = useState(true);
  const [stagedSort, setStagedSort] = useState("price.asc");

  const toggleCategory = (id: string) => {
    setStagedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const handleApply = () => {
    setBatchParams({
      q: stagedSearch || null,
      category: {
        value: stagedCategories,
        parser: parseAsArray(parseAsString),
      },
      price: {
        value: { min: stagedMinPrice, max: stagedMaxPrice },
        parser: parseAsNumberRange(0, 1000),
      },
      inStock: stagedInStock ? "true" : null,
      sort: stagedSort === "price.asc" ? null : stagedSort,
      page: null, // Reset to page 1
    });
    onClose();
  };

  const handleReset = () => {
    resetAllParams();
    setStagedSearch("");
    setStagedCategories([]);
    setStagedMinPrice(0);
    setStagedMaxPrice(1000);
    setStagedInStock(false);
    onClose();
  };

  // Compute pending preview query string
  const pendingParams: string[] = [];
  if (stagedSearch) pendingParams.push(`q=${encodeURIComponent(stagedSearch)}`);
  if (stagedCategories.length > 0)
    pendingParams.push(`category=${stagedCategories.join(",")}`);
  if (stagedMinPrice !== 0 || stagedMaxPrice !== 1000)
    pendingParams.push(`price=${stagedMinPrice}-${stagedMaxPrice}`);
  if (stagedInStock) pendingParams.push(`inStock=true`);
  if (stagedSort !== "price.asc") pendingParams.push(`sort=${stagedSort}`);
  const previewQuery =
    pendingParams.length > 0 ? `?${pendingParams.join("&")}` : "";

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex justify-end select-none"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            onClick={onClose}
          />

          {/* Drawer Body */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className="relative z-10 w-full max-w-lg bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto"
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 font-mono">
                      Batch Transaction Drawer (Staging)
                    </h3>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Edit multiple filters without triggering URL router
                      transitions.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 rounded text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Staged Keyword */}
              <div>
                <label className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Staged Keyword
                </label>
                <input
                  type="text"
                  value={stagedSearch}
                  onChange={(e) => setStagedSearch(e.target.value)}
                  placeholder="e.g. shoes"
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-mono text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600"
                />
              </div>

              {/* Staged Categories */}
              <div>
                <label className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Staged Categories
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => {
                    const isSelected = stagedCategories.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleCategory(cat.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-colors border ${
                          isSelected
                            ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-900 dark:border-zinc-100 font-semibold"
                            : "bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                        }`}
                      >
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-white dark:text-zinc-950" />
                        )}
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Staged Price */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-700 dark:text-zinc-300">
                  <span>Staged Price Span</span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">
                    ${stagedMinPrice} &mdash; ${stagedMaxPrice}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1 text-xs font-mono text-zinc-700 dark:text-zinc-300">
                    <span className="text-zinc-400 dark:text-zinc-500 mr-1">
                      $
                    </span>
                    <input
                      type="number"
                      value={stagedMinPrice}
                      onChange={(e) =>
                        setStagedMinPrice(Number(e.target.value))
                      }
                      className="w-full bg-transparent focus:outline-none text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                  <span className="text-zinc-400 dark:text-zinc-600 text-xs font-mono">
                    to
                  </span>
                  <div className="flex-1 flex items-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1 text-xs font-mono text-zinc-700 dark:text-zinc-300">
                    <span className="text-zinc-400 dark:text-zinc-500 mr-1">
                      $
                    </span>
                    <input
                      type="number"
                      value={stagedMaxPrice}
                      onChange={(e) =>
                        setStagedMaxPrice(Number(e.target.value))
                      }
                      className="w-full bg-transparent focus:outline-none text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                </div>
              </div>

              {/* Staged In-Stock */}
              <label className="flex items-center justify-between p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 cursor-pointer">
                <span className="text-xs font-mono font-medium text-zinc-800 dark:text-zinc-200">
                  Staged In-Stock Only
                </span>
                <input
                  type="checkbox"
                  checked={stagedInStock}
                  onChange={(e) => setStagedInStock(e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-blue-600 focus:ring-0 cursor-pointer"
                />
              </label>

              {/* Pending URL Preview */}
              <div className="p-3.5 rounded-lg border border-blue-200 dark:border-blue-900/60 bg-blue-50 dark:bg-blue-950/20 font-mono text-xs space-y-1.5">
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider block">
                  Pending 1-Transition URL Preview
                </span>
                <div className="text-zinc-800 dark:text-zinc-200 break-all bg-white dark:bg-zinc-950/80 p-2 rounded border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-400 dark:text-zinc-500">
                    https://paramsync.vercel.app/shop
                  </span>
                  <span className="text-blue-600 dark:text-blue-300 font-semibold">
                    {previewQuery || " (clean URL)"}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleApply}
                disabled={isPending}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold transition-colors shadow-sm disabled:opacity-50"
              >
                <span>Apply All (1 URL Transition)</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <button
                type="button"
                onClick={handleReset}
                className="py-2.5 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-xs font-mono transition-colors"
                title="Reset All Parameters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

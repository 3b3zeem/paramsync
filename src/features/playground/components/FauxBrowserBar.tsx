'use client';

import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Lock,
  Star,
  Columns,
  MoreVertical,
  ShieldCheck,
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface FauxBrowserBarProps {
  isPending?: boolean;
  onResetAll?: () => void;
}

export function FauxBrowserBar({ isPending = false, onResetAll }: FauxBrowserBarProps) {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  return (
    <div className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2">
      <div className="flex items-center gap-2">
        {/* Traffic Light Dots & Navigation Controls */}
        <div className="flex items-center gap-1.5 shrink-0 px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>

          <div className="flex items-center gap-0.5 ml-2 border-l border-zinc-200 dark:border-zinc-800 pl-2">
            <button
              type="button"
              disabled
              className="p-1 rounded text-zinc-400 dark:text-zinc-600 cursor-not-allowed"
              aria-label="Back"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              disabled
              className="p-1 rounded text-zinc-400 dark:text-zinc-600 cursor-not-allowed"
              aria-label="Forward"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onResetAll}
              title="Reset URL parameters to clean state"
              className="p-1 rounded text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              aria-label="Reload"
            >
              <RotateCcw
                className={`w-3.5 h-3.5 ${isPending ? 'animate-spin text-blue-500' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Address Input Bar - Completely Natural Browser URL */}
        <div className="flex-1 flex items-center min-w-0 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-1.5 font-mono text-xs overflow-x-auto text-zinc-800 dark:text-zinc-200">
          <Lock className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 shrink-0 mr-2" />
          <span className="text-zinc-400 dark:text-zinc-500 shrink-0 select-none">https://paramsync.dev/shop</span>

          {queryString ? (
            <span className="text-zinc-900 dark:text-zinc-100 font-mono ml-0.5 truncate select-all">
              ?{queryString}
            </span>
          ) : (
            <span className="text-zinc-400 dark:text-zinc-600 italic ml-2 text-[11px] select-none">
              (clean URL &mdash; defaults purged)
            </span>
          )}
        </div>

        {/* Right Tools & Badges */}
        <div className="flex items-center gap-1.5 shrink-0 px-1 text-zinc-400 dark:text-zinc-500">
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono uppercase px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400">
            Live URL
          </span>

          <button
            type="button"
            className="p-1 rounded text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
            aria-label="Bookmark"
          >
            <Star className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="p-1 rounded text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
            aria-label="Split view"
          >
            <Columns className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="p-1 rounded text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
            aria-label="More options"
          >
            <MoreVertical className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}


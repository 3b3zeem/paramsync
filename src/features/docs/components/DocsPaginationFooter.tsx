'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDocPagination } from '../hooks/useDocPagination';

interface DocsPaginationFooterProps {
  customPath?: string;
  className?: string;
}

export function DocsPaginationFooter({ customPath, className = '' }: DocsPaginationFooterProps) {
  const { prev, next } = useDocPagination(customPath);

  // If neither previous nor next exists, don't render an empty footer
  if (!prev && !next) {
    return null;
  }

  return (
    <nav
      aria-label="Documentation Page Navigation"
      className={`mt-16 pt-8 border-t border-zinc-200 dark:border-[#323846] ${className}`}
    >
      <div className="grid grid-cols-2 divide-x divide-zinc-200 dark:divide-[#323846] border border-zinc-200 dark:border-[#323846] rounded-xl bg-white dark:bg-[#23272f] overflow-hidden shadow-2xs">
        {/* Previous Page Link (Left Half) */}
        <div className="flex flex-col">
          {prev ? (
            <Link
              href={prev.href}
              className="group flex flex-col h-full p-4 sm:p-5 hover:bg-zinc-50 dark:hover:bg-[#191b21]/60 transition-colors focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600"
            >
              <span className="flex items-center gap-1 text-[11px] font-mono font-medium tracking-wider text-zinc-500 uppercase transition-colors group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
                <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                <span>PREVIOUS</span>
              </span>
              <span className="mt-1.5 text-sm sm:text-base font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-white transition-colors truncate">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div className="p-4 sm:p-5 h-full opacity-0 pointer-events-none" aria-hidden="true" />
          )}
        </div>

        {/* Next Page Link (Right Half) */}
        <div className="flex flex-col">
          {next ? (
            <Link
              href={next.href}
              className="group flex flex-col h-full p-4 sm:p-5 hover:bg-zinc-50 dark:hover:bg-[#191b21]/60 transition-colors text-right items-end focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600"
            >
              <span className="flex items-center justify-end gap-1 text-[11px] font-mono font-medium tracking-wider text-zinc-500 uppercase transition-colors group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
                <span>NEXT</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1.5 text-sm sm:text-base font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-white transition-colors truncate">
                {next.title}
              </span>
            </Link>
          ) : (
            <div className="p-4 sm:p-5 h-full opacity-0 pointer-events-none" aria-hidden="true" />
          )}
        </div>
      </div>
    </nav>
  );
}

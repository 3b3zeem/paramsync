"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, Search } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { CommandPalette } from "@/components/shared/CommandPalette";
import { Logo } from "@/components/shared/Logo";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
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

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Global shortcut: Ctrl+K or Cmd+K opens Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isDocs = pathname.startsWith("/docs");
  const isPlayground = pathname.startsWith("/playground");
  const isUseCases = pathname.startsWith("/use-cases");

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-[#323846] bg-white/90 dark:bg-[#23272f]/90 backdrop-blur-md">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 h-18 flex items-center justify-between gap-4">
          {/* Brand Logo & Desktop Navigation */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 group focus:outline-none shrink-0"
            >
              <Logo className="w-10 h-10" />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-xs font-mono">
              <Link
                href="/docs/parsers/parse-as-string"
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  isDocs
                    ? "bg-zinc-100 dark:bg-[#292e39] text-zinc-900 dark:text-zinc-100 font-medium"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/60 dark:hover:bg-[#292e39]/50"
                }`}
              >
                Docs
              </Link>
              <Link
                href="/playground"
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  isPlayground
                    ? "bg-zinc-100 dark:bg-[#292e39] text-zinc-900 dark:text-zinc-100 font-medium"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/60 dark:hover:bg-[#292e39]/50"
                }`}
              >
                Playground
              </Link>
              <Link
                href="/use-cases"
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  isUseCases
                    ? "bg-zinc-100 dark:bg-[#292e39] text-zinc-900 dark:text-zinc-100 font-medium"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/60 dark:hover:bg-[#292e39]/50"
                }`}
              >
                Use Cases
              </Link>
            </nav>
          </div>

          {/* Center/Right Desktop Search Trigger */}
          <div className="flex-1 max-w-md hidden sm:flex items-center justify-end md:justify-center">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="w-full max-w-[400px] flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-[#363c4a] bg-zinc-50 dark:bg-[#242833] text-xs text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600 hover:text-zinc-800 dark:hover:text-zinc-200 transition-all cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
                <span className="truncate">Search docs...</span>
              </div>
              <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-medium rounded border border-zinc-200 dark:border-[#363c4a] bg-white dark:bg-[#292e39] text-zinc-500 dark:text-zinc-400 shadow-2xs">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right Actions: Search Mobile Icon, Theme Toggle, GitHub & npm Links */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Mobile Search Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search documentation"
              title="Search (⌘K)"
              className="sm:hidden p-1.5 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-[#292e39] transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Smooth Theme Toggle Button */}
            <button
              type="button"
              id="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              title={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              className="p-1.5 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-[#292e39] transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-600" />
              )}
            </button>

            {/* Desktop npm link */}
            <a
              href="https://www.npmjs.com/package/paramsync"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded border border-zinc-200 dark:border-[#363c4a] bg-zinc-50 dark:bg-[#292e39] text-[11px] font-mono text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors"
            >
              <span>npm</span>
              <span className="text-zinc-400 dark:text-zinc-500">1.0.4</span>
            </a>

            {/* Desktop GitHub link */}
            <a
              href="https://github.com/3b3zeem/paramsync-lib"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Repository"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-[#292e39] transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-[#363c4a]"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden p-1.5 rounded-md text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-[#292e39] transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="md:hidden border-t border-zinc-200 dark:border-[#2d3340] bg-white/95 dark:bg-[#1b1d24]/95 backdrop-blur-md px-4 py-3 space-y-2 font-mono text-xs overflow-hidden"
            >
              <nav className="flex flex-col space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchOpen(true);
                  }}
                  className="flex items-center justify-between px-3 py-2 rounded-md bg-zinc-100 dark:bg-[#242833] text-zinc-700 dark:text-zinc-300 text-left font-sans text-xs"
                >
                  <div className="flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Search docs & parsers...</span>
                  </div>
                  <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-[#292e39] font-mono">
                    ⌘K
                  </kbd>
                </button>
                <Link
                  href="/docs/parsers/parse-as-string"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-md transition-colors ${
                    isDocs
                      ? "bg-zinc-100 dark:bg-[#292e39] text-zinc-900 dark:text-zinc-100 font-semibold"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-[#292e39] hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  Documentation
                </Link>
                <Link
                  href="/playground"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-md transition-colors ${
                    isPlayground
                      ? "bg-zinc-100 dark:bg-[#292e39] text-zinc-900 dark:text-zinc-100 font-semibold"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-[#292e39] hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  Playground
                </Link>
                <Link
                  href="/use-cases"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-md transition-colors ${
                    isUseCases
                      ? "bg-zinc-100 dark:bg-[#292e39] text-zinc-900 dark:text-zinc-100 font-semibold"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-[#292e39] hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  Use Cases
                </Link>
              </nav>

              <div className="pt-2 border-t border-zinc-200 dark:border-[#2d3340] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.npmjs.com/package/paramsync"
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 rounded border border-zinc-200 dark:border-[#363c4a] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  >
                    npm v1.0.4
                  </a>
                  <a
                    href="https://github.com/3b3zeem/paramsync-lib"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-zinc-200 dark:border-[#363c4a] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Command Palette Modal */}
      <CommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, BookOpen } from "lucide-react";
import {
  docsNavigationConfig,
  flatDocsNavigation,
} from "../config/docs-navigation.config";
import { usePackageStats } from "@/hooks/usePackageStats";

interface DocsSidebarProps {
  className?: string;
}

export function DocsSidebar({ className = "" }: DocsSidebarProps) {
  const pathname = usePathname();
  const { version } = usePackageStats();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Keep track of which groups are open. Default all open for rapid developer discovery.
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    docsNavigationConfig.forEach((group) => {
      initial[group.title] = true;
    });
    return initial;
  });

  // Close mobile drawer whenever pathname changes
  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileDrawerOpen]);

  // Handle escape key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileDrawerOpen) {
        setMobileDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileDrawerOpen]);

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Find active item for mobile trigger label
  const activeItem =
    flatDocsNavigation.find((item) => item.href === pathname) ||
    flatDocsNavigation.find(
      (item) => item.href !== "/docs" && pathname.startsWith(item.href),
    );

  const renderNavList = (isMobile = false) => (
    <div className="space-y-5">
      {docsNavigationConfig.map((group) => {
        const isOpen = openGroups[group.title] ?? true;

        return (
          <div key={group.title} className="select-none">
            {/* Group Accordion Header */}
            <button
              type="button"
              onClick={() => toggleGroup(group.title)}
              className="w-full flex items-center justify-between text-[11px] font-mono font-semibold tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 uppercase px-2 py-1 rounded transition-colors group"
              aria-expanded={isOpen}
            >
              <span className="group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                {group.title}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 0 : -90 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </motion.span>
            </button>

            {/* Collapsible Group Items */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-0.5 overflow-hidden pt-1"
                >
                  {group.items.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/docs" && pathname.startsWith(item.href));

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => {
                            if (isMobile) setMobileDrawerOpen(false);
                          }}
                          className={`group flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-mono transition-colors relative ${
                            isActive
                              ? "bg-zinc-100 dark:bg-[#23272f] text-zinc-900 dark:text-zinc-100 font-medium"
                              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/60 dark:hover:bg-[#23272f]/50"
                          }`}
                        >
                          {isActive && (
                            <motion.div
                              layoutId={
                                isMobile
                                  ? "sidebar-mobile-indicator"
                                  : "sidebar-desktop-indicator"
                              }
                              className="absolute left-0 top-1 bottom-1 w-0.5 rounded-r bg-blue-500"
                              transition={{
                                type: "spring",
                                stiffness: 350,
                                damping: 35,
                              }}
                            />
                          )}
                          <span className="truncate">{item.title}</span>
                          {item.badge && (
                            <span
                              className={`text-[10px] px-1.5 py-0.2 rounded border font-mono ${
                                isActive
                                  ? "border-zinc-300 dark:border-[#383f4e] bg-zinc-200/60 dark:bg-[#191b21] text-zinc-800 dark:text-zinc-300"
                                  : "border-zinc-200 dark:border-[#323846] bg-zinc-50 dark:bg-[#191b21] text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-400"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {/* 1. Mobile Sub-bar Trigger (Visible strictly on < md) */}
      <div className="md:hidden w-full px-4 sm:px-8 py-2.5 sticky top-14 z-30 bg-white/95 dark:bg-[#191b21]/95 backdrop-blur-md border-b border-zinc-200 dark:border-[#323846] flex items-center justify-between select-none">
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-zinc-200 dark:border-[#323846] bg-zinc-50 dark:bg-[#23272f] text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-500 transition-colors"
          aria-label="Open documentation navigation menu"
        >
          <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium">Menu</span>
          <ChevronDown className="w-3 h-3 text-zinc-400" />
        </button>

        {/* Current Active Page Pill on Mobile */}
        {activeItem && (
          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 dark:text-zinc-400 truncate max-w-[55vw]">
            <span className="hidden sm:inline">Docs &gt;</span>
            <span className="text-zinc-800 dark:text-zinc-200 font-medium truncate">
              {activeItem.title}
            </span>
          </div>
        )}
      </div>

      {/* 2. Mobile Slide-Over Drawer with Backdrop (Visible on mobile when opened) */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Documentation Navigation"
            className="md:hidden fixed inset-0 z-50 flex"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Slide-over Menu Content */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 350 }}
              className="relative z-10 w-72 max-w-[85vw] h-full bg-white dark:bg-[#191b21] border-r border-zinc-200 dark:border-[#323846] p-4 overflow-y-auto flex flex-col justify-between shadow-2xl"
            >
              <div>
                {/* Header with Close Button */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-200 dark:border-[#323846]">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      Documentation
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileDrawerOpen(false)}
                    aria-label="Close documentation menu"
                    className="p-1 rounded-md text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-[#23272f] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Docs Navigation Links */}
                {renderNavList(true)}
              </div>

              {/* Drawer Footer */}
              <div className="pt-4 mt-6 border-t border-zinc-200 dark:border-[#323846] text-[11px] font-mono text-zinc-500 flex items-center justify-between">
                <span suppressHydrationWarning>paramsync v{version}</span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com/3b3zeem/paramsync-lib"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
                  >
                    Library
                  </a>
                  <span className="text-zinc-300 dark:text-zinc-700 select-none">&bull;</span>
                  <a
                    href="https://github.com/3b3zeem/paramsync"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
                  >
                    Website
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Desktop Sticky Sidebar (Visible strictly on >= md) */}
      <aside
        aria-label="Documentation Navigation"
        className={`hidden md:block w-72 shrink-0 border-r border-zinc-200 dark:border-[#323846] bg-white dark:bg-[#191b21] py-6 pr-4 pl-2 h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto ${className}`}
      >
        {renderNavList(false)}
      </aside>
    </>
  );
}

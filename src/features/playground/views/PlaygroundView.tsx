'use client';

import React, { useState, Suspense } from 'react';
import {
  useBatchQueryParams,
  parseAsArray,
  parseAsString,
  parseAsNumberRange,
} from 'paramsync';
import { PlaygroundHeader } from '../components/PlaygroundHeader';
import { FauxBrowserBar } from '../components/FauxBrowserBar';
import { ActiveFiltersSidebar } from '../components/ActiveFiltersSidebar';
import { ProductCatalogGrid } from '../components/ProductCatalogGrid';
import { BatchStagingDrawer } from '../components/BatchStagingDrawer';
import { StateInspector } from '../components/StateInspector';

function PlaygroundContent() {
  const [activeTab, setActiveTab] = useState<'instant' | 'batch'>('instant');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { setBatchParams, resetAllParams, isPending } = useBatchQueryParams();

  // Preset button loads the exact parameters from the reference screenshot
  const handleApplyPreset = () => {
    setBatchParams({
      q: 'shoes',
      category: { value: ['footwear'], parser: parseAsArray(parseAsString) },
      price: { value: { min: 100, max: 500 }, parser: parseAsNumberRange(0, 1000) },
      inStock: 'true',
      sort: 'price.asc',
      page: null, // Reset to page 1
    });
  };

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-6 space-y-4">
      {/* 1. Sub-Header Toolbar (Modes, Clean URL Badge, Share/Reset Actions) */}
      <PlaygroundHeader
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'batch') {
            setIsDrawerOpen(true);
          }
        }}
        onOpenDrawer={handleOpenDrawer}
        onResetAll={() => resetAllParams()}
        onApplyPreset={handleApplyPreset}
      />

      {/* 2. Real-time Faux Browser Address Bar */}
      <FauxBrowserBar
        isPending={isPending}
        onResetAll={() => resetAllParams()}
      />

      {/* 3. Main Simulator Body: Left Filter Sidebar + Right Product Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start pt-2">
        {/* Left Column: Active Filters (3.5 cols on xl, 4 on lg) */}
        <div className="lg:col-span-4 xl:col-span-3">
          <ActiveFiltersSidebar onOpenDrawer={handleOpenDrawer} />
        </div>

        {/* Right Column: Live Product Catalog & Pagination (8 cols on lg, 9 on xl) */}
        <div className="lg:col-span-8 xl:col-span-9">
          <ProductCatalogGrid />
        </div>
      </div>

      {/* 4. Bottom Inspection: ParamSync Runtime Kernel & Sub-footer */}
      <div className="pt-4 border-t border-zinc-800/80">
        <StateInspector />
      </div>

      {/* 5. Slide-Over Batch Staging Drawer */}
      <BatchStagingDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}

export function PlaygroundView() {
  return (
    <Suspense
      fallback={
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-16 text-center text-zinc-500 font-mono text-sm">
          Initializing paramsync simulator kernel...
        </div>
      }
    >
      <PlaygroundContent />
    </Suspense>
  );
}

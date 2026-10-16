import React from 'react';
import { DocsSidebar } from '@/features/docs/components/DocsSidebar';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col md:flex-row">
      {/* Sidebar isolated strictly within docs layout (handles desktop sticky & mobile drawer) */}
      <DocsSidebar />

      {/* Main documentation content area */}
      <main className="flex-1 min-w-0 md:pl-10 lg:pl-14 pb-16 pt-2 md:pt-0">
        {children}
      </main>
    </div>
  );
}

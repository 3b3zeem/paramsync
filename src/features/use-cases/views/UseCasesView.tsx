'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Table, FileSearch, ArrowRight } from 'lucide-react';
import { CodeBlock } from '@/components/shared/CodeBlock';

const RECIPES = [
  {
    title: 'E-Commerce Filter Drawer & Facets',
    filename: 'EcommerceFilters.tsx',
    description: 'Multi-category selection, price range sliders, in-stock toggles, and sorting with instant local feedback and zero keystroke lag.',
    icon: ShoppingBag,
    code: `const [categories, setCategories] = useQueryState('cat', parseAsArray(parseAsString));
const [price, setPrice] = useQueryState('price', parseAsNumberRange(0, 1000));
const [inStock, setInStock] = useQueryState('stock', parseAsBoolean.withDefault(false));`,
  },
  {
    title: 'Data Grid & Analytics Tables',
    filename: 'AnalyticsGrid.tsx',
    description: 'Column header sorting, page limit toggling, pagination bounds, and search filters with canonical page index resets.',
    icon: Table,
    code: `const [sort, setSort] = useQueryState('sort', parseAsSort('createdAt', 'desc'));
const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
const [limit, setLimit] = useQueryState('limit', parseAsInteger.withDefault(25));`,
  },
  {
    title: 'Server Component (RSC) Data Fetching',
    filename: 'CatalogPage.tsx',
    description: 'Pass clean query parameters directly into async React Server Components and Route Handlers without client bundle overhead.',
    icon: FileSearch,
    code: `// app/catalog/page.tsx (Server Component)
export default async function CatalogPage({ searchParams }) {
  const { q } = await searchParams;
  const products = await db.products.findMany({ where: { name: { contains: q || '' } } });
  return <ProductList items={products} />;
}`,
  },
];

export function UseCasesView() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-12">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Real-World Recipes &amp; Patterns
        </h1>
        <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          Production architectural patterns for e-commerce, enterprise dashboards, and React Server Components.
        </p>
      </div>

      <div className="space-y-8">
        {RECIPES.map((recipe) => {
          const Icon = recipe.icon;
          return (
            <div
              key={recipe.title}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-8 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center gap-3.5 mb-3">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  {recipe.title}
                </h2>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 max-w-3xl leading-relaxed">
                {recipe.description}
              </p>
              <CodeBlock code={recipe.code} language="tsx" filename={recipe.filename} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { NavGroup, NavItem, DocPaginationInfo } from '../types/docs.types';

export const docsNavigationConfig: NavGroup[] = [
  {
    title: 'START',
    items: [
      {
        title: 'Overview',
        href: '/docs',
        description: 'Introduction to paramsync and zero-overhead URL state management',
      },
      {
        title: 'Installation',
        href: '/docs/installation',
        description: 'Install paramsync with npm, pnpm, or yarn alongside Next.js 14/15',
      },
      {
        title: 'Quick Start Tutorial',
        href: '/docs/quick-start',
        description: 'Step-by-step tutorial building a live reactive search and pagination bar',
      },
    ],
  },
  {
    title: 'PARSERS REFERENCE',
    items: [
      {
        title: 'parseAsString',
        href: '/docs/parsers/parse-as-string',
        badge: 'Built-in',
        description: 'Text inputs, search keywords, tab keys, and single-value query parameters',
      },
      {
        title: 'parseAsInteger',
        href: '/docs/parsers/parse-as-integer',
        badge: 'Built-in',
        description: 'Strict integer numbers for pagination indices, limits, and counters',
      },
      {
        title: 'parseAsFloat',
        href: '/docs/parsers/parse-as-float',
        badge: 'Built-in',
        description: 'Floating-point decimals for ratings, coordinates, and percentages',
      },
      {
        title: 'parseAsBoolean',
        href: '/docs/parsers/parse-as-boolean',
        badge: 'Built-in',
        description: 'Toggle switches, stock availability, and binary URL flags',
      },
      {
        title: 'parseAsArray',
        href: '/docs/parsers/parse-as-array',
        badge: 'Collection',
        description: 'Delimited lists for category chips, tag selectors, and multi-checkboxes',
      },
      {
        title: 'parseAsNumberRange',
        href: '/docs/parsers/parse-as-number-range',
        badge: 'Composite',
        description: 'Dual-thumb price sliders and numeric range bounds (min-max)',
      },
      {
        title: 'parseAsSort',
        href: '/docs/parsers/parse-as-sort',
        badge: 'Composite',
        description: 'Column and order sorting for feeds and data grids (field.order)',
      },
      {
        title: 'createParser',
        href: '/docs/parsers/create-parser',
        badge: 'Custom',
        description: 'Build custom domain-specific parsers with custom validation & serialization',
      },
    ],
  },
  {
    title: 'HOOKS REFERENCE',
    items: [
      {
        title: 'useQueryState',
        href: '/docs/hooks/use-query-state',
        description: 'Individual reactive state hook with zero typing lag and debounced URL updates',
      },
      {
        title: 'useBatchQueryParams',
        href: '/docs/hooks/use-batch-query-params',
        description: 'Atomic multi-parameter updates for filter drawers and reset-all actions',
      },
    ],
  },
  {
    title: 'CORE CONCEPTS',
    items: [
      {
        title: 'Clean URL Policy',
        href: '/docs/concepts/clean-url-policy',
        description: 'Automatic parameter purging matrix for defaults, empty strings, and arrays',
      },
      {
        title: 'Suspense Boundaries & Gotchas',
        href: '/docs/concepts/suspense-boundaries',
        description: 'Avoiding SSR hydration mismatch and Next.js App Router de-optimizations',
      },
      {
        title: 'Stale Page Prevention',
        href: '/docs/concepts/stale-page-prevention',
        description: 'Techniques for resetting page indices when filter criteria change',
      },
    ],
  },
  {
    title: 'SUPPORT',
    items: [
      {
        title: 'Integration Recipes',
        href: '/docs/recipes',
        description: 'TanStack Query integration, RSC data fetching, and Shadcn UI components',
      },
      {
        title: 'FAQ & Troubleshooting',
        href: '/docs/faq',
        description: 'Common questions, debugging tips, and migration from alternative libraries',
      },
    ],
  },
];

/**
 * Flattened array of all navigation items for sequential previous/next pagination.
 */
export const flatDocsNavigation: NavItem[] = docsNavigationConfig.flatMap((group) => group.items);

/**
 * Calculates previous and next navigation items based on current route pathname.
 */
export function getDocPagination(currentPathname: string): DocPaginationInfo {
  const normalizedPath = currentPathname.replace(/\/$/, '') || '/docs';
  const index = flatDocsNavigation.findIndex((item) => {
    const itemPath = item.href.replace(/\/$/, '') || '/docs';
    return itemPath === normalizedPath;
  });

  if (index === -1) {
    // If not exact match, try prefix match (for sub-routes)
    const prefixIndex = flatDocsNavigation.findIndex((item) => {
      const itemPath = item.href.replace(/\/$/, '');
      return itemPath.length > 5 && normalizedPath.startsWith(itemPath);
    });

    if (prefixIndex !== -1) {
      return {
        prev: prefixIndex > 0 ? flatDocsNavigation[prefixIndex - 1] : null,
        next: prefixIndex < flatDocsNavigation.length - 1 ? flatDocsNavigation[prefixIndex + 1] : null,
      };
    }

    return { prev: null, next: null };
  }

  return {
    prev: index > 0 ? flatDocsNavigation[index - 1] : null,
    next: index < flatDocsNavigation.length - 1 ? flatDocsNavigation[index + 1] : null,
  };
}

'use client';

import { usePathname } from 'next/navigation';
import { getDocPagination } from '../config/docs-navigation.config';
import { DocPaginationInfo } from '../types/docs.types';

export function useDocPagination(customPath?: string): DocPaginationInfo {
  const pathname = usePathname();
  const targetPath = customPath ?? pathname ?? '/docs';
  return getDocPagination(targetPath);
}

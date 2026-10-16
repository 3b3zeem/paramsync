import { LucideIcon } from 'lucide-react';

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export interface FeaturePillar {
  icon: LucideIcon;
  title: string;
  description: string;
  badge: string;
  colorClass: string;
}

export interface ComparisonItem {
  category: string;
  highlight: string;
  vanilla: string;
  paramsync: string;
}

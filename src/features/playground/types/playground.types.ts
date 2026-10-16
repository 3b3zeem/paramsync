export interface PlaygroundFilterState {
  q: string;
  categories: string[];
  price: { min: number; max: number };
  sort: { field: string; order: 'asc' | 'desc' };
  inStock: boolean;
  page: number;
}

export type PlaygroundTab = 'instant' | 'batch';

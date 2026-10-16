export interface NavItem {
  title: string;
  href: string;
  badge?: string;
  description?: string;
  isExternal?: boolean;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface DocPaginationItem {
  title: string;
  href: string;
}

export interface DocPaginationInfo {
  prev: DocPaginationItem | null;
  next: DocPaginationItem | null;
}

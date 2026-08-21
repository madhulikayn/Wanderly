import { Category, PriceRange } from './destination';

export type SortOption = 'recommended' | 'rating-high' | 'price-low' | 'price-high';

export interface DestinationFilters {
  searchQuery: string;
  category: Category | 'All' | 'Nature';
  priceLevel: PriceRange | 'All';
  minRating: number;
  sortBy: SortOption;
}


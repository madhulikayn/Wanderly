export type PriceRange = '$' | '$$' | '$$$' | '$$$$';

export type Category = 
  | 'Beach & Coast'
  | 'Mountain & Hiking'
  | 'Cultural & Heritage'
  | 'Luxury Retreat'
  | 'Adventure & Wildlife'
  | 'Urban & Architecture';

export interface Location {
  country: string;
  region: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Activity {
  id: string;
  title: string;
  duration: string;
  category: string;
}

export interface Destination {
  id: string;
  title: string;
  tagline: string;
  description: string;
  location: Location;
  category: Category;
  rating: number;
  reviewsCount: number;
  priceLevel: PriceRange;
  avgCostPerDayUSD: number;
  bestTimeToVisit: string;
  heroImage: string;
  galleryImages: string[];
  featured: boolean;
  trending: boolean;
  tags: string[];
  highlights: string[];
  activities: Activity[];
}

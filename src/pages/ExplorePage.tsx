import React, { useState, useMemo } from 'react';
import { Search, X, Sparkles, SlidersHorizontal, RefreshCw, ArrowUpDown, Compass } from 'lucide-react';
import { MOCK_DESTINATIONS } from '../data/destinations';
import { DestinationCard } from '../components/destination/DestinationCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SortOption } from '../types/filter';

const CATEGORIES = [
  'All',
  'Beach & Coast',
  'Cultural & Heritage',
  'Mountain & Hiking',
  'Luxury Retreat',
  'Nature'
] as const;

export const ExplorePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('recommended');

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('recommended');
  };

  const isFiltered = searchQuery.trim() !== '' || selectedCategory !== 'All' || sortBy !== 'recommended';

  // Filter and sort logic
  const filteredDestinations = useMemo(() => {
    let result = [...MOCK_DESTINATIONS];

    // 1. Search Query Filter (Title, Country, Region, Tags)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((dest) => {
        const titleMatch = dest.title.toLowerCase().includes(query);
        const countryMatch = dest.location.country.toLowerCase().includes(query);
        const regionMatch = dest.location.region.toLowerCase().includes(query);
        const tagMatch = dest.tags.some((tag) => tag.toLowerCase().includes(query));
        const categoryMatch = dest.category.toLowerCase().includes(query);

        return titleMatch || countryMatch || regionMatch || tagMatch || categoryMatch;
      });
    }

    // 2. Category Filter
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Nature') {
        result = result.filter(
          (dest) =>
            dest.category === 'Adventure & Wildlife' ||
            dest.category === 'Mountain & Hiking' ||
            dest.tags.some((t) =>
              ['nature', 'wildlife', 'lakes', 'mountains', 'rockies'].includes(t.toLowerCase())
            )
        );
      } else {
        result = result.filter((dest) => dest.category === selectedCategory);
      }
    }

    // 3. Sorting
    switch (sortBy) {
      case 'rating-high':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        result.sort((a, b) => a.avgCostPerDayUSD - b.avgCostPerDayUSD);
        break;
      case 'price-high':
        result.sort((a, b) => b.avgCostPerDayUSD - a.avgCostPerDayUSD);
        break;
      case 'recommended':
      default:
        // Featured ones first, then default order
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="space-y-8 pb-12">
      {/* Prominent Page Header */}
      <div className="space-y-4">
        <Badge variant="emerald" className="px-3.5 py-1 text-xs uppercase tracking-wider font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>DISCOVER YOUR NEXT ESCAPE</span>
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
          Explore destinations
        </h1>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
          Search, filter, and discover world-famous landmarks, secret coastal sanctuaries, and high-altitude alpine retreats.
        </p>
      </div>

      {/* Search, Filter & Sort Shell */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800/80 space-y-5 shadow-xl">
        {/* Top Row: Search Input + Sort Dropdown */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destinations by name, country, or tag..."
              className="w-full pl-11 pr-10 py-3.5 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <div className="relative w-full md:w-56">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 pointer-events-none">
                <ArrowUpDown className="w-4 h-4" />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort destinations"
                className="w-full pl-10 pr-8 py-3.5 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-200 text-sm font-medium focus:outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20 appearance-none cursor-pointer transition-all duration-200"
              >
                <option value="recommended" className="bg-slate-900 text-slate-200">Recommended</option>
                <option value="rating-high" className="bg-slate-900 text-slate-200">Highest Rated</option>
                <option value="price-low" className="bg-slate-900 text-slate-200">Lowest Daily Cost</option>
                <option value="price-high" className="bg-slate-900 text-slate-200">Highest Daily Cost</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-xs">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Category Filter Pills */}
        <div className="pt-2 border-t border-slate-800/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
              Categories
            </span>
            {isFiltered && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                Reset filters
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 scale-[1.02]'
                      : 'bg-slate-950/70 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-900/80'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results Header / Counter */}
      <div className="flex items-center justify-between text-sm text-slate-400 px-1">
        <span className="font-medium text-slate-300">
          Showing <strong className="text-white font-bold">{filteredDestinations.length}</strong> {filteredDestinations.length === 1 ? 'destination' : 'destinations'} found
        </span>
        {searchQuery && (
          <span className="text-xs text-slate-400 hidden sm:inline-block">
            Matching &ldquo;<span className="text-emerald-400 font-medium">{searchQuery}</span>&rdquo;
          </span>
        )}
      </div>

      {/* Destinations Responsive Card Grid */}
      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <Card hoverEffect={false} className="p-12 text-center my-8 bg-slate-900/40 border-slate-800/80">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center mx-auto text-emerald-400 shadow-inner">
              <Compass className="w-8 h-8 opacity-90" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-white font-heading">No destinations found</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                We couldn&apos;t find any destinations matching &ldquo;{searchQuery || selectedCategory}&rdquo;. Try adjusting your search query or choosing another category.
              </p>
            </div>
            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={handleResetFilters}
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset All Filters</span>
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};


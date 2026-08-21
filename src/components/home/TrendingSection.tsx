import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { MOCK_DESTINATIONS } from '../../data/destinations';
import { DestinationCard } from '../destination/DestinationCard';
import { Badge } from '../ui/Badge';

export const TrendingSection: React.FC = () => {
  // Select top 4 trending or featured destinations
  const trendingDestinations = MOCK_DESTINATIONS.filter((d) => d.trending || d.featured).slice(0, 4);

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <Badge variant="emerald" className="px-3 py-1 text-xs uppercase tracking-wider font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Trending Destinations</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Popular Escapes Right Now
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            Discovered by global wanderers — handpicked spots experiencing soaring demand and exceptional reviews.
          </p>
        </div>

        <Link
          to="/explore"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 text-sm font-semibold transition-all group shrink-0 self-start md:self-auto"
        >
          <span>Explore All Destinations</span>
          <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid of 4 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingDestinations.map((dest) => (
          <DestinationCard key={dest.id} destination={dest} />
        ))}
      </div>
    </section>
  );
};

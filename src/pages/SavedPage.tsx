import React, { useState, useEffect } from 'react';
import { Bookmark, Compass, Map, Sparkles, BookmarkX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_DESTINATIONS } from '../data/destinations';
import { Destination } from '../types/destination';
import { getSavedDestinationIds, removeSavedDestinationId } from '../utils/storage';
import { DestinationCard } from '../components/destination/DestinationCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const SavedPage: React.FC = () => {
  const [savedDestinations, setSavedDestinations] = useState<Destination[]>([]);

  const refreshSavedDestinations = () => {
    const savedIds = getSavedDestinationIds();
    const filtered = MOCK_DESTINATIONS.filter((dest) => savedIds.includes(dest.id));
    setSavedDestinations(filtered);
  };

  useEffect(() => {
    refreshSavedDestinations();

    // Keep in sync when storage changes in another tab
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'wanderly_saved_destinations' || e.key === null) {
        refreshSavedDestinations();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleClearAll = () => {
    savedDestinations.forEach((dest) => removeSavedDestinationId(dest.id));
    setSavedDestinations([]);
  };

  const count = savedDestinations.length;

  return (
    <div className="space-y-10 pb-16">
      {/* ─── Page Header ─────────────────────────────────────────────── */}
      <div className="space-y-4">
        <Badge
          variant="emerald"
          className="px-3.5 py-1 text-xs uppercase tracking-wider font-semibold"
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Your Collection</span>
        </Badge>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
          Saved destinations
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
          Your personal travel shortlist — bookmark destinations you love and plan
          your next great adventure from one place.
        </p>
      </div>

      {count > 0 ? (
        <div className="space-y-6">
          {/* ─── Count + Actions bar ───────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1">
            <p className="text-sm font-medium text-slate-300">
              <strong className="text-white font-bold text-base">{count}</strong>{' '}
              {count === 1 ? 'destination' : 'destinations'} saved
            </p>

            <button
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400
                         hover:text-rose-400 transition-colors duration-150 focus:outline-none
                         focus:ring-2 focus:ring-rose-500/40 rounded-md px-1"
              aria-label="Clear all saved destinations"
            >
              <BookmarkX className="w-3.5 h-3.5" />
              Clear all
            </button>
          </div>

          {/* ─── Responsive Card Grid ──────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {savedDestinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                onBookmarkToggle={refreshSavedDestinations}
              />
            ))}
          </div>

          {/* ─── Bottom nudge ─────────────────────────────────────────── */}
          <div className="pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              Want to add more?
            </p>
            <Link to="/explore">
              <Button variant="outline" size="sm">
                <Compass className="w-4 h-4" />
                <span>Explore more destinations</span>
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        /* ─── Empty State ─────────────────────────────────────────────── */
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
          {/* Icon cluster */}
          <div className="relative">
            <div
              className="w-24 h-24 rounded-3xl bg-slate-900 border border-slate-800
                          flex items-center justify-center text-slate-600 shadow-inner"
            >
              <Map className="w-11 h-11" />
            </div>
            <span
              className="absolute -top-2 -right-2 w-8 h-8 rounded-xl bg-emerald-500/10
                         border border-emerald-500/20 flex items-center justify-center
                         text-emerald-400"
            >
              <Sparkles className="w-4 h-4" />
            </span>
          </div>

          {/* Copy */}
          <div className="space-y-2 max-w-sm">
            <h2 className="text-2xl font-bold text-white font-heading">
              No saved destinations yet
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Tap the{' '}
              <span className="inline-flex items-center gap-1 align-middle">
                <Bookmark className="w-3.5 h-3.5 text-emerald-400" />
              </span>{' '}
              bookmark icon on any destination card or detail page to save it here. Your
              collection persists across sessions.
            </p>
          </div>

          {/* CTA */}
          <Link to="/explore">
            <Button variant="primary" size="lg" className="gap-2 mt-2">
              <Compass className="w-4 h-4" />
              <span>Explore destinations</span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};


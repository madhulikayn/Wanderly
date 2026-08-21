import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Bookmark, ArrowRight } from 'lucide-react';
import { Destination } from '../../types/destination';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { isDestinationSaved, saveDestinationId, removeSavedDestinationId } from '../../utils/storage';
import { formatCurrency, formatRating } from '../../utils/formatters';

interface DestinationCardProps {
  destination: Destination;
  onBookmarkToggle?: (saved: boolean) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onBookmarkToggle }) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    setIsSaved(isDestinationSaved(destination.id));
  }, [destination.id]);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) {
      removeSavedDestinationId(destination.id);
      setIsSaved(false);
      onBookmarkToggle?.(false);
    } else {
      saveDestinationId(destination.id);
      setIsSaved(true);
      onBookmarkToggle?.(true);
    }
  };

  return (
    <Card className="flex flex-col h-full group">
      {/* Image Header Container */}
      <div className="relative h-60 w-full overflow-hidden bg-slate-950">
        <img
          src={destination.heroImage}
          alt={destination.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

        {/* Top Badges Overlay */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Badge variant="emerald" className="shadow-md backdrop-blur-md bg-slate-950/70">
            {destination.category}
          </Badge>

          <button
            onClick={handleBookmarkClick}
            aria-label={isSaved ? `Remove ${destination.title} from saved` : `Save ${destination.title}`}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${isSaved
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/30'
                : 'bg-slate-950/60 text-slate-300 hover:text-white hover:bg-slate-900/80 border border-slate-700/60'
              }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-slate-950' : ''}`} />
          </button>
        </div>

        {/* Bottom Rating Badge */}
        <div className="absolute bottom-3 left-4 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-amber-300 border border-slate-800">
          <Star className="w-3.5 h-3.5 fill-amber-300" />
          <span>{formatRating(destination.rating)}</span>
          <span className="text-slate-400 font-normal">({destination.reviewsCount})</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white font-heading group-hover:text-emerald-400 transition-colors">
              <Link to={`/destination/${destination.id}`}>
                {destination.title}
              </Link>
            </h3>
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              {destination.location.country}
            </span>
          </div>
          <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed font-normal">
            {destination.tagline}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {destination.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/60 text-slate-400 border border-slate-700/40">
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer info: price & link */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Avg. daily cost</span>
            <span className="text-sm font-bold text-white">
              {formatCurrency(destination.avgCostPerDayUSD)} <span className="text-xs font-normal text-slate-400">/ day</span>
            </span>
          </div>

          <Link
            to={`/destination/${destination.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group-hover:translate-x-0.5"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </Card>
  );
};

import React from 'react';
import { Calendar, MapPin, DollarSign, Clock, Trash2, Eye, ListChecks } from 'lucide-react';
import { Trip } from '../../types/trip';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatCurrency, formatDateRange } from '../../utils/formatters';

interface TripCardProps {
  trip: Trip;
  onView: (trip: Trip) => void;
  onDelete: (trip: Trip) => void;
}

export const TripCard: React.FC<TripCardProps> = ({ trip, onView, onDelete }) => {
  // Calculate total number of planned activities across all days
  const totalActivities = trip.days ? trip.days.reduce((acc, day) => acc + (day.activities?.length || 0), 0) : 0;

  const statusVariant = trip.status === 'completed' ? 'slate' : 'emerald';

  return (
    <Card className="flex flex-col justify-between h-full group hover:border-emerald-500/40 transition-all duration-300">
      <div className="space-y-4 p-5 sm:p-6">
        {/* Header Image & Status */}
        <div className="relative h-44 -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 mb-4 overflow-hidden">
          <img
            src={trip.destination?.heroImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'}
            alt={trip.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant={statusVariant} className="uppercase text-[10px] tracking-wider font-semibold px-2.5 py-0.5 shadow-md">
              {trip.status}
            </Badge>
          </div>

          <div className="absolute top-3 right-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(trip);
              }}
              className="p-2 rounded-xl bg-slate-950/60 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border border-slate-700/50 hover:border-rose-500/40 backdrop-blur-md transition-all duration-200"
              title="Delete Trip"
              aria-label={`Delete ${trip.title}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div className="text-xs text-slate-300 font-medium flex items-center gap-1.5 bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-800/80">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">
                {trip.destination?.title || 'Custom Destination'}{trip.destination?.location?.country ? `, ${trip.destination.location.country}` : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-xl font-bold text-white font-heading group-hover:text-emerald-400 transition-colors line-clamp-1">
            {trip.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>{formatDateRange(trip.startDate, trip.endDate)}</span>
          </p>
        </div>

        {/* Details Metrics */}
        <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Duration</span>
            <div className="flex items-center gap-1 mt-0.5 text-slate-200 font-medium">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{trip.numberOfDays} {trip.numberOfDays === 1 ? 'Day' : 'Days'}</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Activities</span>
            <div className="flex items-center gap-1 mt-0.5 text-slate-200 font-medium">
              <ListChecks className="w-3.5 h-3.5 text-emerald-400" />
              <span>{totalActivities} Planned</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold font-mono">Budget</span>
            <div className="flex items-center gap-1 mt-0.5 text-slate-200 font-medium">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>{trip.budgetUSD && trip.budgetUSD > 0 ? formatCurrency(trip.budgetUSD) : 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0">
        <Button
          variant="outline"
          size="md"
          className="w-full justify-center gap-2 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10"
          onClick={() => onView(trip)}
        >
          <Eye className="w-4 h-4 text-emerald-400" />
          <span>View / Edit Itinerary</span>
        </Button>
      </div>
    </Card>
  );
};

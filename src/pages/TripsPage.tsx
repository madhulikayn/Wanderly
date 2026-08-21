import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Sparkles, Luggage } from 'lucide-react';
import { Trip } from '../types/trip';
import { getSavedUserTrips, removeUserTrip } from '../utils/storage';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { TripCard } from '../components/trips/TripCard';
import { CreateTripModal } from '../components/trips/CreateTripModal';
import { TripDetailModal } from '../components/trips/TripDetailModal';
import { DeleteConfirmModal } from '../components/trips/DeleteConfirmModal';

export const TripsPage: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTripForView, setSelectedTripForView] = useState<Trip | null>(null);
  const [selectedTripForDelete, setSelectedTripForDelete] = useState<Trip | null>(null);

  const loadTrips = () => {
    const loaded = getSavedUserTrips<Trip>();
    setTrips(loaded);
  };

  useEffect(() => {
    loadTrips();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'wanderly_user_trips' || e.key === null) {
        loadTrips();
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const handleTripCreated = (newTrip: Trip) => {
    setTrips((prev) => {
      const filtered = prev.filter((t) => t.id !== newTrip.id);
      return [newTrip, ...filtered];
    });
  };

  const handleTripUpdated = (updatedTrip: Trip) => {
    setTrips((prev) => prev.map((t) => (t.id === updatedTrip.id ? updatedTrip : t)));
    setSelectedTripForView(updatedTrip);
  };

  const handleConfirmDelete = (tripId: string) => {
    const updated = removeUserTrip<Trip>(tripId);
    setTrips(updated);
    setSelectedTripForDelete(null);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <Badge variant="emerald" className="px-3.5 py-1 text-xs uppercase tracking-wider font-semibold">
            <MapPin className="w-3.5 h-3.5" />
            <span>YOUR JOURNEYS</span>
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
            Plan your next adventure
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
            Organize itineraries, schedule daily activities, manage vacation budgets, and bring all your travel plans together.
          </p>
        </div>

        <div className="shrink-0">
          <Button
            variant="primary"
            size="lg"
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full sm:w-auto shadow-emerald-500/25"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Trip</span>
          </Button>
        </div>
      </div>

      {/* Trips Content */}
      {trips.length > 0 ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <p className="text-sm text-slate-400 font-medium">
              Showing <strong className="text-white font-bold">{trips.length}</strong> planned {trips.length === 1 ? 'journey' : 'journeys'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {trips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onView={(t) => setSelectedTripForView(t)}
                onDelete={(t) => setSelectedTripForDelete(t)}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 bg-slate-900/40 rounded-3xl border border-slate-800/80 p-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 shadow-inner">
              <Luggage className="w-11 h-11 text-emerald-400" />
            </div>
            <span className="absolute -top-2 -right-2 w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>

          <div className="space-y-2 max-w-md">
            <h2 className="text-2xl font-bold text-white font-heading">
              No trips planned yet
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Start mapping out your next getaway! Create a trip to schedule activities, set dates, and track your vacation budget.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={() => setIsCreateModalOpen(true)}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create your first trip</span>
          </Button>
        </div>
      )}

      {/* Modals */}
      <CreateTripModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onTripCreated={handleTripCreated}
      />

      <TripDetailModal
        trip={selectedTripForView}
        isOpen={Boolean(selectedTripForView)}
        onClose={() => setSelectedTripForView(null)}
        onTripUpdated={handleTripUpdated}
      />

      <DeleteConfirmModal
        trip={selectedTripForDelete}
        isOpen={Boolean(selectedTripForDelete)}
        onClose={() => setSelectedTripForDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

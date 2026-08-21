import React, { useState } from 'react';
import { X, Calendar, MapPin, DollarSign, Compass, AlertCircle } from 'lucide-react';
import { MOCK_DESTINATIONS } from '../../data/destinations';
import { Trip, TripDay } from '../../types/trip';
import { Destination } from '../../types/destination';
import { Button } from '../ui/Button';
import { saveUserTrip } from '../../utils/storage';

interface CreateTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTripCreated: (newTrip: Trip) => void;
}

export const CreateTripModal: React.FC<CreateTripModalProps> = ({ isOpen, onClose, onTripCreated }) => {
  const [title, setTitle] = useState('');
  const [selectedDestId, setSelectedDestId] = useState('');
  const [customDestinationName, setCustomDestinationName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Trip name is required.';
    }

    const hasSelectedDest = selectedDestId.trim().length > 0;
    const hasCustomDest = customDestinationName.trim().length > 0;

    if (!hasSelectedDest && !hasCustomDest) {
      newErrors.destination = 'Destination is required.';
    }

    if (!startDate) {
      newErrors.startDate = 'Start date is required.';
    }

    if (!endDate) {
      newErrors.endDate = 'End date is required.';
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (end < start) {
        newErrors.endDate = 'End date cannot be before start date.';
      }
    }

    if (budget.trim() !== '') {
      const numBudget = Number(budget);
      if (isNaN(numBudget) || numBudget < 0) {
        newErrors.budget = 'Budget must be a valid positive number.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Resolve Destination object
    let destinationObj: Destination;
    const foundDest = MOCK_DESTINATIONS.find((d) => d.id === selectedDestId);

    if (foundDest) {
      destinationObj = foundDest;
    } else {
      const customName = customDestinationName.trim();
      destinationObj = {
        id: `custom-${Date.now()}`,
        title: customName,
        tagline: 'Custom travel adventure',
        description: `Custom trip to ${customName}`,
        location: { country: customName, region: 'Global' },
        heroImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
        galleryImages: [],
        highlights: [],
        bestTimeToVisit: 'Year-round',
        category: 'Adventure & Wildlife',
        rating: 4.9,
        reviewsCount: 12,
        priceLevel: '$$',
        avgCostPerDayUSD: 150,
        featured: false,
        trending: false,
        tags: ['custom'],
        activities: []
      };
    }

    // Compute number of days
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const numberOfDays = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1);

    // Create day slots
    const days: TripDay[] = Array.from({ length: numberOfDays }, (_, i) => {
      const dayDate = new Date(start);
      dayDate.setDate(start.getDate() + i);
      const dateStr = dayDate.toISOString().split('T')[0];
      return {
        dayNumber: i + 1,
        date: dateStr,
        title: `Day ${i + 1}`,
        activities: []
      };
    });

    const newTrip: Trip = {
      id: `trip-${Date.now()}`,
      destinationId: destinationObj.id,
      destination: destinationObj,
      title: title.trim(),
      startDate,
      endDate,
      numberOfDays,
      travelersCount: 1,
      budgetUSD: budget.trim() !== '' ? Number(budget) : 0,
      status: 'planned',
      days,
      createdAt: new Date().toISOString()
    };

    saveUserTrip(newTrip);
    onTripCreated(newTrip);
    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setSelectedDestId('');
    setCustomDestinationName('');
    setStartDate('');
    setEndDate('');
    setBudget('');
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl z-10 my-8">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white font-heading">Create New Trip</h2>
            <p className="text-xs text-slate-400">Plan your itinerary and track your upcoming vacation.</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Trip Name */}
          <div>
            <label htmlFor="trip-name" className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Trip Name <span className="text-emerald-400">*</span>
            </label>
            <input
              id="trip-name"
              type="text"
              placeholder="e.g. Summer Break in Santorini"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border ${
                errors.title ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-emerald-500 focus:ring-emerald-500/30'
              } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all`}
            />
            {errors.title && (
              <p className="flex items-center gap-1 text-xs text-rose-400 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          {/* Destination Selection */}
          <div>
            <label htmlFor="trip-destination" className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Destination <span className="text-emerald-400">*</span>
            </label>
            <select
              id="trip-destination"
              value={selectedDestId}
              onChange={(e) => {
                setSelectedDestId(e.target.value);
                if (e.target.value !== 'custom') {
                  setCustomDestinationName('');
                }
              }}
              className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border ${
                errors.destination ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'
              } text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all`}
            >
              <option value="">Select a featured destination...</option>
              {MOCK_DESTINATIONS.map((dest) => (
                <option key={dest.id} value={dest.id}>
                  {dest.title} ({dest.location.country})
                </option>
              ))}
              <option value="custom">Other / Custom Destination</option>
            </select>

            {/* Custom Destination Input */}
            {selectedDestId === 'custom' && (
              <div className="mt-2.5">
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Enter destination name (e.g. Reykjavik, Iceland)"
                    value={customDestinationName}
                    onChange={(e) => setCustomDestinationName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition-all"
                  />
                </div>
              </div>
            )}

            {errors.destination && (
              <p className="flex items-center gap-1 text-xs text-rose-400 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.destination}</span>
              </p>
            )}
          </div>

          {/* Dates Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Start Date */}
            <div>
              <label htmlFor="start-date" className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Start Date <span className="text-emerald-400">*</span>
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border ${
                    errors.startDate ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'
                  } text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all`}
                />
              </div>
              {errors.startDate && (
                <p className="flex items-center gap-1 text-xs text-rose-400 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.startDate}</span>
                </p>
              )}
            </div>

            {/* End Date */}
            <div>
              <label htmlFor="end-date" className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                End Date <span className="text-emerald-400">*</span>
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border ${
                    errors.endDate ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'
                  } text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all`}
                />
              </div>
              {errors.endDate && (
                <p className="flex items-center gap-1 text-xs text-rose-400 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.endDate}</span>
                </p>
              )}
            </div>
          </div>

          {/* Budget Field */}
          <div>
            <label htmlFor="trip-budget" className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Estimated Budget (USD) <span className="text-slate-500">(Optional)</span>
            </label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                id="trip-budget"
                type="number"
                min="0"
                step="10"
                placeholder="e.g. 1500"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border ${
                  errors.budget ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'
                } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all`}
              />
            </div>
            {errors.budget && (
              <p className="flex items-center gap-1 text-xs text-rose-400 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.budget}</span>
              </p>
            )}
          </div>

          {/* Modal Actions */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
            <Button type="button" variant="outline" size="md" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              Create Trip
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

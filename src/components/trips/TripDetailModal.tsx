import React, { useState } from 'react';
import { X, Calendar, MapPin, Plus, Trash2, Clock, CheckCircle2 } from 'lucide-react';
import { Trip, ItineraryActivity } from '../../types/trip';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatDateRange, formatCurrency } from '../../utils/formatters';
import { saveUserTrip } from '../../utils/storage';

interface TripDetailModalProps {
  trip: Trip | null;
  isOpen: boolean;
  onClose: () => void;
  onTripUpdated: (updatedTrip: Trip) => void;
}

export const TripDetailModal: React.FC<TripDetailModalProps> = ({
  trip,
  isOpen,
  onClose,
  onTripUpdated
}) => {
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);
  const [newActivityTitle, setNewActivityTitle] = useState('');
  const [newTimeSlot, setNewTimeSlot] = useState('Morning');
  const [newNotes, setNewNotes] = useState('');

  if (!isOpen || !trip) return null;

  const currentDays = trip.days || [];
  const activeDay = currentDays.find((d) => d.dayNumber === selectedDayNumber) || currentDays[0];

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivityTitle.trim() || !activeDay) return;

    const newActivity: ItineraryActivity = {
      id: `act-${Date.now()}`,
      timeSlot: newTimeSlot,
      title: newActivityTitle.trim(),
      notes: newNotes.trim() || undefined
    };

    const updatedDays = currentDays.map((day) => {
      if (day.dayNumber === activeDay.dayNumber) {
        return {
          ...day,
          activities: [...(day.activities || []), newActivity]
        };
      }
      return day;
    });

    const updatedTrip: Trip = {
      ...trip,
      days: updatedDays
    };

    saveUserTrip(updatedTrip);
    onTripUpdated(updatedTrip);
    setNewActivityTitle('');
    setNewNotes('');
  };

  const handleDeleteActivity = (dayNumber: number, activityId: string) => {
    const updatedDays = currentDays.map((day) => {
      if (day.dayNumber === dayNumber) {
        return {
          ...day,
          activities: (day.activities || []).filter((a) => a.id !== activityId)
        };
      }
      return day;
    });

    const updatedTrip: Trip = {
      ...trip,
      days: updatedDays
    };

    saveUserTrip(updatedTrip);
    onTripUpdated(updatedTrip);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl z-10 my-8 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors z-20"
          aria-label="Close detail modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start pb-6 border-b border-slate-800 shrink-0 pr-8">
          <div>
            <Badge variant="emerald" className="uppercase text-[10px] tracking-wider mb-2">
              {trip.status}
            </Badge>
            <h2 className="text-2xl font-bold text-white font-heading">{trip.title}</h2>
            <p className="text-xs text-slate-400 flex items-center gap-2 mt-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{trip.destination?.title}, {trip.destination?.location?.country}</span>
              <span>•</span>
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{formatDateRange(trip.startDate, trip.endDate)} ({trip.numberOfDays} Days)</span>
            </p>
          </div>
          {trip.budgetUSD && trip.budgetUSD > 0 ? (
            <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-right">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Est. Budget</div>
              <div className="text-base font-bold text-emerald-400 font-mono">{formatCurrency(trip.budgetUSD)}</div>
            </div>
          ) : null}
        </div>

        {/* Modal Content - Scrollable */}
        <div className="overflow-y-auto py-6 space-y-6 flex-1 pr-1">
          {/* Day Tabs */}
          {currentDays.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/80">
              {currentDays.map((day) => {
                const isActive = day.dayNumber === (activeDay?.dayNumber || 1);
                const actCount = day.activities?.length || 0;
                return (
                  <button
                    key={day.dayNumber}
                    onClick={() => setSelectedDayNumber(day.dayNumber)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    <span>Day {day.dayNumber}</span>
                    {actCount > 0 && (
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                        isActive ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {actCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Active Day Activities List */}
          {activeDay ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white font-heading">
                  Day {activeDay.dayNumber} Itinerary
                  {activeDay.date && <span className="text-xs font-normal text-slate-400 ml-2">({activeDay.date})</span>}
                </h3>
              </div>

              {/* Existing Activities */}
              {activeDay.activities && activeDay.activities.length > 0 ? (
                <div className="space-y-3">
                  {activeDay.activities.map((act) => (
                    <div
                      key={act.id}
                      className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start justify-between gap-3 group hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                              {act.timeSlot}
                            </span>
                            <h4 className="text-sm font-semibold text-white">{act.title}</h4>
                          </div>
                          {act.notes && (
                            <p className="text-xs text-slate-400 mt-1">{act.notes}</p>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteActivity(activeDay.dayNumber, act.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors opacity-80 group-hover:opacity-100"
                        title="Delete activity"
                        aria-label={`Delete activity ${act.title}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-slate-950/40 border border-dashed border-slate-800 text-center space-y-1">
                  <Clock className="w-6 h-6 text-slate-600 mx-auto mb-1" />
                  <p className="text-xs font-medium text-slate-400">No activities added for Day {activeDay.dayNumber} yet.</p>
                  <p className="text-[11px] text-slate-500">Use the form below to plan your day.</p>
                </div>
              )}

              {/* Add Activity Form */}
              <form onSubmit={handleAddActivity} className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3 mt-4">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5 text-emerald-400" />
                  Add Activity to Day {activeDay.dayNumber}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <select
                      value={newTimeSlot}
                      onChange={(e) => setNewTimeSlot(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Evening">Evening</option>
                      <option value="Night">Night</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      placeholder="Activity title (e.g. Visit Akrotiri Site)"
                      value={newActivityTitle}
                      onChange={(e) => setNewActivityTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Optional notes or tips..."
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500"
                  />
                  <Button type="submit" variant="primary" size="sm" disabled={!newActivityTitle.trim()}>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </Button>
                </div>
              </form>
            </div>
          ) : null}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end shrink-0">
          <Button variant="outline" size="md" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

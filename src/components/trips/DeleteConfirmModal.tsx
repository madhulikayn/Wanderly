import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Trip } from '../../types/trip';
import { Button } from '../ui/Button';

interface DeleteConfirmModalProps {
  trip: Trip | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (tripId: string) => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  trip,
  isOpen,
  onClose,
  onConfirm
}) => {
  if (!isOpen || !trip) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl z-10 my-8 space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close confirm dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-heading">Delete Trip</h3>
            <p className="text-xs text-slate-400">This action cannot be undone.</p>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Are you sure you want to delete <strong className="text-white font-bold">"{trip.title}"</strong>?
          All itinerary details and notes for this trip will be permanently removed.
        </p>

        <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <button
            onClick={() => onConfirm(trip.id)}
            className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20 active:scale-[0.98] transition-all duration-200"
          >
            Delete Trip
          </button>
        </div>
      </div>
    </div>
  );
};

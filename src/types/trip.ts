import { Destination } from './destination';

export interface ItineraryActivity {
  id: string;
  timeSlot: string; // e.g. "Morning", "Afternoon", "Evening"
  title: string;
  notes?: string;
  costUSD?: number;
}

export interface TripDay {
  dayNumber: number;
  date?: string;
  title: string;
  activities: ItineraryActivity[];
}

export interface Trip {
  id: string;
  destinationId: string;
  destination: Destination;
  title: string;
  startDate: string;
  endDate: string;
  numberOfDays: number;
  travelersCount: number;
  budgetUSD: number;
  status: 'planned' | 'ongoing' | 'completed';
  days: TripDay[];
  notes?: string;
  createdAt: string;
}

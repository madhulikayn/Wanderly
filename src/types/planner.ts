export interface PlanTripRequest {
  destination: string;
  days: number;
  travellers: number;
  budget: number;
  interests: string;
  travelStyle: string;
}

export interface TripItineraryDay {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  estimatedCost: number;
}

export interface TripItinerary {
  destination: string;
  summary: string;
  days: TripItineraryDay[];
  totalEstimatedCost: number;
  tips: string[];
}

export interface PlanTripApiResponse {
  success: boolean;
  data?: TripItinerary;
  error?: string;
}

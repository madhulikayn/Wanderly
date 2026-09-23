import { TripItinerary } from '../types/planner';
import { Trip, TripDay, ItineraryActivity } from '../types/trip';
import { saveUserTrip } from './storage';

/**
 * Converts a generated AI TripItinerary into a Wanderly Trip object
 * so it can be saved and viewed in My Trips.
 */
export function convertItineraryToTrip(itinerary: TripItinerary, travellersCount: number = 1): Trip {
  const tripId = `ai_trip_${Date.now()}`;
  const today = new Date().toISOString().split('T')[0];

  const days: TripDay[] = itinerary.days.map((day) => {
    const activities: ItineraryActivity[] = [];

    if (day.morning) {
      activities.push({
        id: `${tripId}_d${day.day}_m`,
        timeSlot: 'Morning',
        title: 'Morning Activity',
        notes: day.morning,
        costUSD: Math.round(day.estimatedCost * 0.3),
      });
    }

    if (day.afternoon) {
      activities.push({
        id: `${tripId}_d${day.day}_a`,
        timeSlot: 'Afternoon',
        title: 'Afternoon Activity',
        notes: day.afternoon,
        costUSD: Math.round(day.estimatedCost * 0.4),
      });
    }

    if (day.evening) {
      activities.push({
        id: `${tripId}_d${day.day}_e`,
        timeSlot: 'Evening',
        title: 'Evening Activity',
        notes: day.evening,
        costUSD: Math.round(day.estimatedCost * 0.3),
      });
    }

    return {
      dayNumber: day.day,
      title: day.title,
      activities,
    };
  });

  const destId = `dest_${itinerary.destination.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

  const trip: Trip = {
    id: tripId,
    destinationId: destId,
    destination: {
      id: destId,
      title: itinerary.destination,
      tagline: 'Custom AI Itinerary',
      description: itinerary.summary,
      location: {
        country: 'Travel Destination',
        region: 'AI Planner',
      },
      category: 'Cultural & Heritage',
      rating: 4.9,
      reviewsCount: 1,
      priceLevel: '$$',
      avgCostPerDayUSD: Math.round(itinerary.totalEstimatedCost / Math.max(1, itinerary.days.length)),
      bestTimeToVisit: 'Year-round',
      heroImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
      ],
      featured: false,
      trending: false,
      tags: ['AI Generated', 'Custom Itinerary'],
      highlights: itinerary.tips || ['Custom AI Planned Trip'],
      activities: [],
    },
    title: `${itinerary.days.length}-Day Trip to ${itinerary.destination}`,
    startDate: today,
    endDate: today,
    numberOfDays: itinerary.days.length,
    travelersCount: travellersCount,
    budgetUSD: itinerary.totalEstimatedCost,
    status: 'planned',
    days,
    notes: `AI Generated Summary:\n${itinerary.summary}\n\nKey Tips:\n${itinerary.tips.map((t) => `- ${t}`).join('\n')}`,
    createdAt: new Date().toISOString(),
  };

  return trip;
}

export function saveAiItineraryToMyTrips(itinerary: TripItinerary, travellersCount: number = 1): void {
  const trip = convertItineraryToTrip(itinerary, travellersCount);
  saveUserTrip(trip);
}

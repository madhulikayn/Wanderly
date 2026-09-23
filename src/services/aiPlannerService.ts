import { PlanTripRequest, PlanTripApiResponse } from '../types/planner';

export async function generateAiItinerary(request: PlanTripRequest): Promise<PlanTripApiResponse> {
  try {
    const response = await fetch('/api/plan-trip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      let errorMsg = "Sorry, we couldn't generate your itinerary right now. Please try again.";
      try {
        const errorJson = (await response.json()) as PlanTripApiResponse;
        if (errorJson && errorJson.error) {
          errorMsg = errorJson.error;
        }
      } catch {
        // Fallback to generic user-friendly error message if JSON parsing fails
      }

      return {
        success: false,
        error: errorMsg,
      };
    }

    const data = (await response.json()) as PlanTripApiResponse;
    if (!data.success || !data.data) {
      return {
        success: false,
        error: data.error || "Sorry, we couldn't generate your itinerary right now. Please try again.",
      };
    }

    return data;
  } catch (err) {
    console.error('Network or fetch error when generating itinerary:', err);
    return {
      success: false,
      error: "Network error: Unable to reach the itinerary generator service. Please check your connection and try again.",
    };
  }
}

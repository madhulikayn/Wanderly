import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';
import { PlanTripRequest } from '../src/types/planner.js';
import { parseAndValidateItinerary } from '../src/utils/aiPlannerValidator.js';

function isTransientError(error: unknown): boolean {
  if (!error) return false;

  const errObj = error as Record<string, unknown>;
  const status = typeof errObj.status === 'number' ? errObj.status : typeof errObj.statusCode === 'number' ? errObj.statusCode : 0;

  // Non-transient HTTP status codes
  if ([400, 401, 403, 404].includes(status)) {
    return false;
  }

  // Transient HTTP status codes
  if ([429, 500, 502, 503, 504].includes(status)) {
    return true;
  }

  const message = String(errObj.message || error).toLowerCase();

  if (
    message.includes('400') ||
    message.includes('401') ||
    message.includes('403') ||
    message.includes('404') ||
    message.includes('not_found') ||
    message.includes('invalid_argument') ||
    message.includes('permission_denied')
  ) {
    return false;
  }

  return (
    message.includes('503') ||
    message.includes('unavailable') ||
    message.includes('high demand') ||
    message.includes('resource_exhausted') ||
    message.includes('429') ||
    message.includes('rate limit') ||
    message.includes('500') ||
    message.includes('502') ||
    message.includes('504') ||
    message.includes('overloaded')
  );
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enforce POST method
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Please send a POST request.',
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY environment variable is not configured.');
    return res.status(500).json({
      success: false,
      error: "Sorry, we couldn't generate your itinerary right now. Please try again.",
    });
  }

  try {
    const body = req.body as Partial<PlanTripRequest> | undefined;

    if (!body || typeof body !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'Invalid request body.',
      });
    }

    const { destination, days, travellers, budget, interests, travelStyle } = body;

    // Server-side Input Validation
    if (!destination || typeof destination !== 'string' || !destination.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Destination is required.',
      });
    }

    if (typeof days !== 'number' || isNaN(days) || days <= 0 || !Number.isInteger(days)) {
      return res.status(400).json({
        success: false,
        error: 'Days must be a valid positive integer.',
      });
    }

    if (typeof travellers !== 'number' || isNaN(travellers) || travellers <= 0 || !Number.isInteger(travellers)) {
      return res.status(400).json({
        success: false,
        error: 'Travellers must be a valid positive integer.',
      });
    }

    if (typeof budget !== 'number' || isNaN(budget) || budget <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Budget must be a valid positive number.',
      });
    }

    if (!interests || typeof interests !== 'string' || !interests.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Interests are required.',
      });
    }

    const sanitizedTravelStyle = typeof travelStyle === 'string' && travelStyle.trim() ? travelStyle.trim() : 'Relaxed';

    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `You are an expert travel itinerary planning assistant for Wanderly, a modern travel discovery and planning web application.
Your goal is to generate practical, realistic, detailed day-by-day itineraries tailored to user preferences.

RULES AND CONSTRAINTS:
1. Destination: ${destination.trim()}
2. Duration: ${days} day(s)
3. Travellers: ${travellers} person(s)
4. Target Budget: ${budget}
5. Interests: ${interests.trim()}
6. Travel Style: ${sanitizedTravelStyle}

INSTRUCTIONS:
- Keep the overall estimated total cost reasonably close to or within the user's budget.
- Provide a day-by-day breakdown for all ${days} days. Each day must have specific, engaging morning, afternoon, and evening activities.
- Provide realistic price estimates (estimatedCost) for each day.
- Include 3-5 high-value, practical travel tips specifically for ${destination.trim()}.
- Do not invent nonexistent bookings or claim real-time availability. Make clear that recommendations and prices are estimates.
- Return structured JSON output according to the requested JSON schema.`;

    const userPrompt = `Generate a ${days}-day itinerary for ${travellers} traveller(s) visiting ${destination.trim()} with a budget of ${budget}. Interests: ${interests.trim()}. Style: ${sanitizedTravelStyle}.`;

    const itinerarySchema = {
      type: Type.OBJECT,
      properties: {
        destination: { type: Type.STRING },
        summary: { type: Type.STRING },
        days: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              day: { type: Type.INTEGER },
              title: { type: Type.STRING },
              morning: { type: Type.STRING },
              afternoon: { type: Type.STRING },
              evening: { type: Type.STRING },
              estimatedCost: { type: Type.NUMBER },
            },
            required: ['day', 'title', 'morning', 'afternoon', 'evening', 'estimatedCost'],
          },
        },
        totalEstimatedCost: { type: Type.NUMBER },
        tips: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
      required: ['destination', 'summary', 'days', 'totalEstimatedCost', 'tips'],
    };

    const primaryModel = 'gemini-3.6-flash';
    const fallbackModel = 'gemini-3.5-flash';

    let textContent: string | undefined;
    let bothModelsBusy = false;

    // Helper to generate content
    const generateWithModel = async (modelName: string): Promise<string | undefined> => {
      const resp = await ai.models.generateContent({
        model: modelName,
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
          responseSchema: itinerarySchema,
        },
      });
      return resp.text;
    };

    // Attempt Primary Model
    try {
      textContent = await generateWithModel(primaryModel);
    } catch (primaryError: unknown) {
      console.warn(`Primary Gemini model (${primaryModel}) failed:`, primaryError);

      if (isTransientError(primaryError)) {
        console.info(`Transient error detected. Attempting fallback model (${fallbackModel})...`);
        try {
          textContent = await generateWithModel(fallbackModel);
        } catch (fallbackError: unknown) {
          console.error(`Fallback Gemini model (${fallbackModel}) failed:`, fallbackError);
          if (isTransientError(fallbackError)) {
            bothModelsBusy = true;
          }
        }
      }
    }

    if (bothModelsBusy) {
      return res.status(503).json({
        success: false,
        error: 'The AI service is temporarily busy. Please try again in a moment.',
      });
    }

    if (!textContent) {
      console.error('No response text received from Gemini API models.');
      return res.status(502).json({
        success: false,
        error: "Sorry, we couldn't generate your itinerary right now. Please try again.",
      });
    }

    const itinerary = parseAndValidateItinerary(textContent);

    if (!itinerary) {
      console.error('AI response validation failed. Content received:', textContent);
      return res.status(502).json({
        success: false,
        error: "Sorry, we couldn't generate your itinerary right now. Please try again.",
      });
    }

    return res.status(200).json({
      success: true,
      data: itinerary,
    });
  } catch (error: unknown) {
    console.error('Unhandled server error in /api/plan-trip:', error);
    return res.status(500).json({
      success: false,
      error: "Sorry, we couldn't generate your itinerary right now. Please try again.",
    });
  }
}

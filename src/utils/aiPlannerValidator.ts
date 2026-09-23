import { TripItinerary, TripItineraryDay } from '../types/planner';

/**
 * Parses and strictly validates raw string text returned by Claude into a TripItinerary structure.
 * Returns null if validation fails.
 */
export function parseAndValidateItinerary(rawText: string): TripItinerary | null {
  if (!rawText || typeof rawText !== 'string') {
    return null;
  }

  try {
    // Strip potential markdown code blocks like ```json ... ```
    let cleanText = rawText.trim();
    if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
    }

    const obj: unknown = JSON.parse(cleanText);

    if (typeof obj !== 'object' || obj === null) {
      return null;
    }

    const record = obj as Record<string, unknown>;

    if (typeof record.destination !== 'string' || !record.destination.trim()) {
      return null;
    }

    if (typeof record.summary !== 'string' || !record.summary.trim()) {
      return null;
    }

    if (!Array.isArray(record.days) || record.days.length === 0) {
      return null;
    }

    const days: TripItineraryDay[] = [];
    for (let i = 0; i < record.days.length; i++) {
      const item: unknown = record.days[i];
      if (typeof item !== 'object' || item === null) {
        return null;
      }

      const dayObj = item as Record<string, unknown>;
      const dayNum = typeof dayObj.day === 'number' ? dayObj.day : i + 1;
      const title = typeof dayObj.title === 'string' ? dayObj.title : `Day ${dayNum}`;
      const morning = typeof dayObj.morning === 'string' ? dayObj.morning : '';
      const afternoon = typeof dayObj.afternoon === 'string' ? dayObj.afternoon : '';
      const evening = typeof dayObj.evening === 'string' ? dayObj.evening : '';
      const estimatedCost = typeof dayObj.estimatedCost === 'number' && dayObj.estimatedCost >= 0 ? dayObj.estimatedCost : 0;

      if (!morning && !afternoon && !evening) {
        return null;
      }

      days.push({
        day: dayNum,
        title,
        morning,
        afternoon,
        evening,
        estimatedCost,
      });
    }

    const totalEstimatedCost =
      typeof record.totalEstimatedCost === 'number' && record.totalEstimatedCost >= 0
        ? record.totalEstimatedCost
        : days.reduce((sum, d) => sum + d.estimatedCost, 0);

    const tips: string[] = [];
    if (Array.isArray(record.tips)) {
      for (const tip of record.tips) {
        if (typeof tip === 'string' && tip.trim()) {
          tips.push(tip.trim());
        }
      }
    }

    return {
      destination: record.destination.trim(),
      summary: record.summary.trim(),
      days,
      totalEstimatedCost,
      tips,
    };
  } catch (err) {
    console.error('JSON parsing or validation error:', err);
    return null;
  }
}

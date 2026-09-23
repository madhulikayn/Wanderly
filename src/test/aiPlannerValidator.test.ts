import { describe, it, expect } from 'vitest';
import { parseAndValidateItinerary } from '../utils/aiPlannerValidator';

describe('aiPlannerValidator - parseAndValidateItinerary', () => {
  it('should parse and validate a complete, valid JSON itinerary string', () => {
    const validJson = JSON.stringify({
      destination: 'Goa',
      summary: 'Relaxing 4-day beach getaway',
      days: [
        {
          day: 1,
          title: 'Arrival & Beach Walk',
          morning: 'Check into hotel and relax',
          afternoon: 'Visit Calangute beach',
          evening: 'Sunset dinner at a beach shack',
          estimatedCost: 3500,
        },
        {
          day: 2,
          title: 'Water Sports & Fort Exploration',
          morning: 'Explore Aguada Fort',
          afternoon: 'Try jet skiing and parasailing',
          evening: 'Explore Tito’s Lane night market',
          estimatedCost: 4500,
        },
      ],
      totalEstimatedCost: 8000,
      tips: ['Rent a scooter for cheap local travel', 'Carry sun protection'],
    });

    const result = parseAndValidateItinerary(validJson);

    expect(result).not.toBeNull();
    expect(result?.destination).toBe('Goa');
    expect(result?.summary).toBe('Relaxing 4-day beach getaway');
    expect(result?.days).toHaveLength(2);
    expect(result?.days[0].morning).toBe('Check into hotel and relax');
    expect(result?.totalEstimatedCost).toBe(8000);
    expect(result?.tips).toHaveLength(2);
  });

  it('should clean markdown ```json ``` wrappers before parsing', () => {
    const markdownWrappedJson = `\`\`\`json
{
  "destination": "Paris",
  "summary": "Romantic weekend in Paris",
  "days": [
    {
      "day": 1,
      "title": "Eiffel Tower & Seine Cruise",
      "morning": "Visit Eiffel Tower",
      "afternoon": "Louvre Museum tour",
      "evening": "Seine river cruise",
      "estimatedCost": 120
    }
  ],
  "totalEstimatedCost": 120,
  "tips": ["Book Louvre tickets in advance"]
}
\`\`\``;

    const result = parseAndValidateItinerary(markdownWrappedJson);

    expect(result).not.toBeNull();
    expect(result?.destination).toBe('Paris');
    expect(result?.days).toHaveLength(1);
  });

  it('should return null when input is empty or invalid JSON string', () => {
    expect(parseAndValidateItinerary('')).toBeNull();
    expect(parseAndValidateItinerary('Not JSON text')).toBeNull();
    expect(parseAndValidateItinerary('{ destination: "Incomplete" ')).toBeNull();
  });

  it('should return null when required fields are missing or invalid', () => {
    // Missing destination
    const missingDest = JSON.stringify({
      summary: 'Trip',
      days: [{ day: 1, title: 'Day 1', morning: 'a', afternoon: 'b', evening: 'c', estimatedCost: 10 }],
    });
    expect(parseAndValidateItinerary(missingDest)).toBeNull();

    // Empty days array
    const emptyDays = JSON.stringify({
      destination: 'Tokyo',
      summary: 'City trip',
      days: [],
    });
    expect(parseAndValidateItinerary(emptyDays)).toBeNull();

    // Day missing activities
    const missingActivities = JSON.stringify({
      destination: 'Rome',
      summary: 'Historic tour',
      days: [{ day: 1, title: 'Day 1', morning: '', afternoon: '', evening: '', estimatedCost: 50 }],
    });
    expect(parseAndValidateItinerary(missingActivities)).toBeNull();
  });
});

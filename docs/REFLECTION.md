# Wanderly Capstone Reflection

## What I Built

I built Wanderly, an AI-powered travel discovery and trip-planning application. It helps travelers move from browsing destinations to organizing a practical trip plan. Users can search, filter, sort, and inspect destinations, save favorites, manage trips, and use the AI Trip Planner to generate a structured day-by-day itinerary from a destination, duration, traveler count, budget, interests, and travel style.

## AI Engineering

Gemini is accessed through the server-side Vercel function at `/api/plan-trip`, so the API key is not exposed to the browser. The request includes the user's planning constraints, and Gemini is asked for JSON matching an itinerary schema with daily activities, estimated costs, a summary, and travel tips. The returned JSON is parsed and validated before it reaches the planner UI. AI is meaningful here because it converts individual preferences and constraints into an editable planning starting point rather than adding a decorative chat interface.

## What I Learned

I learned that integrating an AI API requires more than sending a prompt. The application needs server-side secret handling, input validation, structured output requirements, response validation, and useful behavior when the provider is unavailable. I also learned to manage related frontend state carefully across forms, loading and error states, generated results, saved trips, and localStorage persistence.

Accessibility work showed me that labels and ARIA attributes are only part of the solution. Keyboard behavior, visible focus, dialog focus trapping and restoration, validation associations, and live announcements all matter. Testing with Vitest and React Testing Library made the accessibility and itinerary validation behavior repeatable. Deploying to Vercel reinforced the need to verify both the local build and the production environment, especially for a server-side API route and its environment variable.

## Challenges and How I Handled Them

The main challenges were making AI output reliable, handling external service failures, and keeping the user experience understandable when generation cannot complete. I added a primary and fallback Gemini model for recognized transient failures, controlled error responses, and strict validation so malformed output is not rendered as a plan.

I also found accessibility issues during review, including missing control names, incomplete dialog behavior, and form errors that were not associated with their inputs. These were addressed with semantic labels, focus handling, appropriate ARIA state, and keyboard support. A mobile Lighthouse audit identified expensive image delivery and JavaScript work, so I added responsive hero image sizing, lazy loading for below-the-fold images, and asynchronous image decoding. Deployment and Lighthouse checks then provided evidence of how the application behaves outside the development environment.

## Quality and Production Readiness

The verified test result is 15 tests passing across 4 test files. TypeScript passes and the production build passes. An accessibility audit was performed. The latest deployed mobile Lighthouse results were:

- Performance: 53
- Accessibility: 98
- Best Practices: 100
- SEO: 100

The accessibility result is strong, but the Performance score of 53 is below the 85 target. Image delivery, render-blocking resources, and unused JavaScript remain areas for future work. I consider the project deployable with these limitations documented, not perfect or bug-free.

## What I Would Improve

I would continue optimizing image delivery and initial JavaScript work, add stronger automated accessibility and performance regression checks, move trips and saved destinations to persistent cloud storage, expand the destination data, and support more advanced AI personalization and itinerary editing.

## AI Assistance Reflection

I used AI coding tools incrementally for architecture, implementation, debugging, accessibility improvements, performance work, and documentation. I reviewed the generated changes, tested the behavior, manually checked important flows, and corrected issues such as saved-destination synchronization. AI accelerated implementation, but the final decisions depended on inspecting the code, running checks, and reviewing the deployed application.

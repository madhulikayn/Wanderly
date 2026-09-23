# Wanderly — AI-Powered Travel Discovery & Trip Planner

## Project Overview

Wanderly helps travelers move from destination inspiration to a practical trip plan in one place. Users can discover and compare destinations, view details, save favorites, create and manage trips, and generate a structured itinerary from their destination, dates, travelers, budget, interests, and travel style. The AI capability is meaningful because it turns those personal constraints into an actionable day-by-day starting point rather than providing only generic destination content.

## Live Demo

- Application: https://wanderly-blush.vercel.app
- GitHub repository: https://github.com/madhulikayn/Wanderly

## Key Features

- Destination discovery using curated mock destination data.
- Search by destination name, country, region, category, or tag.
- Category filtering and sorting by recommendation, rating, and daily cost.
- Destination detail pages with descriptions, highlights, activities, gallery images, ratings, and budget information.
- Save and remove destinations with bookmark controls.
- My Trips view for reviewing saved trip plans.
- Create, update, and delete trips.
- Trip and saved-destination persistence through browser `localStorage`.
- AI Trip Planner for personalized itinerary generation.
- Structured AI-generated itineraries with day-by-day activities, estimated costs, and travel tips.
- Client- and server-side validation, friendly error messages, and fallback handling for transient AI service failures.
- Responsive layouts for desktop, tablet, and mobile screens.
- Accessible labels, keyboard interactions, visible focus states, form validation associations, live announcements, and accessible dialogs.

## Tech Stack

| Technology | Use |
| --- | --- |
| React 19 | User interface and reusable components |
| TypeScript | Static typing and application models |
| Vite | Development server and production build |
| Tailwind CSS | Styling and responsive layouts |
| React Router | Client-side routing |
| Lucide React | Interface icons |
| Vitest | Test runner |
| React Testing Library | Component and interaction tests |
| `@google/genai` | Server-side Google Gemini API access |
| Vercel / `@vercel/node` | Production hosting and serverless API route |

## Getting Started

### Prerequisites

- Node.js and npm installed.
- A Google Gemini API key for the AI Trip Planner.

### Installation

```bash
git clone https://github.com/madhulikayn/Wanderly.git
cd Wanderly
npm install
```

Copy `.env.example` to `.env` or `.env.local` and add your Gemini key:

```bash
# Windows PowerShell
Copy-Item .env.example .env.local

# macOS/Linux
cp .env.example .env.local
```

Set the server-side variable in the copied file:

```env
GEMINI_API_KEY=your_key_here
```

`GEMINI_API_KEY` must remain server-side and must not use the `VITE_` prefix. Do not commit `.env` or `.env.local`, and do not put the key in client-side code.

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Run the TypeScript build and create the Vite production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Start Vitest in watch mode |
| `npm run test:run` | Run the test suite once |
| `npm run test:coverage` | Run Vitest with V8 coverage reporting |

## Architecture

Wanderly is a React single-page application with client-side routes and a Vercel serverless function for protected Gemini access.

```text
React UI
   ↓
Planner service
   ↓
/api/plan-trip
   ↓
Google Gemini
   ↓
Structured itinerary validation
   ↓
Wanderly planner UI
   ↓
Optional save to My Trips
```

Important responsibilities:

- `src/pages/` contains route-level views for Home, Explore, destination details, Saved, My Trips, and the AI Planner.
- `src/components/` contains shared layout, navigation, destination, home, trip, and UI components.
- `src/services/aiPlannerService.ts` sends planner requests from the browser to the serverless API route.
- `api/plan-trip.ts` validates requests, calls Gemini, applies the model fallback, and returns a controlled response.
- `src/utils/aiPlannerValidator.ts` parses and validates the returned itinerary structure.
- `src/utils/storage.ts` manages saved destinations and trips in `localStorage`.
- `src/data/` contains curated destination and initial trip data.
- `src/types/` contains TypeScript models for destinations, trips, filters, and planner requests/results.
- `src/router/` defines application routes.
- `playground/` contains reusable accessibility examples used by the accessibility tests.

## AI Integration

AI is used to personalize travel planning from user-specific constraints. The planner sends the destination, number of days, traveler count, budget, interests, and travel style to the server-side `/api/plan-trip` route.

The route sends these inputs to Google Gemini with instructions to produce a complete day-by-day itinerary. The requested response uses JSON MIME type and a schema containing the destination, summary, days, morning/afternoon/evening activities, estimated costs, total estimated cost, and travel tips.

The server parses the response and validates the required fields and activity content before returning it to the client. The planner UI renders only a successful validated result. Users can optionally save that result to My Trips, where it is persisted in browser storage.

This makes AI part of the core travel-planning workflow: it translates a traveler's constraints and preferences into a structured plan that can be reviewed, saved, and edited, while keeping estimates clearly labeled as estimates.

## AI Prompting Approach

The planner prompt constrains the model to the requested destination, duration, traveler count, budget, interests, and travel style. It asks for all requested days, practical morning/afternoon/evening activities, estimated costs, travel tips, and JSON matching the response schema. It also instructs the model not to invent bookings or claim real-time availability.

The prompt and planner background are documented in [AI_PROMPTS.md](AI_PROMPTS.md) and [docs/AI_TRIP_PLANNER.md](docs/AI_TRIP_PLANNER.md). The application validates the returned JSON and rejects responses that do not contain a usable destination, summary, non-empty days, or day activities.

Invalid, empty, unavailable, or unreachable responses become user-facing error states rather than being rendered as an itinerary.

## Resilience and Error Handling

- Primary Gemini model: `gemini-3.6-flash`.
- Fallback model: `gemini-3.5-flash`, used when the primary model reports a transient service error.
- Transient statuses handled for fallback include 429, 500, 502, 503, and 504, as well as recognized overload and availability messages.
- If both models are temporarily busy, the API returns a controlled 503 message asking the user to try again.
- Invalid requests are rejected with validation errors before model generation.
- Invalid model JSON receives a controlled error response after validation fails.
- The client handles HTTP, JSON parsing, and network failures with user-friendly messages.
- Raw API errors and the Gemini API key are not shown to users.
- Missing server configuration produces a generic generation error rather than exposing the secret configuration.

## Accessibility

Accessibility work was performed across the main user-facing flows and verified with an automated mobile Lighthouse audit plus focused component tests. The latest deployed mobile Lighthouse accessibility score was **98**; this is strong evidence for the audited deployment, but it is not a claim of full WCAG 2.1 AA compliance.

Implemented accessibility work includes:

- Semantic headings, landmarks, links, and buttons for primary interactions.
- Keyboard-accessible navigation, filters, buttons, tabs, and disclosure controls.
- Visible `:focus-visible` indicators and local focus states.
- Labeled dialogs with Escape handling, focus placement, focus trapping, and focus restoration where implemented.
- Form labels, `aria-invalid`, and `aria-describedby` associations for validation messages.
- Appropriate ARIA state and live-region attributes for selected controls, result counts, planner results, and errors.
- Responsive and mobile-friendly navigation and layouts.
- Accessible image alternative text for user-facing destination imagery.

## Testing

The project uses Vitest with JSDOM, React Testing Library, `@testing-library/user-event`, and `jest-dom` matchers.

The verified test result is **15 tests passed across 4 test files**. Covered areas include:

- AI itinerary parsing and validation, including invalid and markdown-wrapped responses.
- Accessible disclosure behavior and `aria-expanded`/`aria-controls` state.
- Accessible tabs, selection state, focus management, and keyboard navigation.
- Browser storage behavior for saved destinations and user trips.

No coverage percentage is claimed here because it is not part of the verified submission result.

## Performance / Lighthouse

The latest deployed **mobile** Lighthouse audit was run against https://wanderly-blush.vercel.app.

| Category or metric | Result |
| --- | ---: |
| Performance | 53 |
| Accessibility | 98 |
| Best Practices | 100 |
| SEO | 100 |
| Largest Contentful Paint (LCP) | 5.1 s |
| Total Blocking Time (TBT) | 530 ms |
| Cumulative Layout Shift (CLS) | 0 |

Performance improvements were made based on the audit, including responsive hero image sizing, lazy loading for below-the-fold images, asynchronous image decoding, and reduced initial image payload. The 85+ Performance target was not achieved. Further optimization remains possible, particularly around image delivery, render-blocking resources, and unused JavaScript.

## Deployment

Wanderly is deployed to Vercel:

https://wanderly-blush.vercel.app

The Vercel deployment includes the React application and the `api/plan-trip.ts` serverless function. `GEMINI_API_KEY` is configured as a server-side environment variable in the deployment environment and is not committed to Git.

## Security / Secrets

- `GEMINI_API_KEY` is stored in environment variables.
- `.env` and `.env.*` are ignored by Git; `.env.example` is intentionally tracked as a template.
- API keys must never be committed to the repository.
- Only the server-side `/api/plan-trip` route accesses the Gemini key.
- The browser calls the serverless route and does not receive the secret key.

## Project Structure

```text
Wanderly/
├── api/
│   └── plan-trip.ts
├── docs/
│   └── AI_TRIP_PLANNER.md
├── playground/
│   ├── AccessibleDisclosure.tsx
│   ├── AccessibleModal.tsx
│   └── AccessibleTabs.tsx
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── destination/
│   │   ├── home/
│   │   ├── trips/
│   │   └── ui/
│   ├── data/
│   ├── pages/
│   ├── router/
│   ├── services/
│   ├── test/
│   ├── types/
│   └── utils/
├── AI_ASSISTANCE.md
├── AI_PROMPTS.md
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── NOTES.md
```

## Limitations

- AI itinerary generation depends on the availability and behavior of the external Gemini service.
- Itinerary quality, estimated costs, and recommendations depend on model output and should be verified before booking.
- Saved destinations and trips use browser `localStorage`; they are not synchronized to a user account or cloud database.
- The application does not currently use authentication or a backend database for user data.
- The latest deployed mobile Lighthouse Performance score is 53, with remaining image, render-blocking, and JavaScript optimization opportunities.
- The destination catalog is based on curated mock data rather than a live travel inventory.

## Future Improvements

- Further image delivery and JavaScript performance optimization.
- Cloud-backed trips and saved destinations.
- Authentication and user accounts.
- Richer and more current destination data.
- More advanced itinerary personalization and editing.
- Expanded automated accessibility and performance regression testing.

## AI Disclosure

AI assistance was used during development for architecture, implementation, debugging, testing, accessibility work, and verification. The documented development process and manual review examples are available in [AI_ASSISTANCE.md](AI_ASSISTANCE.md).

## License

No `LICENSE` file is currently present in the repository.

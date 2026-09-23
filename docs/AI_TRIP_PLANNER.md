# Wanderly AI Trip Planner Documentation

## 1. Overview & Purpose
The AI Trip Planner in Wanderly solves a fundamental travel-planning challenge: turning generic trip ideas into structured, actionable, day-by-day itineraries tailored to budget, duration, group size, and personal interests.

## 2. Architecture & Communication Flow
Because Wanderly is a client-side React SPA deployed on Vercel, serverless architecture is used to ensure API security:
1. **Frontend Request**: The React frontend (`PlannerPage.tsx`) captures user input, performs client-side validation, and sends a `POST` request to `/api/plan-trip`.
2. **Serverless Endpoint**: Vercel routes `/api/plan-trip` to a Node.js Serverless Function (`api/plan-trip.ts`).
3. **Google Gemini API Call & Resiliency**: The serverless endpoint initializes `@google/genai` using the server-side `GEMINI_API_KEY`. It attempts generation with primary model `gemini-3.6-flash`. If a transient server error occurs (HTTP 503, 429, 500, 502, 504, or high demand spike), it automatically falls back to `gemini-3.5-flash` with the identical system prompt and JSON schema.
4. **Validation & Response**: The server validates the AI JSON output using strict TypeScript schema validation (`aiPlannerValidator.ts`). If valid, it returns `{ success: true, data: itinerary }`. If transient errors exhaust both models, a controlled 503 error is returned: `"The AI service is temporarily busy. Please try again in a moment."`

## 3. Secret Management
- **Environment Variable**: `GEMINI_API_KEY` is loaded exclusively on the server side.
- **Client Isolation**: The variable is **NOT** prefixed with `VITE_`, ensuring Vite never bundles or exposes the API key to client-side JS bundles.
- **Git Security**: `.env` and `.env.local` are explicitly ignored in `.gitignore`. A sample template is provided in `.env.example`.

## 4. Disclaimers & User Verification
All AI-generated itineraries, activities, pricing estimates, and recommendations are generated algorithmically to assist in trip planning. Users are advised to verify operational hours, real-time ticket availability, and current prices before making travel arrangements or payments.

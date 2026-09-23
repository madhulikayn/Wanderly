# Wanderly Production Deployment Checklist

This checklist documents the deployment and operating procedure for the Wanderly Vercel application.

## Pre-Deployment Checklist

- [ ] Run `npx tsc --noEmit` successfully.
- [ ] Run `npm run build` successfully.
- [ ] Run `npm run test:run` and confirm the expected tests pass.
- [ ] Configure `GEMINI_API_KEY` in the target Vercel environment.
- [ ] Confirm no API keys or `.env` files are staged for Git.
- [ ] Confirm `.env` and `.env.*` are ignored by Git.
- [ ] Confirm the Vercel project is linked to the Wanderly repository/project.
- [ ] Manually verify Home, Explore, destination details, Saved, My Trips, and AI Trip Planner.
- [ ] Check mobile navigation and responsive layouts before release.
- [ ] Confirm the production build contains `api/plan-trip.ts` as the serverless API route.

## Environment Variables

Wanderly uses one application secret:

| Variable | Location | Purpose |
| --- | --- | --- |
| `GEMINI_API_KEY` | Server-side only | Authenticates the Vercel function's Google Gemini requests |

Requirements:

- The variable must be named exactly `GEMINI_API_KEY`.
- It must not use the `VITE_` prefix; Vite-prefixed variables can be exposed to browser code.
- Never commit the value to Git or place it in client-side source code.
- Configure the production value through Vercel environment variables.
- Use `.env.example` as the local configuration template. The real `.env` and `.env.local` files are ignored by Git.

## Production Validation

The current verified production checks are:

- `npx tsc --noEmit`: passing.
- `npm run build`: passing.
- Tests: **15 passing across 4 test files**.
- Production URL: https://wanderly-blush.vercel.app
- Vercel production deployment status: deployed and ready.

## Accessibility / Performance Evidence

The latest verified **mobile Lighthouse audit** was run against https://wanderly-blush.vercel.app:

| Category or metric | Result |
| --- | ---: |
| Performance | 53 |
| Accessibility | 98 |
| Best Practices | 100 |
| SEO | 100 |
| LCP | 5.1 s |
| TBT | 530 ms |
| CLS | 0 |

Accessibility remains strong, but the Performance score is below the 85 target. Further work is possible around image delivery, render-blocking resources, and unused JavaScript.

## Safe Failure / Error Handling

The AI planner fails in controlled ways:

- The primary Gemini model is `gemini-3.6-flash`.
- For recognized transient failures such as 429, 500, 502, 503, 504, overload, or unavailable responses, the route tries the fallback model `gemini-3.5-flash`.
- If both models are temporarily busy, the API returns a controlled 503 response asking the user to try again later.
- Invalid request fields are rejected before calling Gemini.
- Gemini output is parsed and validated by `src/utils/aiPlannerValidator.ts`. Invalid or unusable JSON is not rendered as an itinerary.
- The client displays user-friendly planner errors for HTTP failures, invalid responses, and network failures.
- Raw provider errors, secret values, and the API key are not shown to users.
- Missing server configuration produces a generic generation error.

## Rollback Plan

1. Identify the problematic Vercel production deployment in the Vercel project dashboard or with `npx vercel inspect <deployment-url>`.
2. Determine whether the issue is code, environment configuration, or an external Gemini failure.
3. If the issue is in code, revert the responsible Git commit or check out the last known-good commit locally.
4. Run the TypeScript check, production build, and tests on the rollback revision.
5. Deploy the known-good revision with `npx vercel --prod` from the linked Wanderly project.
6. Confirm the deployment is ready and the alias still resolves to https://wanderly-blush.vercel.app.
7. Run the smoke tests below, including navigation, Saved, My Trips, and AI Planner success/error behavior.
8. Record the incident, affected deployment, rollback revision, and follow-up action.

Do not delete the last known-good deployment before the replacement has been verified.

## Monitoring Plan

This is a small Vercel deployment and does not currently include a separate monitoring or analytics platform. Operations should use:

- Vercel deployment and build logs for failed builds, runtime errors, and deployment status.
- Vercel serverless function logs for `/api/plan-trip` failures and unexpected responses.
- Gemini response failures, transient availability errors, fallback activity, and validation failures in the server logs.
- User-facing planner error states as a signal that the AI service or configuration needs investigation.
- A mobile Lighthouse run after significant frontend, image, routing, or dependency changes.
- Manual smoke tests after every production deployment.

Do not treat the absence of reported errors as a guarantee of availability or zero bugs.

## Post-Deployment Smoke Test

After deployment, manually verify:

- [ ] Home loads without a console-breaking error.
- [ ] Explore opens; search, category filters, and sorting work.
- [ ] Destination cards open destination detail pages.
- [ ] Save and unsave destination behavior works and persists after refresh.
- [ ] My Trips loads correctly.
- [ ] Creating and deleting a trip works.
- [ ] AI Trip Planner opens and accepts form input.
- [ ] A successful AI response renders a structured itinerary and can be saved to My Trips.
- [ ] Invalid input and AI/network failure states show user-friendly errors.
- [ ] Mobile navigation opens, closes, and remains keyboard accessible.
- [ ] No console-breaking errors appear during the checked flows.

## Incident Response

### Deployment fails

Check the Vercel build logs first. Reproduce the failure locally with `npx tsc --noEmit` and `npm run build`, fix only the responsible issue, and deploy again after validation. If the failure is not immediately safe to fix, keep the last known-good deployment active.

### AI Planner stops working

Check the Vercel function logs, confirm `GEMINI_API_KEY` exists in the production environment without exposing its value, and determine whether the failure is configuration, validation, or Gemini availability. For transient provider failures, the implemented fallback and user-facing retry message apply. Do not expose provider responses or secrets in an error message.

### Frontend regression is discovered

Stop further rollout, identify the responsible commit or deployment, and follow the rollback procedure. Verify the live alias and run the smoke tests before considering the incident closed.

### Environment configuration is incorrect

Correct the Vercel environment variable configuration, redeploy the affected environment, and test the AI Planner error and success paths. Never add the key to source files, `VITE_` variables, or committed `.env` files.

## Current Status

- Deployment: **deployed**
- Production URL: https://wanderly-blush.vercel.app
- TypeScript: **passing**
- Production build: **passing**
- Tests: **15 passing across 4 files**
- Lighthouse audit: **completed for mobile**
- Mobile Lighthouse Performance: **53**, below the 85 target
- Remaining performance work: **optional/future optimization** focused on image delivery, render-blocking resources, and unused JavaScript

## References

- [Project README](../README.md)
- [AI Trip Planner documentation](./AI_TRIP_PLANNER.md)
- [AI assistance and development process](../AI_ASSISTANCE.md)
- [AI prompting notes](../AI_PROMPTS.md)

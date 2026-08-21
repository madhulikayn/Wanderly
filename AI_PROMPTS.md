# Wanderly — AI Development Prompts

Wanderly was developed as a frontend-only React travel discovery and trip-planning application using AI as a development assistant.

The application was built incrementally through multiple prompts. After each major implementation, the generated code was manually reviewed and tested.

---

## 1. Prompt — Project Foundation

### Purpose

Set up the initial Wanderly project architecture, development environment, reusable components, routing, TypeScript models, mock data, and styling foundation.

### Prompt

Create the foundation for a new React travel discovery application called "Wanderly".

Purpose:
Wanderly will be a premium travel discovery and simple trip-planning frontend where users can explore destinations, view destination details, save destinations, and create simple travel plans.

Tech requirements:
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React icons
- No backend
- No Firebase
- No authentication
- No external API yet
- Use local/mock data for now

Before writing code:
1. Inspect the empty project directory.
2. Create a short implementation plan.
3. Set up the project foundation based on the requirements.
4. Do not build the complete application yet.

Architecture requirements:
- Keep components reusable.
- Separate pages, components, data, and utilities logically.
- Use TypeScript types for destination and trip data.
- Keep mock data separate from UI components.
- Use React Router for page navigation.
- Use localStorage later for saved destinations and trip data.
- Avoid unnecessary dependencies.

Initial routes should be planned for:
- /
- /explore
- /destination/:id
- /saved
- /trips

Design direction:
Wanderly should feel like a premium modern travel product rather than a generic student dashboard.

Use:
- strong visual hierarchy
- generous whitespace
- elegant typography
- large destination imagery
- refined cards
- subtle rounded corners
- tasteful animations
- responsive layouts
- accessible color contrast
- mobile-first responsive behavior

Do not build the pages yet. Only create the project foundation, architecture, base styling setup, and routing structure.

After implementation:
- Explain what files were created.
- Explain the architecture.
- Run the project/build command to verify the setup works.
- Report any errors instead of assuming the setup is correct.

### Verification

The foundation was manually tested by running:

- `npm run dev`
- `npx tsc --noEmit`
- `npm run build`

The main routes were also manually opened and checked.

---

## 2. Prompt — Home Page

### Purpose

Build the main Wanderly landing page with a premium travel-focused visual design.

### Prompt

Build the Wanderly Home page now.

Before coding:
1. Inspect the existing project structure and reusable components.
2. Review the Destination TypeScript model and mock destination data.
3. Create a short implementation plan.
4. Reuse existing components where appropriate instead of duplicating code.

The Home page should feel like a premium modern travel discovery website, not a generic AI-generated dashboard.

Design the page with these sections:

1. Hero section
- Large cinematic travel destination background/image
- Strong headline such as "Find places worth getting lost in."
- Short supporting text
- Prominent destination search bar
- Search icon and clear interaction states
- Primary CTA to explore destinations
- Subtle visual overlay so text remains readable
- Responsive behavior for mobile

2. Trending destinations
- Section heading and short description
- 4 visually rich destination cards using the existing mock data
- Destination image
- Location
- Rating
- Starting price/budget indicator
- Travel style/category tags
- Favorite/save button
- Elegant hover interaction

3. Explore by travel style
Create visually distinct categories such as:
- Adventure
- Beach
- Nature
- Culture
- Luxury
- Food

Each category should have an attractive visual treatment and be clickable.

4. Inspiration section
Create a visually interesting editorial-style section encouraging users to discover their next destination.

5. Footer
Reuse the existing Footer component rather than creating another footer.

UX requirements:
- Strong visual hierarchy
- Consistent spacing
- Responsive design
- Keyboard-accessible interactive elements
- Accessible text contrast
- Clear hover and focus states
- Avoid excessive glassmorphism
- Avoid unnecessary animations
- Use subtle, purposeful transitions only
- Do not overcrowd the page

Technical requirements:
- Use TypeScript.
- Reuse existing Button, Card, Badge, Navbar and other shared components where appropriate.
- Keep destination data in the existing data layer.
- Do not hardcode large datasets directly inside HomePage.tsx.
- Keep the Home page component reasonably modular; extract reusable sections/components if they become large.
- Use Lucide icons where icons are needed.
- Do not add Firebase, authentication, backend services, or external APIs.

After implementation:
1. Run `npx tsc --noEmit`.
2. Run `npm run build`.
3. Fix any errors.
4. Start the development server.
5. Verify the Home page at `/`.
6. Report what was implemented and any issues found.

---

## 3. Prompt — Explore Page

### Purpose

Build the destination discovery page with search, filtering, sorting, destination cards, and empty states.

### Prompt

Now implement the Explore page for Wanderly.

Build a polished, premium travel discovery experience that matches the existing Wanderly visual language and design system. Do not redesign the existing Navbar, Footer, or Home page.

Requirements:

1. Create a complete Explore page at /explore using the existing destination mock data and TypeScript types.

2. Add a prominent page header:
   - Small label such as "DISCOVER YOUR NEXT ESCAPE"
   - Large heading: "Explore destinations"
   - Short supporting description
   - Modern, spacious layout consistent with the Home page.

3. Add a search bar that allows users to search destinations by:
   - destination name
   - country
   - tags
   Search should update the displayed results as the user types.

4. Add category/filter controls:
   - All
   - Beach & Coast
   - Cultural & Heritage
   - Mountain & Hiking
   - Luxury Retreat
   - Nature

5. Add sorting options:
   - Recommended
   - Highest Rated
   - Lowest Daily Cost
   - Highest Daily Cost

6. Display destinations in a responsive card grid using reusable UI components.

Each card should include:
   - destination image
   - category badge
   - destination name
   - country/location
   - rating and review count
   - short description
   - tags
   - average daily cost
   - Save/bookmark button
   - "Explore" action that navigates to /destination/:id

7. Make the Save/bookmark button visually interactive and use localStorage for persistence.

8. Add a result count.

9. Add a beautiful empty state when no destinations match the search/filter, including a reset button.

10. Make the page responsive:
   - desktop: multi-column grid
   - tablet: fewer columns
   - mobile: single-column layout

11. Add tasteful hover effects and subtle animations.

12. Maintain the existing Wanderly design:
   - premium dark travel aesthetic
   - teal/cyan accent
   - rounded cards
   - subtle borders/glows
   - strong typography
   - high-quality spacing

13. Do not introduce Firebase, external APIs, authentication, or backend functionality.

After implementation:
- Run `npx tsc --noEmit`
- Run `npm run build`
- Fix any errors.
- Verify that /explore works and that search, filters, sorting, navigation, and empty state behave correctly.

Do not modify unrelated pages unless necessary for Explore navigation.

### Verification

The Explore page was manually tested for:

- Search
- Category filtering
- Sorting
- Destination navigation
- Bookmark interaction
- Empty state
- Responsive layout

---

## 4. Prompt — Saved Destinations Bug Fix

### Purpose

During manual testing, a synchronization issue was discovered between the bookmark interaction and the Saved page.

### Prompt

I manually tested the Explore page and found a bug:

When I click the bookmark/save button on a destination, the destination appears to be saved on the Explore page, but it does NOT appear on the Saved page.

Please debug the existing implementation.

Requirements:
1. Inspect the existing localStorage utility, ExplorePage, DestinationCard, and SavedPage.
2. Find why the saved destination ID is not being correctly shared/read between Explore and Saved.
3. Fix the root cause rather than adding a temporary workaround.
4. Keep the existing Wanderly UI/design unchanged.
5. Make sure saving a destination:
   - adds its ID to localStorage
   - updates the bookmark UI immediately
   - makes the destination appear on /saved
6. Make sure clicking the bookmark again removes it from localStorage and removes it from /saved.
7. Make sure saved state remains after refreshing the browser.
8. Avoid introducing Firebase or any backend; continue using localStorage.
9. Do not modify unrelated functionality.

After fixing:
- Run `npx tsc --noEmit`
- Run `npm run build`
- Manually verify the complete save → Saved → unsave flow.
- Tell me exactly what caused the bug and which files you changed.

### Result

The synchronization issue was fixed.

The complete flow was manually tested:

Explore → Save → Saved → Refresh → Unsave → Saved

The saved state also persisted correctly after refreshing the browser.

---

## 5. Prompt — Destination Details Page

### Purpose

Create a detailed destination view connected to the existing destination data and saving functionality.

### Prompt

Implement the Destination Details page for Wanderly at /destination/:id.

Use the existing TypeScript types, mock destination data, reusable UI components, Navbar, Footer, Badge, Button, Card, and existing styling system. Do not introduce Firebase, APIs, authentication, or any backend.

Requirements:

1. Create a premium destination detail experience with:
   - Large immersive destination image/hero section
   - Destination name and country/location
   - Category badge
   - Rating and review count
   - Short destination description
   - Tags
   - Average daily cost
   - Save/bookmark button

2. Add an overview section containing:
   - Why visit
   - Destination highlights
   - Best experiences/activities
   - Travel information where available in the existing mock data

3. Add an Activities/Experiences section using the existing Activity data.

4. Add a prominent "Plan a Trip" CTA that navigates to /trips.

5. The Save button must use the existing localStorage utilities so that:
   - Saving from the detail page updates Saved destinations.
   - Un-saving removes it from Saved.
   - The saved state remains after refreshing the browser.

6. Add a Back to Explore action that navigates to /explore.

7. Handle an invalid destination ID gracefully using the existing NotFoundPage or an appropriate "Destination not found" state.

8. Make the page fully responsive for desktop, tablet, and mobile.

9. Keep the existing Wanderly visual identity:
   - Premium dark travel aesthetic
   - Rounded cards
   - Teal/cyan accents
   - Strong typography
   - Subtle hover and transition animations
   - High-quality spacing and visual hierarchy

10. Do not modify unrelated pages unless necessary for integration.

After implementation:
- Run `npx tsc --noEmit`
- Run `npm run build`
- Report any errors and fix them before finishing.
- Briefly explain which files were created or modified and how the page works.

### Verification

The Destination Details page was manually tested for:

- Destination navigation
- Destination information
- Save/unsave functionality
- Saved page synchronization
- Browser refresh persistence
- Plan a Trip navigation
- Back to Explore navigation
- Invalid destination handling
- Responsive layout

---

## 6. Prompt — Saved Destinations Page

### Purpose

Build the complete Saved Destinations collection using the existing localStorage functionality.

### Prompt

Now implement and polish the Saved Destinations page at /saved.

First inspect the existing implementation and the localStorage saving functionality used by ExplorePage and DestinationDetailPage.

Requirements:

1. Display all destinations currently saved by the user using the existing localStorage data.

2. Reuse the existing DestinationCard and UI components where appropriate.

3. Add a polished page header:
   - Small label: "YOUR COLLECTION"
   - Main heading: "Saved destinations"
   - Short supporting text.

4. Display the number of saved destinations.

5. Each saved destination should show:
   - Image
   - Destination name
   - Location
   - Rating
   - Category
   - Daily cost
   - Save/remove button
   - Explore button linking to /destination/:id

6. The remove button must:
   - Remove the destination from localStorage
   - Immediately update the Saved page
   - Update correctly after browser refresh

7. Add a beautiful empty state when there are no saved destinations.
   Include:
   - Travel-themed visual/icon
   - Friendly message
   - "Explore destinations" CTA linking to /explore

8. Make the layout responsive:
   - Desktop multi-column grid
   - Tablet layout
   - Mobile single-column layout

9. Maintain the existing Wanderly visual language:
   - Premium dark travel aesthetic
   - Consistent typography
   - Rounded cards
   - Subtle borders/glows
   - Consistent spacing
   - Tasteful hover transitions
   - Do not introduce excessive animations or glassmorphism.

10. Do not introduce Firebase, authentication, backend services, or external APIs.

11. Do not modify unrelated pages unless necessary.

After implementation:
- Run `npx tsc --noEmit`
- Run `npm run build`
- Fix any errors.
- Manually verify saving a destination from Explore, viewing it on Saved, removing it, and refreshing the browser.
- Briefly report what was implemented and any issues found.

---

## 7. Prompt — My Trips / Trip Planner

### Purpose

Implement the final major application feature: a simple frontend-only trip planner with localStorage persistence.

### Prompt

Now implement the My Trips / Trip Planner feature at /trips.

First inspect the existing Trip TypeScript models, mock trip data, localStorage utilities, routing, and reusable UI components.

The goal is a simple but polished frontend-only trip planner. Do not introduce Firebase, authentication, backend services, or external APIs.

Requirements:

1. Create a polished "My Trips" page with:
   - Small label: "YOUR JOURNEYS"
   - Main heading: "Plan your next adventure"
   - Short supporting description
   - Prominent "Create New Trip" button

2. Display existing trips from the existing mock data/localStorage.

Each trip card should show:
   - Trip name
   - Destination
   - Start and end dates
   - Number of days
   - Number of planned activities
   - Estimated budget if available
   - Destination image
   - View/Edit action
   - Delete action

3. Create a trip form/modal when the user clicks "Create New Trip".

Fields:
   - Trip name
   - Destination
   - Start date
   - End date
   - Optional budget

Validation:
   - Trip name is required.
   - Destination is required.
   - Start date is required.
   - End date is required.
   - End date cannot be before start date.
   - Budget, if entered, must be a valid positive number.

4. When a trip is created:
   - Add it to the trips list.
   - Persist it using localStorage.
   - Immediately display it without requiring a refresh.

5. Add the ability to delete a trip.
   - Ask for confirmation before deleting.
   - Remove it from localStorage.
   - Immediately update the UI.

6. Add an empty state when there are no trips:
   - Travel-themed visual/icon
   - Friendly message
   - "Create your first trip" CTA

7. If practical with the existing Trip model, allow a trip to contain itinerary activities.
   Keep this simple. Do not build an overly complicated calendar or drag-and-drop system.

8. Make the page fully responsive:
   - Desktop
   - Tablet
   - Mobile

9. Maintain Wanderly's existing design:
   - Premium dark travel aesthetic
   - Teal/cyan accent
   - Elegant typography
   - Rounded cards
   - Subtle borders/glows
   - Consistent spacing
   - Tasteful transitions
   - Accessible form controls
   - Clear validation messages

10. Reuse existing components and utilities wherever possible.
Do not duplicate the localStorage logic if an existing utility can be extended.

11. Do not break existing functionality:
   - Home
   - Explore
   - Destination Details
   - Saved Destinations

Before coding:
- Inspect the existing project and Trip types.
- Create a short implementation plan.
- Reuse the existing architecture.

After implementation:
1. Run `npx tsc --noEmit`.
2. Run `npm run build`.
3. Fix any errors.
4. Manually verify:
   - Create a trip
   - Refresh and confirm it persists
   - Delete a trip
   - Confirm it disappears
   - Test invalid form inputs
   - Test the empty state
   - Verify existing pages still work.

Finally, briefly explain what was implemented and any issues you found.

---

# Manual Improvements and AI Mistakes Caught

## Saved Destination Synchronization Bug

During manual testing of the Explore page, I discovered that clicking the bookmark button changed the visual state, but the destination did not appear on the Saved page.

Expected behavior:

- Clicking the bookmark should save the destination.
- The destination should appear on the Saved page.
- The saved state should persist after refreshing the browser.
- Clicking the bookmark again should remove the destination.

Actual behavior:

The bookmark appeared to work visually on the Explore page, but the destination was not appearing correctly on the Saved page.

I reported the issue to the AI development assistant and asked it to inspect the existing localStorage implementation and the interaction between ExplorePage, DestinationCard, and SavedPage.

The implementation was corrected so that the saved destination state was correctly synchronized.

I then manually verified:

1. A destination could be saved from Explore.
2. The destination appeared on Saved.
3. The saved state remained after refreshing the browser.
4. The destination could be removed.
5. The destination disappeared from Saved after removal.

This was an example of reviewing AI-generated code rather than accepting the generated implementation without verification.

---

# Development Approach

Wanderly was developed incrementally with AI assistance.

The general workflow was:

1. Define the requirements for a small feature.
2. Ask the AI assistant to inspect the existing project.
3. Ask it to create an implementation plan.
4. Implement the feature.
5. Run TypeScript checks and production builds.
6. Manually test the feature in the browser.
7. Identify bugs or improvements.
8. Ask the AI assistant to debug or refine the implementation.
9. Re-test the corrected implementation.
10. Move to the next feature.

This approach helped keep the project modular and made it possible to catch issues before moving to later features.

---

# Verification

The application was repeatedly verified during development using:

```bash
npm run dev
npx tsc --noEmit
npm run build
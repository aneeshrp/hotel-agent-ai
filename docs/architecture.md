# Architecture

## Booking flow

1. **Request**: the user submits a free-text request through the React page (`apps/web`).
2. **Parse**: the agent in `apps/api` turns it into structured search criteria (city, dates, guests, budget, preferences).
3. **Search and rank**: the agent calls hotel search tools exposed by `packages/mcp-hotel` and ranks the offers.
4. **Call**: the agent phones the chosen hotel to negotiate or book. In development, `packages/simulator` plays the hotel.
5. **Receipt**: the hotel emails a receipt; the agent reads it and extracts the booking details.
6. **Verify**: the agent checks the receipt against what was agreed, saves the booking and tells the user.

## Conventions

- Internal packages export TypeScript source (`"exports": "./src/index.ts"`), so Vite, Vitest and `tsx` use them without a build step. Add a compiled build when a package needs to run under plain Node in production.
- Tests sit next to the code as `*.test.ts(x)`. The root `vitest.config.ts` runs every workspace as a Vitest project.
- Evals that call a real LLM should get a separate script (for example `npm run evals`) so `npm test` stays fast and offline.

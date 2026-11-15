# Architecture

## Booking flow

1. **Request**: the user submits a free-text request through the React page (`apps/web`).
2. **Parse**: the agent in `apps/api` turns it into structured search criteria (city, dates, guests, budget, preferences).
3. **Search and rank**: the agent calls hotel search functions from `packages/mcp-hotel` and ranks the offers.
4. **Call**: the agent phones the chosen hotel to negotiate or book. Calls only ever go to `packages/simulator`, which plays the hotel.
5. **Receipt**: the hotel emails a receipt (via Mailpit); the agent reads it and extracts the booking details.
6. **Verify**: the agent checks the receipt against what was agreed, saves the booking and tells the user.

## Packages

- **apps/api**: `createApp()` in `src/app.ts` builds the Express app and is tested with supertest without listening; `src/server.ts` only calls `listen`. The agent loop will live in `src/agent` (hand-written, model name from config). SQLite database at `data/dev.db` (gitignored), schema changes as numbered SQL files in `migrations/`.
- **apps/web**: React page. In dev, Vite proxies `/api/*` to the API with the prefix stripped.
- **packages/mcp-hotel**: a plain library for now, imported directly by the API. Holds the shared types (`HotelSearchCriteria`, `HotelOffer`), `searchHotels` (placeholder returning `[]`) and `rankOffers`. It becomes a real MCP server later.
- **packages/simulator**: the fake hotel side, e.g. `renderReceiptEmail`. The receptionist bot is still to come.
- **evals**: a small `runEvals` harness that compares output with the expected value as JSON. Whether to adopt promptfoo will be recorded in `docs/decisions.md`.

## Conventions

- Internal packages export TypeScript source (`"exports": "./src/index.ts"`), so Vite, Vitest and `tsx` use them without a build step. Add a compiled build when a package needs to run under plain Node in production.
- Tests sit next to the code as `*.test.ts(x)`. The root `vitest.config.ts` runs every workspace as a Vitest project; each workspace has its own `vitest.config.ts`.
- Evals that call a real LLM should get a separate script (for example `npm run evals`) so `npm test` stays fast and offline.

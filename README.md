# hotel-agent-ai

AI based best price fetching application.

## The project: what I am building

The agent takes a request such as "a double room in City X for 12–14 March, under £150 a night, near the station", finds the best deal, phones the hotel to book it, and confirms the booking from the emailed receipt.
The flow, step by step

1.  The user submits a request through a small React page.
2.  The agent turns it into structured search criteria (city, dates, guests, budget, preferences).
3.  It searches hotels through a hotel-search tool and ranks the offers.
4.  It places a phone call to the chosen hotel and negotiates or books the room.
5.  The hotel sends an email receipt; the agent reads it and extracts booking details.
6.  The agent checks the receipt matches what was agreed, saves the booking and tells the user.

## Getting started

Needs Node 24 and Docker with Compose v2.

1. `npm install`
2. `cp .env.example .env` and fill in the values.
3. `npm run dev:services` starts Mailpit, a local mail catcher. Its inbox is at
   http://localhost:8025.
4. `npm run dev:api` and `npm run dev:web` start the API and the web page.

Stop services with `npm run dev:services:stop`.

Commands and working rules: see [CLAUDE.md](CLAUDE.md). Architecture: [docs/architecture.md](docs/architecture.md).

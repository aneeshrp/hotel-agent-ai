# KAN-4: Hotel type and zod schema

## Goal

Define a single `Hotel` shape for the project: a zod schema that validates hotel data from
outside the code (seed files, the database, search providers) and a TypeScript type derived
from it, so the two never drift apart.

## Scope

- Add `HotelSchema` and `type Hotel = z.infer<typeof HotelSchema>` in
  `packages/mcp-hotel/src/hotel.ts`, exported from `packages/mcp-hotel/src/index.ts`
  (shared types already live in this package).
- Add `zod` as a dependency of `packages/mcp-hotel` (pre-approved; same version range as
  `apps/api`).
- Unit tests in `packages/mcp-hotel/src/hotel.test.ts`.

## Out of scope

- Database tables, migrations or seed data (tasks 2 and 6 in `docs/tasks.md`).
- HTTP endpoints.
- Changing `HotelOffer`, `HotelSearchCriteria`, `searchHotels` or `rankOffers`.

## Fields

| Field           | Type   | Rule                                                               |
| --------------- | ------ | ------------------------------------------------------------------ |
| `id`            | string | UUID (zod `z.uuid()`, RFC 9562)                                    |
| `name`          | string | Trimmed, then non-empty                                            |
| `city`          | string | Trimmed, then non-empty                                            |
| `pricePerNight` | number | Positive integer, pennies in GBP (e.g. `12500` = £125.00)          |
| `rating`        | number | 0 to 5 inclusive, at most one decimal place (`4.5` ok, `4.55` no)  |
| `maxGuests`     | number | Integer, at least 1                                                |
| `phone`         | string | E.164: `+` then 2–15 digits, first digit 1–9 (`^\+[1-9]\d{1,14}$`) |

All fields are required.

- **Trimming**: `name` and `city` are trimmed _before_ the non-empty check
  (`z.string().trim().min(1)`), so whitespace-only values like `"   "` are rejected and the
  parsed output holds the trimmed value. Trimming after the check would let blank names
  through. The cost is negligible.
- **Unknown keys** are stripped (zod's default `z.object` behaviour), not rejected.
- **Rating decimals**: checked with a small tolerance,
  `Math.abs(rating * 10 - Math.round(rating * 10)) < 1e-9`, so `4.1` passes despite
  floating-point error and `4.15` fails.
- **Type**: `Hotel` is `z.infer<typeof HotelSchema>`; no hand-written interface.

## Acceptance criteria

1. `HotelSchema.parse` accepts a valid hotel and returns it unchanged.
2. `name` and `city` with surrounding spaces come back trimmed.
3. Extra keys in the input are absent from the parsed output.
4. Each of these is rejected:
   - missing any field
   - `id` that is not a UUID (e.g. `"hotel-1"`, empty string)
   - empty or whitespace-only `name` or `city`
   - `pricePerNight` of `0`, negative, or non-integer (e.g. `125.5`)
   - `rating` below 0, above 5, or with two decimals (e.g. `4.55`)
   - `maxGuests` of `0` or non-integer
   - `phone` without `+`, with spaces/dashes, starting `+0`, or longer than 15 digits
5. Boundary values pass: `rating` `0` and `5`, `maxGuests` `1`, `pricePerNight` `1`.
6. A type-level test (`expectTypeOf`) shows `Hotel` has exactly the seven fields above.
7. `npm test`, `npm run lint`, `npm run typecheck` and `npm run format:check` pass.

## Safety

- Tests use fake phone numbers only, from the UK range Ofcom reserves for drama
  (`+447700900000` to `+447700900999`). No real numbers anywhere.
- The schema only validates format. It does not make a number safe to call: calls still go
  only to the simulator (task 8 in `docs/tasks.md`).

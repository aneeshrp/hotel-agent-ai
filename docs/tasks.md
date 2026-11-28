# Tasks

## M1 Foundations

| #   | Task                                                                          | Depends on | Status      | Jira key | Notes           |
| --- | ----------------------------------------------------------------------------- | ---------- | ----------- | -------- | --------------- |
| 1   | Hotel type and zod schema                                                     | —          | In progress |          | Already started |
| 2   | Seed 30 fake hotels in City X (rooms, capacity, location, fake phone numbers) | 1          | To do       |          |                 |
| 3   | Ranking function (price, rating, distance) with unit tests                    | 1          | To do       |          |                 |
| 4   | GET /hotels/search with filters and pagination                                | 2, 3       | To do       |          |                 |
| 5   | GET /hotels/:id for hotel details                                             | 2          | To do       |          |                 |
| 6   | Bookings table, POST /bookings and GET /bookings/:id                          | 1          | To do       |          |                 |
| 7   | Dev environment: Mailpit in docker-compose and .env.example                   | —          | Done        | KAN-11   |                 |
| 8   | Phone-call guard: calls only go to the simulator                              | 1          | To do       |          |                 |
| 9   | Web: homepage with search form and paginated results                          | 4          | To do       |          |                 |
| 10  | Web: hotel details page                                                       | 5, 9       | To do       |          |                 |

Feature requests covered by M1:

- Search for hotels: tasks 2–4 and 9.
- Pagination for the hotel listing: part of tasks 4 and 9.
- Hotel details: tasks 5 and 10.
- Homepage: kept simple, a search box merged with the search page (task 9).

## Later backlog

| Item                                           | When          | Note                                                              |
| ---------------------------------------------- | ------------- | ----------------------------------------------------------------- |
| Suggestions from recent searches               | Week 6        | Agent memory: a perfect fit there                                 |
| Contact hotel                                  | M4            | This is the agent's phone call                                    |
| Save for later / comparison                    | Later backlog |                                                                   |
| Price history (last n days, up to 6 months)    | Later backlog | Stretch goal after week 12                                        |
| Price prediction (next n days, up to 6 months) | Later backlog | Stretch goal after week 12; a machine-learning project on its own |
| Signup with SSO and custom signup              | Later backlog | If needed, one simple login after week 12                         |
| Login                                          | Later backlog | If needed, one simple login after week 12                         |
| Forgot password                                | Later backlog | If needed, one simple login after week 12                         |

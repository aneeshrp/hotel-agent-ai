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

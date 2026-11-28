# KAN-11: Dev environment setup

## Goal

One command starts the local services the project needs, and every developer knows which
environment variables exist. For now the only service is Mailpit, a local SMTP server that
catches all mail so nothing reaches a real inbox. Hotel receipts (task 5 of the booking
flow) will be sent to and read from it later.

## Scope

- `docker-compose.yml` at the repo root with one service, `mailpit`:
  - image `axllent/mailpit`, pinned to a specific version tag (not `latest`) so everyone
    runs the same build
  - SMTP on port `1025`, web UI and HTTP API on port `8025`
  - ports bound to `127.0.0.1` only, so the services are not exposed on the network
  - no volume: mail is thrown away when the container stops (dev data only)
- Root `package.json` scripts:
  - `dev:services`: `docker compose up -d` (starts Mailpit in the background)
  - `dev:services:stop`: `docker compose down`
- `.env.example` at the repo root listing variable names only, each with an empty value and
  a one-line comment saying what it is for. No real values, no secrets:

  | Variable            | Purpose                                                   |
  | ------------------- | --------------------------------------------------------- |
  | `ANTHROPIC_API_KEY` | Claude API key for the agent                              |
  | `PORT`              | API port (code falls back to `3000` when unset)           |
  | `DATABASE_PATH`     | SQLite file path (planned default `apps/api/data/dev.db`) |
  | `SMTP_HOST`         | SMTP host for outgoing mail (Mailpit locally)             |
  | `SMTP_PORT`         | SMTP port (Mailpit: `1025`)                               |
  | `MAILPIT_API_URL`   | Mailpit HTTP API base URL, used to read received mail     |

  Comments may name the local default (e.g. "Mailpit: 1025") so a developer can fill in
  `.env`, but the `KEY=` lines stay empty. `.gitignore` already ignores `.env` and keeps
  `.env.example`; no change needed.

- Docs:
  - `CLAUDE.md` Commands: add `dev:services` and `dev:services:stop`, note that they need
    Docker with Compose v2, and give the Mailpit UI URL (http://localhost:8025).
  - `CLAUDE.md` Commands: add a line telling developers to copy `.env.example` to `.env`.
  - `README.md`: a short "Getting started" section (install, copy `.env.example`, start
    services, run dev servers) that links to CLAUDE.md for the full command list rather
    than repeating it.
  - `docs/tasks.md`: mark task 7 as done.

## Out of scope

- Sending email from the app (no nodemailer, no SMTP client code in any workspace).
- Loading `.env` in code (no dotenv or `--env-file` wiring yet); reading these variables
  is the job of the task that first needs each one.
- Real email services or providers of any kind.
- Containerising the API or web app.
- Automated tests that need Docker (the checks below are manual).

## Acceptance criteria

1. `npm run dev:services` starts the Mailpit container; `docker compose ps` shows it
   running.
2. **Mailpit UI loads**: http://localhost:8025 opens the Mailpit inbox in a browser
   (`curl -fsS http://localhost:8025/` returns HTTP 200).
3. **Test email appears**: a message sent to `localhost:1025` shows up in Mailpit. Check
   with curl's built-in SMTP client, no app code involved:

   ```sh
   printf 'Subject: KAN-11 test\r\n\r\nHello from KAN-11\r\n' > /tmp/kan11.eml
   curl -fsS smtp://localhost:1025 \
     --mail-from dev@example.test --mail-rcpt hotel@example.test \
     --upload-file /tmp/kan11.eml
   curl -fsS http://localhost:8025/api/v1/messages
   ```

   The JSON response lists a message with subject `KAN-11 test`, and it is visible in the
   web UI.

4. `npm run dev:services:stop` stops and removes the container; port 8025 no longer
   answers.
5. `.env.example` contains exactly the six variables above, all with empty values.
6. `CLAUDE.md` and `README.md` describe how to start and stop services and where the
   Mailpit UI is.
7. `npm test`, `npm run lint`, `npm run typecheck` and `npm run format:check` pass
   (`docker-compose.yml` and `.env.example` included in Prettier's check where it applies).

## Safety

- Test mail uses only the reserved `.test` domain (RFC 2606), never a real address.
- Mailpit is a catch-all: it never relays mail onward, so nothing leaves the machine.
- `.env.example` holds no values; `.env` stays gitignored and is never printed or
  committed.

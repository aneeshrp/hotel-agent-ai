# Docs

- [Architecture](architecture.md): how the workspaces fit together and the booking flow.

## Workspace layout

| Path                 | Package                  | Purpose                                               |
| -------------------- | ------------------------ | ----------------------------------------------------- |
| `apps/api`           | `@hotel-agent/api`       | Express API that receives requests and runs the agent |
| `apps/web`           | `@hotel-agent/web`       | React + Vite page for submitting requests             |
| `packages/mcp-hotel` | `@hotel-agent/mcp-hotel` | MCP server with hotel search tools                    |
| `packages/simulator` | `@hotel-agent/simulator` | Simulated hotel phone calls and email receipts        |
| `evals`              | `@hotel-agent/evals`     | Evaluation suites for the agent                       |

## Commands

```sh
npm install          # install all workspaces
npm run dev:api      # API on http://localhost:3000
npm run dev:web      # web on http://localhost:5173 (proxies /api to the API)
npm test             # all Vitest projects in one run
npm run lint         # ESLint
npm run format       # Prettier
npm run typecheck    # tsc in every workspace
npm run build        # build every workspace that has a build script
```

Run one workspace's tests with `npx vitest run --project api` (or `web`, `mcp-hotel`, `simulator`, `evals`).

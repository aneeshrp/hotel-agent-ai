# Docs

- [Architecture](architecture.md): how the workspaces fit together and the booking flow.
- Commands: see [CLAUDE.md](../CLAUDE.md#commands), the single source of truth.

## Workspace layout

| Path                 | Package                  | Purpose                                               |
| -------------------- | ------------------------ | ----------------------------------------------------- |
| `apps/api`           | `@hotel-agent/api`       | Express API that receives requests and runs the agent |
| `apps/web`           | `@hotel-agent/web`       | React + Vite page for submitting requests             |
| `packages/mcp-hotel` | `@hotel-agent/mcp-hotel` | Hotel search library (becomes an MCP server later)    |
| `packages/simulator` | `@hotel-agent/simulator` | Simulated hotel phone calls and email receipts        |
| `evals`              | `@hotel-agent/evals`     | Evaluation suites for the agent                       |

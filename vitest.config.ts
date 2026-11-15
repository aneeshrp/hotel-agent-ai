import { defineConfig } from 'vitest/config';

// Runs every workspace's tests in one process. Each project uses its own vitest.config.ts.
export default defineConfig({
  test: {
    projects: ['apps/*', 'packages/*', 'evals'],
  },
});

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: { name: 'simulator', environment: 'node' },
});

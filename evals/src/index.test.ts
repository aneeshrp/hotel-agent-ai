import { describe, expect, it } from 'vitest';
import { runEvals } from './index.js';

describe('evals harness', () => {
  it('reports pass and fail per case', async () => {
    const results = await runEvals(
      [
        { name: 'doubles 2', input: 2, expected: 4 },
        { name: 'doubles 3 (wrong)', input: 3, expected: 7 },
      ],
      (n: number) => n * 2,
    );
    expect(results).toEqual([
      { name: 'doubles 2', passed: true },
      { name: 'doubles 3 (wrong)', passed: false },
    ]);
  });
});

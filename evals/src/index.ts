export interface EvalCase<Input, Expected> {
  name: string;
  input: Input;
  expected: Expected;
}

export interface EvalResult {
  name: string;
  passed: boolean;
}

/** Runs each case through `run` and compares the output with `expected` as JSON. */
export async function runEvals<Input, Expected>(
  cases: readonly EvalCase<Input, Expected>[],
  run: (input: Input) => Promise<Expected> | Expected,
): Promise<EvalResult[]> {
  const results: EvalResult[] = [];
  for (const c of cases) {
    const actual = await run(c.input);
    results.push({ name: c.name, passed: JSON.stringify(actual) === JSON.stringify(c.expected) });
  }
  return results;
}

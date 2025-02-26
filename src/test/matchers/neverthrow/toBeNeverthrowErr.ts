import type { ExpectationResult } from "#test/matchers/types";

import { ResultAsync } from "neverthrow";

export async function toBeNeverthrowErr(
  equals: (a: unknown, b: unknown) => boolean,
  received: unknown,
  expectedContent?: unknown,
): Promise<ExpectationResult> {
  if (!(received instanceof ResultAsync))
    return {
      message: (): string => "Not a ResultAsync",
      pass: false,
    };

  const result = await received;
  if (!result.isErr())
    return {
      actual: result.value,
      expected: expectedContent,
      message: () => "Received a value instead of an error",
      pass: false,
    };

  return {
    actual: result.error,
    expected: expectedContent,
    message: () => `Received a different error from expected`,
    pass: equals(result.error, expectedContent),
  };
}

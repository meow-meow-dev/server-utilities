import type { ExpectationResult } from "@meow-meow-dev/server-utilities/test/matchers/types";

import { ResultAsync } from "neverthrow";

export async function toBeNeverthrowOk(
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
  if (!result.isOk())
    return {
      actual: result.error,
      expected: expectedContent,
      message: () => "Received an error instead of a value",
      pass: false,
    };

  return {
    actual: result.value,
    expected: expectedContent,
    message: () => `Received a different value from expected`,
    pass: equals(result.value, expectedContent),
  };
}

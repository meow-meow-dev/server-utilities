import type { ExpectStatic } from "vitest";

type ExpectationResult = {
  // If you pass these, they will automatically appear inside a diff when
  // the matcher does not pass, so you don't need to print the diff yourself
  actual?: unknown;
  expected?: unknown;
  message: () => string;
  pass: boolean;
};

export function extendWithHTTPMatchers(expect: ExpectStatic): void {
  expect.extend({
    toBeHTTPBadRequest(received) {
      return toBeHTTPStatus(this, received, 400, "Bad Request");
    },
    toBeHTTPConflict(received) {
      return toBeHTTPStatus(this, received, 409, "Conflict");
    },
    toBeHTTPNotFound(received) {
      return toBeHTTPStatus(this, received, 404, "Not Found");
    },
    toBeHTTPOk(received) {
      return toBeHTTPStatus(this, received, 200, "OK");
    },
    toBeHTTPUnauthorized(received) {
      return toBeHTTPStatus(this, received, 401, "Unauthorized");
    },
  });
}

async function toBeHTTPStatus(
  { isNot }: { isNot: boolean },
  received: unknown,
  expectedStatus: number,
  expectedText: string,
): Promise<ExpectationResult> {
  if (!(received instanceof Promise))
    return {
      message: (): string => "Not a response promise",
      pass: false,
    };

  const response = await received;
  if (!(response instanceof Response))
    return {
      message: (): string => "Not a response promise",
      pass: false,
    };

  const { status } = response;
  const text = await response.text();

  return {
    actual: { status, text },
    expected: { status: expectedStatus, text: expectedText },
    message: (): string =>
      `Response status ${isNot ? "is" : "is not"} ${expectedStatus.toString()} or response text isn't standard`,
    pass: status === expectedStatus && text === expectedText,
  };
}

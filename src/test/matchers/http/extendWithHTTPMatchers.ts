import type { ExpectationResult } from "@meow-meow-dev/server-utilities/test/matchers/types";
import type { ExpectStatic } from "vitest";

export function extendWithHTTPMatchers(expect: ExpectStatic): void {
  expect.extend({
    toBeHTTPBadRequest(received, expectedContent?: unknown) {
      return toBeHTTPStatus(
        this,
        received,
        400,
        expectedContent ?? "Bad Request",
      );
    },
    toBeHTTPConflict(received, expectedContent?: unknown) {
      return toBeHTTPStatus(this, received, 409, expectedContent ?? "Conflict");
    },
    toBeHTTPForbidden(received, expectedContent?: unknown) {
      return toBeHTTPStatus(
        this,
        received,
        403,
        expectedContent ?? "Forbidden",
      );
    },
    toBeHTTPNotFound(received, expectedContent?: unknown) {
      return toBeHTTPStatus(
        this,
        received,
        404,
        expectedContent ?? "Not Found",
      );
    },
    toBeHTTPOk(received, expectedContent?: unknown) {
      return toBeHTTPStatus(this, received, 200, expectedContent ?? "OK");
    },
    toBeHTTPUnauthorized(received, expectedContent?: unknown) {
      return toBeHTTPStatus(
        this,
        received,
        401,
        expectedContent ?? "Unauthorized",
      );
    },
  });
}

async function toBeHTTPStatus(
  {
    equals,
    isNot,
  }: { equals: (v1: unknown, v2: unknown) => boolean; isNot: boolean },
  received: unknown,
  expectedStatus: number,
  expectedContent: unknown,
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
  const contentType = response.headers.get("Content-Type");
  const content = await (contentType?.startsWith("application/json")
    ? response.json()
    : response.text());

  const expectedContentType =
    typeof expectedContent === "string" ? "text/plain" : "application/json";

  let message: string | undefined;
  if (!contentType?.startsWith(expectedContentType))
    message = `Content type ${isNot ? "is" : "is not"} ${expectedContentType}`;
  if (message === undefined && !equals(status, expectedStatus))
    message = `Status ${isNot ? "is" : "is not"} ${expectedStatus.toString()}`;
  if (message === undefined && !equals(content, expectedContent))
    message = `Content ${isNot ? "is" : "is not"} ${typeof expectedContent === "string" ? expectedContent : "the expected one"}`;

  return {
    actual: { content, contentType, status },
    expected: {
      content: expectedContent,
      contentType: expectedContentType,
      status: expectedStatus,
    },
    message: (): string => message ?? "",
    pass: message === undefined,
  };
}

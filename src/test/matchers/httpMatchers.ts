import type { ExpectStatic } from "vitest";

export type ExpectedContent =
  | {
      json: unknown;
    }
  | {
      text: string;
    };

export type HTTPMatcher<R = unknown> = (
  expectedContent?: ExpectedContent,
) => Promise<R>;

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
    toBeHTTPBadRequest(received, expectedContent?: ExpectedContent) {
      return toBeHTTPStatus(
        this,
        received,
        400,
        expectedContent ?? { text: "Bad Request" },
      );
    },
    toBeHTTPConflict(received, expectedContent?: ExpectedContent) {
      return toBeHTTPStatus(
        this,
        received,
        409,
        expectedContent ?? { text: "Conflict" },
      );
    },
    toBeHTTPNotFound(received, expectedContent?: ExpectedContent) {
      return toBeHTTPStatus(
        this,
        received,
        404,
        expectedContent ?? { text: "Not Found" },
      );
    },
    toBeHTTPOk(received, expectedContent?: ExpectedContent) {
      return toBeHTTPStatus(
        this,
        received,
        200,
        expectedContent ?? { text: "OK" },
      );
    },
    toBeHTTPUnauthorized(received, expectedContent?: ExpectedContent) {
      return toBeHTTPStatus(
        this,
        received,
        401,
        expectedContent ?? { text: "Unauthorized" },
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
  expectedContent: ExpectedContent,
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
  let expectedContentType, expectedContentValue;
  const content = await (contentType?.startsWith("application/json")
    ? response.json()
    : response.text());

  console.log({ content });

  if ("text" in expectedContent) {
    expectedContentValue = expectedContent.text;
    expectedContentType = "text/plain";
  } else {
    expectedContentValue = expectedContent.json;
    expectedContentType = "application/json";
  }

  let message: string | undefined;
  if (!contentType?.startsWith(expectedContentType))
    message = `Content type ${isNot ? "is" : "is not"} ${expectedContentType}`;
  if (message === undefined && !equals(status, expectedStatus))
    message = `Status ${isNot ? "is" : "is not"} ${expectedStatus.toString()}`;
  if (message === undefined && !equals(content, expectedContentValue))
    message = `Content ${isNot ? "is" : "is not"} ${typeof expectedContentValue === "string" ? expectedContentValue : "the expected one"}`;

  return {
    actual: { content, contentType, status },
    expected: {
      content: expectedContentValue,
      contentType: expectedContentType,
      status: expectedStatus,
    },
    message: (): string => message ?? "",
    pass: message === undefined,
  };
}

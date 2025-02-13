export type HTTPMatcher<R = unknown> = (
  expectedContent?: unknown,
) => Promise<R>;
